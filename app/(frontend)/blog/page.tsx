import type { Metadata } from 'next'
import { title } from "@/components/primitives";
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Post } from '@/payload-types'
import { cache, use } from 'react'
import { unstable_cache } from 'next/cache'

const baseUrl = process.env.SITE_BASE_URL || 'https://shop.pilab.hu'

const getPosts = unstable_cache(
  cache(async (): Promise<Post[]> => {
    const payload = await getPayload({ config })

    const posts = await payload.find({
      collection: 'posts',
      limit: 10,
      sort: '-publishedAt',
      where: {
        _status: {
          equals: 'published',
        },
      },
    })

    return posts.docs
  }),
  ['blog-posts'],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['posts'],
  }
)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog | ShopPi - Tech News and Articles',
    description: 'Read the latest tech news, product reviews, and articles on ShopPi blog. Stay updated with the latest trends in second-hand tech marketplace.',
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
    openGraph: {
      title: 'Blog | ShopPi - Tech News and Articles',
      description: 'Read the latest tech news, product reviews, and articles on ShopPi blog.',
      url: `${baseUrl}/blog`,
      siteName: 'ShopPi',
      type: 'website',
    },
  }
}

export default function BlogPage() {
  const posts = use(getPosts())

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`${title()} text-center mb-8`}>Blog</h1>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {post.heroImage && typeof post.heroImage === 'object' && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.heroImage.url!}
                    alt={post.heroImage.alt || post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 hover:text-blue-600">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h2>
                {post.meta?.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.meta.description}</p>
                )}
                {post.publishedAt && (
                  <time className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
