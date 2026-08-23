# ShopPi Design Guidelines

Derived from the "Dama" mockups in this `design/` folder (home, shop listing,
product detail, cart, checkout, blog, contact, and the general style sheet).
This is the visual language for ShopPi, the second-hand tech marketplace this
frontend implements — not a generic template default, so treat deviations
from it as bugs, not style choices.

## Color

| Token | Value | Use |
|---|---|---|
| `--geist-primary` (`text-primary` / `bg-primary`) | `#f5c615` (gold) | Accents only: the first-letter highlight in `FancyTitle`, section eyebrow dashes (`SectionDecor`), active nav/tab state, links, price highlights, small circular icon buttons. **Never a full-size button background** — white-on-gold fails contrast and isn't how the reference design uses it. |
| Primary button | near-black (`neutral-900`/`neutral-800` hover), white text | The actual CTA color across every mockup page: "PROCEED TO CHECKOUT", "SUBMIT", "CONTINUE", "APPY COUPON". This is the `Button` component's `default` variant. |
| `bg-secondary` | `#f5c615` (gold) + near-black text | The one legitimate gold *button* case — small circular buy-now/cart icon buttons on product cards. |
| `.page-gray-800` `#212121`, `.page-gray-900` `#1e1e1e`, `.page-gray-950` `#141414` | dark charcoal | Header, footer, dark hero panels. Never pure `#000`. |
| `.breadcrumb-bg` `#ededed` | light gray | Breadcrumb strip under the header. |
| Body background | white | Everything else — product listings, cart, checkout, order pages. |
| Compare/wishlist icon circles | blue (`#2f6fb3`-ish) | Secondary product-card icon actions, distinct from the gold buy icon. |

Body copy is dark gray/black on white; muted text (`text-muted-foreground`)
for secondary lines (SKU, addresses, timestamps).

## Typography

- Nav links, category bars, and buttons: uppercase, medium/bold weight,
  tracked out slightly.
- Section and panel headings use **`FancyTitle`**
  (`src/components/fancy-title.tsx`): the first letter of the label is
  rendered in gold, the rest in the normal heading color — e.g. "**B**illing
  Info", "**Y**our order", "**Q**uick Links". This is the site's single most
  recognizable typographic signature. Every panel/section heading should use
  it instead of plain text.
- Homepage marketing section headers additionally prefix a short gold
  underline bar — **`SectionDecor`** (`src/components/ui/section-decor.tsx`,
  a 40×2px gold rule) — before the `FancyTitle`, e.g. "— Best Sellers".
  Reserve this combination for full marketing sections (home page product
  rails, hot-deals, best-sellers); plain `FancyTitle` alone is correct for
  form/panel headings inside cart, checkout, and account-style pages (that's
  what the checkout mockup itself does for "Billing Info" and "Your order" —
  no dash bar there).
- Large hero numerals/headlines are heavy weight, tight leading, often
  uppercase (e.g. "HEADPHONE", "SMART PHONE GALAXY EDGE").

## Buttons

- **Primary action** (`<Button>` default variant): solid near-black,
  white text, square corners. Used for every "proceed / submit / continue /
  apply" action.
- **Pill buttons** (`size="rounded"`): same black treatment, fully rounded —
  used for a few compact CTAs (mockup's "View detail" / "Buy now" pair).
- **Outline**: white background, border, for secondary actions ("Try Again",
  "Continue Shopping").
- **Gold** (`variant="secondary"`): reserved for small circular icon buttons
  (buy-now, add-to-cart) on product cards — not for text CTAs.

## Layout & structural motifs

- Centered container, `max-w-[1280px]`.
- Two-tier header: dark utility bar (social links, guarantee/store/currency,
  sign-in) above a search + icon row, then a darker category nav bar.
- Breadcrumb strip (`breadcrumb-bg`) directly under the header on every
  interior page.
- Flat white content panels with a thin border/hairline divider rather than
  heavy drop shadows; totals blocks (cart, checkout "Your order") sit in a
  light-gray (`bg-gray-100`) panel, not a white card.
- Dark footer: newsletter signup strip, then logo/description/address column
  + "Quick Links" + "Customer Care" columns (both headed with `FancyTitle`),
  then a copyright bar with payment-method icons.

## Applying this system

When building or touching a page:
1. Reach for `FancyTitle` for any panel/section heading instead of plain
   text — check existing usage (`grep -rl FancyTitle src app`) for the
   pattern before adding a new one.
2. Use the default `Button` variant for primary actions; don't reach for a
   gold button outside the small-icon-button case.
3. Keep dark surfaces on the `.page-gray-*` scale, not arbitrary blacks.
4. New product/section headers on marketing pages pair `SectionDecor` +
   `FancyTitle`; form and account-style panels use `FancyTitle` alone.
