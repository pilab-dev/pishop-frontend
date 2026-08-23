import Link from 'next/link'
import { FC } from 'react'

type HeroButtonProps = {
  text: string
  buttonClasses?: string
  knobClasses?: string
  onClick?: () => void
  ping?: boolean
  icon?: React.ReactNode
  noshadow?: boolean
  href?: string
}

export const HeroButton: FC<HeroButtonProps> = ({
  text,
  icon,
  buttonClasses,
  knobClasses,
  ping = false,
  noshadow = false,
  onClick,
  href,
}) => {
  const resolvedKnobClasses = knobClasses || buttonClasses || 'bg-primary text-[#212121]'

  return (
    <Link
      href={href || '#'}
      style={{
        userSelect: 'none',
      }}
      role="presentation"
      className="relative  w-fit cursor-pointer flex flex-row"
      onClick={onClick}
    >
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <div
          className={`relative p-4 ${noshadow ? '' : 'shadow-black shadow-xl'} rounded-full ${resolvedKnobClasses}`}
        >
          {ping && (
            <div
              style={{
                transform: 'scale(1.2)',
                opacity: '0.5',
              }}
              className={`absolute left-0 top-0 -z-10 rounded-full
                animate-ripple w-full h-full ${resolvedKnobClasses}`}
            />
          )}
          {icon}
        </div>
      </div>

      {/* Button content */}
      <div
        className={`text-sm font-semibold
        md:text-base md:font-bold
        transition border-2 rounded-full
       py-2.5 pl-4 pr-8 whitespace-nowrap ${buttonClasses || 'bg-primary border-primary text-[#212121]'}`}
      >
        {text}
      </div>
      {/* Placeholder for a button */}
      <div
        style={{
          width: '32px',
        }}
      ></div>
    </Link>
  )
}
