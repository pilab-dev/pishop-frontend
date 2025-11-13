import { ChevronDown, LucideChevronUp } from 'lucide-react'

interface NavigationButtonsProps {
  onPrev: () => void
  onNext: () => void
}

export const NavigationButtons = ({ onPrev, onNext }: NavigationButtonsProps) => {
  return (
    <div className="absolute inset-0">
      <div className="absolute -top-7 -left-1 w-14 h-14 rounded-full bg-yellow-400/80 animate-pulse"></div>
      <button
        onClick={onPrev}
        className="absolute -top-6 left-0 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
      >
        <LucideChevronUp className="h-7 w-7 text-white" />
      </button>

      <button
        onClick={onNext}
        className="absolute -bottom-6 left-0 w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
      >
        <ChevronDown className="h-7 w-7 text-black" />
      </button>
    </div>
  )
}
