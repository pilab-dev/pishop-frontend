import React from 'react'

interface SocialButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: 'login' | 'signup'
}

export const SocialButton = ({ icon, label, onClick, variant = 'login' }: SocialButtonProps) => {
  const baseClasses =
    'w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border font-medium transition-colors hover:bg-gray-50'
  const variantClasses =
    variant === 'signup' ? 'border-gray-300 text-gray-700' : 'border-gray-300 text-gray-700'

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  )
}
