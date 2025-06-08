import { FC } from "react";
import { FaHome } from "react-icons/fa";

interface Segment {
  name: string;
  href: string;
}

/**
 * BreadcrumbBar component is used to display the breadcrumb bar.
 */
type BreadcrumbBarProps = {
  segments: Segment[];
};

export const BreadcrumbBar: FC<BreadcrumbBarProps> = ({ segments }) => {
  return (
    // <!-- Breadcrumb -->
    <div className="breadcrumb-bg py-3">
      <div className="max-w-[1280px] mx-auto px-5">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex transition-colors items-center text-md font-medium 
                text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white"
              >
                <FaHome />
                Home
              </a>
            </li>
            {segments.map((segment, index) => (
              <li key={index}>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <a
                    href={segment.href}
                    className={`transition-colors ms-1 text-md font-medium hover:text-primary md:ms-2 
                    dark:text-gray-400 dark:hover:text-white ${index === segments.length - 1 ? "text-primary-900" : ""}`}
                  >
                    {segment.name}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};
