'use client'

import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  prefix?: string
  suffix?: string
}

export function Input({ label, error, prefix, suffix, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>}
      <div className={`flex items-center border rounded-xl bg-gray-50 transition-all duration-200 
        ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100'}`}>
        {prefix && <span className="pl-4 text-lg font-semibold text-gray-400">{prefix}</span>}
        <input
          className={`w-full px-4 py-2.5 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-base ${className}`}
          {...props}
        />
        {suffix && <span className="pr-4 text-sm text-gray-400">{suffix}</span>}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>}
      <textarea
        className={`w-full px-4 py-3 border rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 outline-none
          transition-all duration-200 text-base min-h-[100px] resize-y
          ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100'}
          ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
