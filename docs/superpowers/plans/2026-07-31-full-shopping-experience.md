# Full Shopping Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Run the full `pi-shop-api` docker-compose stack locally and get the
`pishop-frontend` storefront working end-to-end against it — guest browse, search,
product detail, cart, checkout, Stripe test-mode payment, and order confirmation.

**Architecture:** `pi-shop-api` (Go microservices, MongoDB, NATS) runs via
`docker-compose` with two host ports remapped to avoid collisions with an unrelated
project. `pishop-frontend` (Next.js + Payload) already has a GraphQL client
(`PiShopClient`) and cart store built against the `graphql-service` storefront schema;
this plan makes that connection real and fixes whatever breaks along the way, on
whichever side (frontend or backend) is at fault.

**Tech Stack:** Go 1.26 (backend, `GOOS=linux GOARCH=arm64` cross-compiled for
containers), Docker/docker-compose (OrbStack), MongoDB 7, NATS 2.10, Next.js 16 +
Apollo Client 4 + Zustand (frontend), Stripe (payment).

## Global Constraints

- Backend repo: `/Users/paalgyula/Workspace/pilab/pi-shop-api`. Frontend repo (this
  repo): `/Users/paalgyula/Workspace/pilab/pishop-frontend`. These are two separate git
  repositories — commit to each independently.
- Do not touch ports 8080 or 27017 on the host — they belong to an unrelated running
  project (`shadow-sso-server`, `shadow-sso-mongo`). Only remap inside pi-shop-api's own
  compose files.
- Backend containers run a mounted `./bin/<binary>` inside `ubuntu:22.04` — Go binaries
  must be built with `GOOS=linux GOARCH=arm64` (OrbStack's Linux VM is arm64 on this
  Apple Silicon Mac), not the host's native `darwin/arm64`.
- Stripe test API keys are a hard external dependency the user supplies; the payment
  task is blocked until they're provided. Everything else does not depend on them.
- Auth (login/register) is explicitly out of scope — no backend mutations exist for it
  and building them is a separate follow-up project. Do not touch `/login`, `/signup`,
  or `auth-handlers.ts`.
- Validate every frontend-facing task in a real browser via the Chrome DevTools MCP
  tools (`navigate_page`, `take_snapshot`, `list_network_requests`,
  `list_console_messages`) — not just by reading code.

---

### Task 1: Resolve backend port collisions

**Files:**
- Modify: `pi-shop-api/docker-compose.yaml` (mongodb service, line ~129)
- Modify: `pi-shop-api/graphql-service/docker-compose.yaml` (graphql-service ports)

**Interfaces:**
- Produces: MongoDB reachable from the host at `localhost:27018` (container-internal
  traffic still uses `mongodb:27017`, unaffected). GraphQL gateway reachable from the
  host at `localhost:8091` (container-internal port stays `8080`).

- [ ] **Step 1: Remap MongoDB's host port**

In `pi-shop-api/docker-compose.yaml`, change:
```yaml
    ports:
      - "27017:27017"
```
to:
```yaml
    ports:
      - "27018:27017"
```
(this is the `mongodb` service block, directly under `container_name: pishop-mongodb`).

- [ ] **Step 2: Remap the GraphQL gateway's host port**

In `pi-shop-api/graphql-service/docker-compose.yaml`, change:
```yaml
    ports:
      - "8080:8080"
      # - "8081"
      # - "9090"
```
to:
```yaml
    ports:
      - "8091:8080"
      # - "8081"
      # - "9090"
```
(host port `8090` is already taken by the Traefik dashboard mapping in the root
`docker-compose.yaml` — `8091` avoids that collision too).

- [ ] **Step 3: Verify no other compose file still targets the old host ports**

Run: `cd pi-shop-api && grep -rn '"8080:8080"\|"27017:27017"' --include=docker-compose.yaml .`
Expected: no matches (both files now show the new mappings).

- [ ] **Step 4: Commit**

