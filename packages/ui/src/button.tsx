'use client'

import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  className?: string
  appName: string
  type: 'button' | 'submit' | 'reset' | undefined
}

export const Button = ({
  children,
  className,
  appName,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  )
}
