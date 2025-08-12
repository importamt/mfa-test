/** @type {import('tailwindcss').Config} */
import baseConfig from '../../tailwind.config.base.js'

export default {
  ...baseConfig,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-red-600',
    'hover:bg-red-700',
    'bg-green-500',
    'hover:bg-green-600',
    'bg-yellow-400',
    'hover:bg-yellow-500',
    'bg-purple-600',
    'hover:bg-purple-700',
    'bg-gray-900',
    'hover:bg-black',
    'bg-blue-600',
    'hover:bg-blue-700',
    'bg-gray-800',
    'hover:bg-gray-900',
    'bg-blue-500',
    'text-gray-900',
    'text-white',
    'text-gray-400',
    'text-gray-500',
    'text-gray-300',
    'text-red-500'
  ]
}