```bash
cd /Users/paalgyula/Workspace/pilab/pi-shop-api
git add docker-compose.yaml graphql-service/docker-compose.yaml
git commit -m "chore: remap mongodb/graphql-service host ports to avoid local port collisions"
```

---

### Task 2: Build service binaries and bring up the full docker-compose stack

**Files:**
- None modified. Builds into `pi-shop-api/bin/*` (git-ignored) and starts containers.

**Interfaces:**
- Consumes: port remaps from Task 1.
- Produces: a running stack reachable at `http://localhost:8091/storefront.graphql`
  (GraphQL gateway) and `mongodb://localhost:27018` (MongoDB, host access only).

- [ ] **Step 1: Cross-compile all service binaries for the Linux containers**

```bash
cd /Users/paalgyula/Workspace/pilab/pi-shop-api
GOOS=linux GOARCH=arm64 make build-all-services
GOOS=linux GOARCH=arm64 go build -tags netgo -o bin/analyticsservice ./analytics-service/cmd/analyticsservice
GOOS=linux GOARCH=arm64 make build-cli
```
Expected: all commands exit 0, and `bin/` contains `productservice`, `cartservice`,
`checkoutservice`, `orderservice`, `paymentservice`, `customerservice`,
`inventoryservice`, `discountservice`, `notificationservice`, `invoiceservice`,
`authservice`, `graphqlservice`, `monolithservice`, `analyticsservice`, and `pishop`
(the CLI).

- [ ] **Step 2: Bring up the full stack**

```bash
cd /Users/paalgyula/Workspace/pilab/pi-shop-api
docker-compose up -d
```
Expected: exits 0, all containers report `Created`/`Started`.

- [ ] **Step 3: Wait for health and verify the GraphQL gateway responds**

