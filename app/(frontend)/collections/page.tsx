import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { client } from '@/lib/client'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse all product collections',
}

async function getCollections() {
  try {
    const collections = await client.getCollections()
    return collections
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Collections</h1>
        <p className="text-gray-600">Browse our curated product collections</p>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No collections found</p>
          <Button asChild>
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Card key={collection.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {collection.name}
                  </Link>
                </CardTitle>
                {collection.description && (
                  <CardDescription className="line-clamp-2">
                    {collection.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {collection.products?.length || 0} products
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/collections/${collection.slug}`}>Browse</Link>
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
