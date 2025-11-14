import Link from 'next/link'
import { FC } from 'react'
import { FaChevronRight } from 'react-icons/fa'

interface Segment {
  name: string
  href: string
}

/**
 * BreadcrumbBar component is used to display the breadcrumb bar.
 */
type BreadcrumbBarProps = {
  segments: Segment[]
}

export const BreadcrumbBar: FC<BreadcrumbBarProps> = ({ segments }) => {
  return (
    // <!-- Breadcrumb -->
    <div className="breadcrumb-bg py-3">
      <div className="max-w-[1280px] mx-auto px-5">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-sm">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex transition-colors items-center font-medium 
                text-gray-900 hover:text-primary dark:text-gray-400 dark:hover:text-white"
              >
                Home
              </Link>
            </li>
            {segments.map((segment, index) => {
              const isLast = index === segments.length - 1
              return (
                <li key={index}>
                  <div className="flex items-center">
                    <FaChevronRight
                      className="rtl:rotate-180 w-2 h-2 text-gray-700 mx-1"
                      aria-hidden="true"
                    />
                    {isLast ? (
                      <span
                        className="ms-1 font-medium text-primary-900 dark:text-white md:ms-2"
                        aria-current="page"
                      >
                        {segment.name}
                      </span>
                    ) : (
                      <Link
                        href={segment.href}
                        className="transition-colors ms-1 font-medium text-gray-700 hover:text-primary md:ms-2 dark:text-gray-400 dark:hover:text-white"
                      >
                        {segment.name}
                      </Link>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </div>
  )
}