```bash
cd /Users/paalgyula/Workspace/pilab/pi-shop-api
docker-compose ps
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8091/storefront.graphql
```
Expected: `docker-compose ps` shows `mongodb`, `nats`, `jaeger` as `healthy`; the curl
call returns `200` (GraphQL endpoints answer GET with a 200/405 depending on the
handler — either is fine as long as it's not connection-refused). If any core service
container (product/cart/checkout/order/payment/customer/inventory/discount/
notification/graphql) is in a restart loop, run
`docker-compose logs --tail=50 <service>` and fix the root cause (commonly: wrong env
var name, missing dependency, or a binary built for the wrong OS/arch — re-check Step 1
if so) before moving on.

- [ ] **Step 4: Confirm no regression on the unrelated project**

```bash
docker ps --filter name=shadow-sso
```
Expected: `shadow-sso-server` and `shadow-sso-mongo` are still listed and healthy,
untouched by the above.

(No commit — this task only builds artifacts and starts containers.)

---

### Task 3: Seed the backend with catalog data

**Files:**
- None modified. Uses the `pishop` CLI built in Task 2.

**Interfaces:**
- Consumes: running stack from Task 2 (NATS reachable at `localhost:4222`, unaffected
  by the port remap in Task 1).
- Produces: seeded categories, products, and collections in MongoDB, queryable via the
  GraphQL gateway.

- [ ] **Step 1: Run the static seed**

```bash
cd /Users/paalgyula/Workspace/pilab/pi-shop-api
PISHOP_NATS_URL="nats://localhost:4222" ./bin/pishop admin seed
```
Expected: output reports categories/products/collections created (per
`QUICKSTART.md`: 7 categories, 3 products, 1-2 collections). Non-fatal `E11000
duplicate key` on collections is a known, harmless issue per `QUICKSTART.md` — ignore.

- [ ] **Step 2: Generate a larger, more realistic catalog with the faker seeder**

```bash
cd /Users/paalgyula/Workspace/pilab/pi-shop-api
PISHOP_NATS_URL="nats://localhost:4222" ./bin/pishop admin faker --products 40 --categories 8 --collections 4
```
Expected: exits 0, reports ~40 products / 8 categories / 4 collections created. This
gives collection/search/grid pages enough data to look real instead of showing 1-3
items.

- [ ] **Step 3: Verify via the CLI and a direct GraphQL query**

```bash
cd /Users/paalgyula/Workspace/pilab/pi-shop-api
./bin/pishop product list | head -20
curl -s -X POST http://localhost:8091/storefront.graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ products(pagination: {page: 1, limit: 5}) { items { id name slug } total } }"}'
```
Expected: the CLI lists products; the curl call returns JSON with a non-empty
`data.products.items` array and `total` > 3.

(No commit — data seeding only.)

---

### Task 4: Point the frontend at the local backend

**Files:**
- Modify: `src/lib/client/apollo-client.ts:5`
- Modify: `.env.local`

**Interfaces:**
- Consumes: `NEXT_PUBLIC_GRAPHQL_URL` env var (already read correctly by
  `src/lib/client/PiShopClient.ts:1145` — no change needed there).
- Produces: both Apollo Client instances in the app (the `providers.tsx`-level one via
  `getApolloClient()`, and the one internal to `PiShopClient`) point at the same local
  backend URL.

- [ ] **Step 1: Make `apollo-client.ts`'s GraphQL URL configurable**

In `src/lib/client/apollo-client.ts`, change:
```typescript
const GRAPHQL_URL = 'http://localhost:8080/storefront.graphql'
```
to:
```typescript
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8080/storefront.graphql'
```

- [ ] **Step 2: Point `.env.local` at the remapped local backend**

Add this line to `.env.local` (currently only has `PAYLOAD_SECRET` and `DATABASE_URI`):
```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8091/storefront.graphql
```

- [ ] **Step 3: Start the frontend dev server**

```bash
cd /Users/paalgyula/Workspace/pilab/pishop-frontend
bun run dev
```
Expected: Next.js starts on port 3001 without throwing at boot (Payload/Mongo
connection via `DATABASE_URI` in `.env.local` still points at the frontend's own
Payload database — leave that as-is, it's unrelated to pi-shop-api).

- [ ] **Step 4: Smoke-test connectivity from the browser**

Use `navigate_page` to open `http://localhost:3001`, then `list_network_requests` and
filter for `storefront.graphql`. Expected: at least one request to
`http://localhost:8091/storefront.graphql` with status `200`, and
`list_console_messages` shows no GraphQL/network errors referencing port 8080.

- [ ] **Step 5: Commit**

```bash
cd /Users/paalgyula/Workspace/pilab/pishop-frontend
git add src/lib/client/apollo-client.ts .env.local
git commit -m "fix: read GraphQL endpoint from NEXT_PUBLIC_GRAPHQL_URL, point at local backend"
```

---

### Task 5: Verify and fix the home page blocks (HeroSlider, FeaturedProduct, BrandLogos, PromoBanners, MiniProductList)

**Files:**
- Investigate: `src/blocks/HeroSliderBlock/`, `src/blocks/FeaturedProductBlock/`,
  `src/blocks/BrandLogosBlock/`, `src/blocks/PromoBannersBlock/`,
  `src/blocks/MiniProductListBlock/`
- Investigate: `src/components/apple-watch-hero-section.tsx`,
  `src/components/best-sellers-grid-section.tsx`, `src/components/black-hero-section.tsx`,
  `src/components/brand-logos-section.tsx`, `src/components/console-promo-section.tsx`,
  `src/components/countdown-promo-section.tsx`,
  `src/components/featured-product-section.tsx`,
  `src/components/promo-banners-section.tsx`

**Interfaces:**
- Consumes: seeded product/collection data from Task 3, GraphQL endpoint from Task 4.

- [ ] **Step 1: Load the home page and capture its current state**

Use `navigate_page` to `http://localhost:3001`, then `take_snapshot` and
`list_network_requests`. Note which blocks render real product data vs. static
placeholder content, and which GraphQL/REST requests fail (non-200) or return empty
arrays where seeded data exists.

- [ ] **Step 2: Fix each broken block**

For each block identified in Step 1 as broken or showing placeholder data instead of
live data: read its component file, find the data-fetching call (Payload local API call
or `PiShopClient`/Apollo query), and correct it to actually request and render seeded
product/collection data (e.g., a hardcoded product list should become a query against
the real product/collection API introduced in Task 3; a broken query variable name
should be fixed to match the schema in
`pi-shop-api/graphql-service/graph/schema/storefront/product.graphql`).

- [ ] **Step 3: Re-verify in the browser**

Re-run `navigate_page` + `take_snapshot` + `list_console_messages` on
`http://localhost:3001`. Expected: every block shows real seeded products/images/names
(matching what `./bin/pishop product list` showed in Task 3), and no console errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/paalgyula/Workspace/pilab/pishop-frontend
git add -A
git commit -m "fix: wire home page blocks to live product/collection data"
```

---

### Task 6: Verify and fix collections & product listing

**Files:**
- Investigate: `app/(frontend)/collections/[slug]/page.tsx`,
  `app/(frontend)/collections/[slug]/error.tsx`,
  `app/(frontend)/collections/[slug]/not-found.tsx`
- Investigate: `src/components/products/collection-sidebar.tsx`,
  `src/components/products/collection-toolbar.tsx`

**Interfaces:**
- Consumes: seeded collections/products (Task 3), `PiShopClient.getProducts` /
  collection query methods.

- [ ] **Step 1: Navigate to a seeded collection and capture state**

Get a real collection slug: `cd pi-shop-api && ./bin/pishop category list` (or
`collection list` if that subcommand exists) to find a seeded slug. Use
`navigate_page` to `http://localhost:3001/collections/<slug>`, then `take_snapshot`,
`list_network_requests`, `list_console_messages`.

- [ ] **Step 2: Fix filtering/sorting/pagination and any broken queries**

If products don't load, or filters (`collection-sidebar.tsx`) / sort+toolbar
(`collection-toolbar.tsx`) don't affect the rendered list, trace the query built in
`page.tsx` against `src/lib/client/queries/products.ts` and
`src/lib/client/queries/collection.ts`, and correct field/variable mismatches against
`pi-shop-api/graphql-service/graph/schema/storefront/product.graphql`.

- [ ] **Step 3: Re-verify**

Re-navigate with a filter/sort applied (e.g. `?sort=price_asc` or whatever the toolbar
produces) and confirm via `take_snapshot` that the rendered order/set of products
changes accordingly, with no console errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/paalgyula/Workspace/pilab/pishop-frontend
git add -A
git commit -m "fix: wire collection listing, filtering, and sorting to live backend data"
```

---

### Task 7: Verify and fix the product detail page + add-to-cart

**Files:**
- Investigate: `app/(frontend)/product/[slug]/page.tsx`,
  `app/(frontend)/product/[slug]/base-product.tsx`

**Interfaces:**
- Consumes: `client.getProduct(slugOrId)` (`src/lib/client/PiShopClient.ts`),
  `useCartStore.addToCart` (`src/store/cart-store.ts`).
- Produces: a cart containing at least one item, for Task 9 to build on.

- [ ] **Step 1: Navigate to a seeded product's detail page**

Get a real slug from `./bin/pishop product list`. Use `navigate_page` to
`http://localhost:3001/product/<slug>`, then `take_snapshot` +
`list_network_requests`.

- [ ] **Step 2: Fix rendering and add-to-cart**

Confirm name/price/images/variants match the seeded product. If variants don't render
or add-to-cart doesn't fire a mutation, trace `base-product.tsx`'s call into
`useCartStore.addToCart` (`src/store/cart-store.ts:74-83`) and
`client.addToCart(productId, quantity, variantId)`
(`src/lib/client/PiShopClient.ts`), and fix the mismatch (e.g. wrong product ID field,
missing variant ID passthrough).

- [ ] **Step 3: Re-verify by actually adding to cart**

Use `click` on the add-to-cart control, then `list_network_requests` to confirm a
mutation to `storefront.graphql` succeeded (200, no `errors` field in the GraphQL
response body), and `take_snapshot` to confirm the cart icon/drawer count updates.

- [ ] **Step 4: Commit**

```bash
cd /Users/paalgyula/Workspace/pilab/pishop-frontend
git add -A
git commit -m "fix: wire product detail page rendering and add-to-cart to live backend"
```

---

### Task 8: Verify and fix search

**Files:**
- Investigate: `app/(frontend)/search/page.tsx`

**Interfaces:**
- Consumes: `ProductFilterInput.search` (`src/lib/client/types.ts`,
  `src/lib/client/PiShopClient.ts`).

- [ ] **Step 1: Search for a seeded product**

Get a product name substring from `./bin/pishop product list`. Use `navigate_page` to
`http://localhost:3001/search?q=<term>` (or trigger the search UI if the route differs
— check `app/(frontend)/search/page.tsx` for the actual query param name first), then
`take_snapshot` + `list_network_requests`.

- [ ] **Step 2: Fix the search query wiring**

If results are empty despite a matching seeded product, or the search param isn't
passed through, trace `page.tsx` into the `getProducts`/`ProductFilterInput` call and
fix the filter field mapping against
`pi-shop-api/graphql-service/graph/schema/storefront/product.graphql`.

- [ ] **Step 3: Re-verify with a matching and a non-matching term**

Confirm a matching term returns the expected product and a nonsense term
(`xyznonexistent123`) returns an empty-state UI, not an error.

- [ ] **Step 4: Commit**

```bash
cd /Users/paalgyula/Workspace/pilab/pishop-frontend
git add -A
git commit -m "fix: wire product search to live backend filtering"
```

---

### Task 9: Verify and fix the cart (drawer + page, quantity updates, coupons)

**Files:**
- Investigate: `app/(frontend)/cart/page.tsx`, `app/(frontend)/cart/CartContent.tsx`,
  `app/(frontend)/cart/CartFallback.tsx`
- Investigate: `src/components/cart/` (drawer component(s))

**Interfaces:**
- Consumes: `useCartStore` (all methods) from Task 7's cart state.
- Produces: a cart with a known item + quantity, for Task 11 (checkout) to use.

- [ ] **Step 1: Open the cart drawer, then the full cart page**

With the item added in Task 7 still in the cart, `click` the cart icon to open the
drawer (`take_snapshot`), then `navigate_page` to `http://localhost:3001/cart`
(`take_snapshot`). Confirm both show the same item/quantity/price.

- [ ] **Step 2: Exercise quantity update, remove, and coupon apply**

Use `click`/`fill` to increment quantity, then remove the item, then add it back and
apply a coupon code. For each action, use `list_network_requests` to confirm the
corresponding mutation (`updateCartItem`, `removeFromCart`, `applyCoupon`) returns 200
with no GraphQL errors, and `take_snapshot` to confirm the UI total updates.

- [ ] **Step 3: Fix any broken interaction**

If a mutation errors or the UI doesn't reflect the new state, trace the relevant
`useCartStore` method (`src/store/cart-store.ts`) and the component's event handler,
and fix the mismatch. If `applyCoupon` needs a real coupon code, check seeded discount
data (`./bin/pishop discount list` or equivalent) or seed one via
`pi-shop-api`'s discount-service seed data — do not fabricate a fake code that can't
exist server-side.

- [ ] **Step 4: Commit**

```bash
cd /Users/paalgyula/Workspace/pilab/pishop-frontend
git add -A
git commit -m "fix: wire cart drawer/page quantity, removal, and coupon flows to live backend"
```

---

### Task 10: Verify and fix checkout (information + shipping steps)

**Files:**
- Investigate: `app/(frontend)/checkout/page.tsx`,
  `app/(frontend)/checkout/CheckoutContent.tsx`,
  `app/(frontend)/checkout/CheckoutInformationForm.tsx`,
  `app/(frontend)/checkout/CheckoutShippingForm.tsx`,
  `app/(frontend)/checkout/CheckoutSteps.tsx`,
  `app/(frontend)/checkout/CheckoutEmptyCart.tsx`

**Interfaces:**
- Consumes: `useCartStore.createCheckout`, `client.updateCheckoutCustomer`,
  `client.setShippingMethod` (all in `src/lib/client/PiShopClient.ts` /
  `src/store/cart-store.ts`).
- Produces: an active checkout session with customer + shipping info set, for Task 11
  (payment) to complete.

- [ ] **Step 1: Enter checkout with a non-empty cart**

With the cart from Task 9 populated, `navigate_page` to
`http://localhost:3001/checkout`. Confirm `CheckoutEmptyCart.tsx`'s empty state does
NOT show (cart has items). `take_snapshot`.

- [ ] **Step 2: Fill the information step and advance**

Use `fill_form` on `CheckoutInformationForm.tsx`'s fields (name/email/address) with
realistic test data, submit, and use `list_network_requests` to confirm
`updateCheckoutCustomer` (or equivalent mutation) returns 200 with no errors. Fix any
field-mapping bug found (e.g. address fields not matching
`UPDATE_CHECKOUT_CUSTOMER` in `src/lib/client/queries/checkout.ts`).

- [ ] **Step 3: Fill the shipping step and advance**

Select a shipping method in `CheckoutShippingForm.tsx`, submit, confirm
`setShippingMethod` succeeds via `list_network_requests`, and `take_snapshot` to
confirm `CheckoutOrderSummary.tsx` reflects the shipping cost in the total.

- [ ] **Step 4: Commit**

```bash
cd /Users/paalgyula/Workspace/pilab/pishop-frontend
git add -A
git commit -m "fix: wire checkout information and shipping steps to live backend"
```

---

### Task 11: Wire Stripe test keys and verify the payment step

**Files:**
- Modify: `pi-shop-api/payment-service/.env`
- Modify: `.env.local` (frontend)
- Investigate: `app/(frontend)/checkout/CheckoutPaymentForm.tsx`
- Investigate (only if the env var name is wrong): `pi-shop-api/payment-service/cmd/paymentservice/paymentservice.go:26-33`

**Interfaces:**
- Consumes: Stripe test secret key, publishable key, and webhook secret from the user.
- Consumes: checkout session from Task 10.
- Produces: a completed order, for Task 12 (order confirmation) to display.

- [ ] **Step 1: Obtain Stripe test keys from the user**

If not already provided, ask the user for their Stripe test-mode secret key
(`sk_test_...`), publishable key (`pk_test_...`), and (if they run
`stripe listen --forward-to localhost:<webhook-port>/webhooks/stripe`) the webhook
signing secret (`whsec_...`). This is a hard external dependency — do not fabricate
placeholder keys.

- [ ] **Step 2: Configure the backend**

Add to `pi-shop-api/payment-service/.env`:
```
STRIPE_ENABLED=true
STRIPE_SECRETKEY=<sk_test_...>
STRIPE_PUBLISHABLEKEY=<pk_test_...>
STRIPE_WEBHOOKSECRET=<whsec_... or blank if not using stripe listen>
```
If `docker-compose logs payment-service` after restart shows these weren't picked up
(i.e. `cfg.Stripe.Enabled` stays false), read
`pi-shop-api/shared/pkg/config`'s env-var-naming convention (likely nested-struct
dot-path uppercased, e.g. `PAYMENT_STRIPE_SECRETKEY` or `STRIPE_SECRET_KEY`) and use the
matching name instead.

- [ ] **Step 3: Restart payment-service and configure the frontend**

```bash
cd /Users/paalgyula/Workspace/pilab/pi-shop-api
docker-compose up -d --force-recreate payment-service
```
Add to `.env.local`:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<pk_test_...>
```
Restart the frontend dev server so the new env var is picked up.

- [ ] **Step 4: Complete a payment with a Stripe test card**

From the shipping step completed in Task 10, advance to `CheckoutPaymentForm.tsx`. Use
`fill` for Stripe's test card `4242 4242 4242 4242`, any future expiry, any CVC, submit.
Use `list_network_requests` to confirm the payment intent/confirmation call succeeds,
and `navigate_page`/`take_snapshot` to confirm redirect to
`/order-confirmation`.

- [ ] **Step 5: Fix any broken step in the payment flow**

If the payment form doesn't load Stripe Elements, or confirmation fails, trace
`CheckoutPaymentForm.tsx`'s Stripe.js initialization (should use
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`) and the backend call chain
(checkout-service → payment-service) via `docker-compose logs payment-service
checkout-service`, and fix the specific break (e.g. missing publishable key, wrong
payment intent client secret field name).

