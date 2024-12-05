import { Coffee } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full py-4 pr-4 text-right text-gray-400 bg-transparent">
      <p className="flex items-center justify-end gap-1">
        Built by <a 
          href="https://www.linkedin.com/in/jayson-brady-93ba8614b/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#E74753] transition-colors"
        >
          Jayson Brady
        </a>
        <Coffee className="w-5 h-4 text-gray-400" />
      </p>
    </footer>
  )
}

