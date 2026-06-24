'use client'

import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
  onClick?: () => void
}

const paddingMap = { sm: 'p-4', md: 'p-6', lg: 'p-8' }

export function Card({ children, className = '', padding = 'md', hover, onClick }: CardProps) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-2xl shadow-sm 
        ${paddingMap[padding]}
        ${hover ? 'hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer' : ''}
        ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-100 rounded-xl ${className}`} />
  )
}

export function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <p className="text-red-700 text-sm">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="text-sm font-medium text-red-600 hover:text-red-800">
          Retry
        </button>
      )}
    </div>
  )
}
