import { title } from "@/components/primitives";

export default function PricingPage() {
  return (
    <div>
      <h1 className={title()}>Contact</h1>

      <form
        action="https://formspree.io/f/xnqwjnqj"
        className="max-w-md mx-auto mt-8 mb-0 space-y-4"
        method="POST"
      >
        <label
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          htmlFor="name"
        >
          Nev
        </label>
        <input
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="name"
          name="name"
          type="text"
        />
        <label
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          htmlFor="email"
        >
          E-mail cim
        </label>
        <input
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="email"
          name="email"
          type="email"
        />
        <label
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="message"
          name="message"
          // rows="4"
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