- [ ] **Step 6: Commit**

```bash
cd /Users/paalgyula/Workspace/pilab/pishop-frontend
git add -A
git commit -m "fix: wire Stripe test-mode payment step to live backend"
```
```bash
cd /Users/paalgyula/Workspace/pilab/pi-shop-api
git add payment-service/.env
git commit -m "chore: enable Stripe test-mode payment gateway"
```
(Do not commit `.env.local` if it's git-ignored — verify with `git status` first; if
untracked and ignored, skip staging it.)

---

### Task 12: Verify and fix order confirmation

**Files:**
- Investigate: `app/(frontend)/order-confirmation/`

**Interfaces:**
- Consumes: the order created in Task 11.

- [ ] **Step 1: Inspect the order confirmation page**

After Task 11's payment completes, `take_snapshot` on the resulting
`/order-confirmation` page. Confirm it shows the correct order number, items,
quantities, prices, and shipping/customer info matching what was entered in Task 10.

- [ ] **Step 2: Cross-check against the backend record**

```bash
cd /Users/paalgyula/Workspace/pilab/pi-shop-api
./bin/pishop order list | head -5
```
Expected: the order shown in the browser matches an entry here (same total, same
item count).

- [ ] **Step 3: Fix any mismatch**

If the confirmation page shows stale cart data instead of the actual order, or is
missing fields, trace its data source (order query by ID/session) and correct it to
fetch the real created order via `client` (`src/lib/client/queries/orders.ts`).

