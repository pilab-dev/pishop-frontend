import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { client } from '@/lib/client'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all product categories',
}

async function getCategories() {
  try {
    const categories = await client.getCategories({
      limit: 300,
    })
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-gray-600">Browse our product categories</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No categories found</p>
          <Button asChild>
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link
                    href={`/category/${category.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                </CardTitle>
                {category.description && (
                  <CardDescription className="line-clamp-2">{category.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.products?.length || 0} products
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/category/${category.slug}`}>Browse</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
