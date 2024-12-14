import { Coffee } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full py-4 text-center text-gray-400 bg-transparent">
      <p className="flex items-center justify-center gap-1">
        Built by <a 
          href="https://www.jaysonbrady.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#E74753] transition-colors"
        >
          Jayson Brady
        </a>
        <Coffee className="w-5 h-4 text-gray-400" />
        • <a 
          href="https://jmbrady.notion.site/15c9d40c31368064bd60f6fa9e6ae899?pvs=105"
          className="hover:text-[#E74753] transition-colors"
        >
          Contact
        </a>
      </p>
    </footer>
  )
}

