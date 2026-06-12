import { title } from '@/components/primitives'
import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'

export function DocsContent() {
  return (
    <>
      <BreadcrumbBar
        segments={[
          {
            name: 'Docs',
            href: '/docs',
          },
        ]}
      />
      <div>
        <h1 className={title()}>Docs</h1>
      </div>
    </>
  )
}