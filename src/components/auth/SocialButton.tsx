import React from 'react'

interface SocialButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: 'login' | 'signup'
}

export const SocialButton = ({ icon, label, onClick }: SocialButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:bg-black hover:text-white hover:border-black"
    >
      {icon}
    </button>
  )
}