- [ ] **Step 4: Commit**

```bash
cd /Users/paalgyula/Workspace/pilab/pishop-frontend
git add -A
git commit -m "fix: wire order confirmation page to the created order record"
```

---

### Task 13: Full end-to-end regression walkthrough

**Files:**
- None expected, unless a regression from an earlier task surfaces.

**Interfaces:**
- Consumes: everything from Tasks 1-12.

- [ ] **Step 1: Run the complete guest flow once, start to finish, in one browser session**

Using a fresh cart (clear localStorage or open a new browser context if the tool
supports it), walk: home (`/`) → click into a collection → click into a product →
add to cart → open cart → go to checkout → fill information → select shipping → pay
with the Stripe test card → land on order confirmation. At each step, capture
`list_console_messages` and `list_network_requests` and confirm zero unexpected
errors.

- [ ] **Step 2: Fix any regression found**

If any step that worked in isolation (Tasks 5-12) breaks in the full sequence (e.g. a
state-management bug that only shows up after multiple navigations), fix it at the
root cause in the relevant component/store file identified by the console/network
evidence.

- [ ] **Step 3: Final verification**

Re-run the full walkthrough from Step 1 once more, end to end, with zero errors and a
real order visible both in the browser and via `./bin/pishop order list`.

- [ ] **Step 4: Commit**

```bash
cd /Users/paalgyula/Workspace/pilab/pishop-frontend
git add -A
git commit -m "fix: resolve full-flow regressions found in end-to-end walkthrough"
```
(Only if Step 2 produced changes — skip if the first full run in Step 1 already passed
clean.)
