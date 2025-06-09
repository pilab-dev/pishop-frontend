import { subtitle, title } from "@/components/primitives";

export default async function AboutPage() {
  return (
    <>
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
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">🏛️</span>
          <h2 className="text-3xl font-bold text-gray-900">Budapest Based</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Strategically located in the heart of Budapest, we leverage our
          central European position to provide efficient logistics and quick
          delivery times to customers throughout Hungary and neighboring
          countries.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-blue-600 text-4xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Fulfillment Services
          </h3>
          <p className="text-gray-600">
            Our state-of-the-art fulfillment center in Budapest handles storage,
            packaging, and shipping, ensuring your products reach customers
            quickly and in perfect condition.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-blue-600 text-4xl mb-4">🚚</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Drop Shipping
          </h3>
          <p className="text-gray-600">
            Streamline your business with our drop shipping solutions. We handle
            inventory and shipping, while you focus on growing your customer
            base.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-blue-600 text-4xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            International Shipping
          </h3>
          <p className="text-gray-600">
            Reach customers across Europe with our reliable international
            shipping network and customs expertise.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-blue-600 text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Analytics & Support
          </h3>
          <p className="text-gray-600">
            Access detailed analytics and dedicated support to optimize your
            business performance and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Why Choose PiShop?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick shipping across Hungary</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">💎</div>
            <h3 className="font-semibold mb-2">Quality Control</h3>
            <p className="text-gray-600">Rigorous product inspection</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🤝</div>
            <h3 className="font-semibold mb-2">Local Support</h3>
            <p className="text-gray-600">Dedicated Hungarian team</p>
          </div>
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
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold">
          Become a Partner
        </button>
      </div>
    </>
  );
}
