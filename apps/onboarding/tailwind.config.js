/** @type {import('tailwindcss').Config} */
import baseConfig from '../../tailwind.config.base.js'

export default {
  ...baseConfig,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-red-500',
    'hover:bg-red-600',
    'bg-blue-600',
    'bg-black/80',
    'bg-black/70',
    'bg-black/30',
    'bg-gradient-to-br',
    'from-red-900',
    'via-black',
    'to-blue-900',
    'bg-gradient-to-t',
    'from-black/80',
    'via-black/50',
    'to-black/60',
    'text-red-500',
    'text-blue-500',
    'text-white',
    'text-gray-300',
    'text-gray-400',
    'text-gray-100',
    'hover:text-gray-300',
    'drop-shadow-lg',
    'drop-shadow-xl',
    'shadow-lg',
    'shadow-xl',
    'shadow-2xl',
    'hover:shadow-2xl'
  ]
}