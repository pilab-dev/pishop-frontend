import { subtitle, title } from "@/components/primitives";
import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'
import Link from "next/link";
import { Card, FeatureCard } from "./components/Card";

export default async function AboutPage() {
  return (
    <>
      <BreadcrumbBar
        segments={[
          {
            name: 'About',
            href: '/about',
          },
        ]}
      />
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className={`${title()} text-5xl font-bold text-gray-900 mb-4`}>
          About PiShop
        </h1>
        <p className={`${subtitle()} text-xl text-gray-600 max-w-2xl mx-auto`}>
          Your trusted e-commerce partner in Budapest, connecting quality
          products with customers across Hungary and Europe.
        </p>
      </div>

      {/* Location & Presence */}
      <Card
        icon="🏛️"
        title="Budapest Based"
        description="Strategically located in the heart of Budapest, we leverage our central European position to provide efficient logistics and quick delivery times to customers throughout Hungary and neighboring countries."
        className="border border-gray-200 mb-12"
      />

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card
          icon="📦"
          title="Fulfillment Services"
          description="Our state-of-the-art fulfillment center in Budapest handles storage, packaging, and shipping, ensuring your products reach customers quickly and in perfect condition."
          className="border border-gray-200"
        />
        <Card
          icon="🚚"
          title="Drop Shipping"
          description="Streamline your business with our drop shipping solutions. We handle inventory and shipping, while you focus on growing your customer base."
          className="border border-gray-200"
        />
        <Card
          icon="🌍"
          title="International Shipping"
          description="Reach customers across Europe with our reliable international shipping network and customs expertise."
          className="border border-gray-200"
        />
        <Card
          icon="📊"
          title="Analytics & Support"
          description="Access detailed analytics and dedicated support to optimize your business performance and customer satisfaction."
          className="border border-gray-200"
        />
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Why Choose PiShop?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="⚡"
            title="Fast Delivery"
            description="Quick shipping across Hungary"
          />
          <FeatureCard
            icon="💎"
            title="Quality Control"
            description="Rigorous product inspection"
          />
          <FeatureCard
            icon="🤝"
            title="Local Support"
            description="Dedicated Hungarian team"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Grow Your Business?
        </h2>
        <p className="text-gray-600 mb-8">
          Join our network of successful sellers and expand your reach across
          Hungary and Europe.
        </p>
        <Link
          href="/contact"
          className="bg-primary text-white px-8 py-4 hover:bg-primary-700
          active:focus:bg-primary-700
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          transition-colors duration-300 text-lg font-semibold"
        >
          Become a Partner
        </Link>
      </div>
    </>
  );
}
