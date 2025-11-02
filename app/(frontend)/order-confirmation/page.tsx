import Link from "next/link";

const OrderConfirmationPage = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Order Confirmed!</h1>
      <p className="text-lg mb-4">Thank you for your purchase. Your order has been placed successfully.</p>
      <p className="text-md mb-8">You will receive an email confirmation shortly with your order details.</p>
      <Link href="/">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
