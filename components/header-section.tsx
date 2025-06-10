import { getCollections } from "@/lib/client";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaUser } from "react-icons/fa";
import { TfiHeart, TfiReload, TfiShoppingCart } from "react-icons/tfi";

const TopRow = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-5 pt-2 flex flex-row justify-between">
      <div>
        <ul className="flex flex-row space-x-2">
          <li>
            <Link href="/account">
              <FaFacebook />
            </Link>
          </li>
          <li>
            <Link href="/account">
              <FaInstagram />
            </Link>
          </li>
          <li>
            <Link href="/account">
              <FaTwitter />
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex space-x-1 align-center items-center font-medium">
        <FaUser className="mr-2" />
        <Link
          href="/login"
          className="text-white hover:underline hover:text-primary transition"
        >
          login
        </Link>
        <span className="text-slate-400 font-normal">or</span>
        <Link
          href="/signup"
          className="text-white hover:underline hover:text-primary transition"
        >
          signup
        </Link>
      </div>
    </div>
  );
};

export const HeaderSection = async () => {
  const categories = await getCollections();

  return (
    <div className="top-0 z-50 w-full page-gray-800">
      <TopRow />

      <div className="hidden max-w-[1280px] mx-auto px-5 py-5 gap-16 items-center sm:flex flex-row justify-between space-x-5">
        <div className="font-medium uppercase my-auto">LOGO here</div>

        {/* This is the menu of the header section */}
        <ul className="flex gap-10 *:text-md *:font-semibold uppercase">
          <li>
            <Link className="hover:text-primary transition-colors" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-primary transition-colors"
              href="/about"
            >
              About us
            </Link>
          </li>
          <li>
            <Link className="hover:text-primary transition-colors" href="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-primary transition-colors"
              href="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* This is the search box of the header section */}
        <div className="hidden md:flex flex-row flex-1 rounded-full bg-white border-gray-700 text-gray-900 max-w-[550px]">
          <select className="bg-transparent flex-shrink ml-6 focus:outline-none">
            <option value="" disabled>
              Select category
            </option>
            <option value="all">All</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none px-4 py-2 w-full rounded-full"
          />
          <button className="focus:outline-none px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="page-gray-950">
        <div className="max-w-[1280px] uppercase mx-auto px-5 py-4 flex flex-row justify-between items-center">
          <ul className="footer-links flex flex-col md:flex-row gap-10 text-sm font-bold">
            {categories.map((category) => (
              <li key={category.path}>
                <Link href={`/collections/${category.path}`}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>

          <div>
            <ul className="flex flex-row gap-8">
              <li>
                <TfiReload fontSize={20} />
              </li>
              <li>
                <TfiHeart fontSize={20} />
              </li>
              <li>
                <TfiShoppingCart fontSize={20} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
