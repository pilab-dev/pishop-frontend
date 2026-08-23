# Full Shopping Experience: Local Backend + Frontend Integration

## Goal

Run `pi-shop-api` locally (full docker-compose stack) and integrate the `pishop-frontend`
storefront against it end-to-end, so the whole shopping flow — browse, search, product
detail, cart, checkout, payment, order confirmation — works against real data instead of
placeholders.

## Background

- `pishop-frontend` is a Next.js + Payload CMS storefront. It already contains a
  framework-agnostic GraphQL client (`src/lib/client/PiShopClient.ts`) and a Zustand cart
  store (`src/store/cart-store.ts`) built on top of it, targeting the `graphql-service`
  storefront schema.
- `pi-shop-api` is a Go microservices backend (product, cart, checkout, order, payment,
  customer, inventory, notification, invoice, discount, analytics, graphql-service),
  orchestrated via `docker-compose.yaml`, backed by MongoDB + NATS, with Traefik,
  Jaeger, Prometheus, Grafana, and Mailhog for observability/dev tooling.
- `pi-shop-api` has uncommitted in-progress changes (order/checkout/graphql-service), so
  the running stack must build from local source, not stale prebuilt binaries.
- Two ports collide with an unrelated project already running locally
  (`shadow-sso-server` on 8080, `shadow-sso-mongo` on 27017).

## 1. Backend: local docker-compose stack

- Remap only the two colliding ports inside `pi-shop-api`:
  - MongoDB: host `27018` → container `27017`
  - `graphql-service` (storefront/admin GraphQL gateway): host `8090` → container `8080`
  - All other infra ports (NATS 4222/6222/8222, Jaeger 16686/4317/4318, Prometheus 9090,
    Grafana 3000, Redis 6379, Mailhog 1025/8025, Traefik 8000/8443/8090-dashboard) are
    already free and stay as-is (adjusting the Traefik dashboard mapping if it collides
    with the new graphql-service port).
- Bring the stack up with `docker-compose up --build` so local source changes are
  included.
- Seed data with the existing `pishop admin seed` CLI; add more products/categories via
  `pishop admin faker` if the default static seed (3 products) is too sparse for
  collection/search/grid pages to look real.
- Stripe: `payment-service` currently has no `STRIPE_*` env vars set (gateway disabled).
  Once the user supplies test keys, set `STRIPE_ENABLED=true`,
  `STRIPE_SECRETKEY`, `STRIPE_PUBLISHABLEKEY`, `STRIPE_WEBHOOKSECRET` (exact env var
  names to be confirmed against `shared/pkg/config` conventions) and mirror the
  publishable key into the frontend as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
  Until keys are supplied, the checkout payment step should complete via whatever
  stub/mock path exists (or a minimal one added) so the flow isn't blocked.

## 2. Frontend: point at the local backend

- The GraphQL endpoint is currently hardcoded in `src/lib/client/apollo-client.ts` as
  `http://localhost:8080/storefront.graphql`. Change this to read from
  `NEXT_PUBLIC_GRAPHQL_URL` (already hinted at in `.env.local`) with that hardcoded value
  as a fallback, and set `.env.local` to `http://localhost:8090/storefront.graphql`.
- No other client-side rework should be needed since `PiShopClient` and the cart store
  already target this schema — this phase is about verifying that assumption against a
  live backend and fixing drift.

## 3. Feature integration checklist

Each item below gets exercised against the live backend; bugs found get fixed on
whichever side (frontend adaptation or backend resolver/seed/data bug) is at fault:

1. **Home page blocks** — HeroSlider, FeaturedProduct, BrandLogos, PromoBanners,
   MiniProductList (new/untracked Payload blocks) render real product/collection data.
2. **Collections & listing** — `/collections/[slug]`, filtering and sorting.
3. **Product detail** — `/product/[slug]`, variants, add-to-cart.
4. **Search** — `/search`.
5. **Cart** — drawer + `/cart` page: add/update/remove items, coupon apply/remove.
6. **Checkout** — `/checkout` steps (information → shipping → payment), order creation.
7. **Payment** — Stripe test-mode charge (or stub, per above) completes the order.
8. **Order confirmation** — `/order-confirmation` shows the created order.
9. **Auth** — out of scope for this pass. Investigation found the storefront GraphQL
   schema has no login/register mutations at all (guest checkout is the only supported
   flow), so wiring real accounts would mean adding new mutations across
   `auth-service`/`customer-service`/`graphql-service` — a separate follow-up project.
   `/login` and `/signup` remain UI stubs.

## 4. Validation approach

Once both stacks are running, drive the full flow through a real browser (Chrome
DevTools MCP): home → browse/search → product detail → add to cart → checkout → pay →
order confirmation — watching network requests and console output at each step, not just
reading code. Fix issues found and re-run the affected step.

## Out of scope

- Production deployment concerns (Traefik TLS, k8s manifests).
- Building new business features not already represented in the frontend codebase.
- Full observability stack wiring (Jaeger/Prometheus/Grafana dashboards) beyond what's
  needed to see the app work.
- Real customer authentication (login/register). No GraphQL mutations for this exist
  anywhere in the backend yet; adding them is a separate follow-up project.
