import { ChevronDown, LucideChevronUp } from 'lucide-react'

interface NavigationButtonsProps {
  onPrev: () => void
  onNext: () => void
}

export const NavigationButtons = ({ onPrev, onNext }: NavigationButtonsProps) => {
  return (
    <div className="absolute inset-0">
      {/* Previous button with pulse border */}
      <div className="absolute -top-7.5 -left-1.5 w-18 h-18 rounded-full bg-yellow-400/60 animate-pulse"></div>
      <button
        onClick={onPrev}
        className="absolute -top-6 left-0 w-15 h-15 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
      >
        <LucideChevronUp className="h-8 w-8 text-white" />
      </button>

      {/* Next button with pulse border */}
      {/* <div className="absolute -bottom-7 -left-1 w-16 h-16 rounded-full bg-white/60 animate-pulse"></div> */}
      <button
        onClick={onNext}
        className="absolute -bottom-6 left-0 w-15 h-15 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
      >
        <ChevronDown className="h-8 w-8 text-black" />
      </button>
    </div>
  )
}
