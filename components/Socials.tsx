import Link from "next/link";
import { motion } from "framer-motion"
import { Search } from "lucide-react";

type Social = {
     name: string; href: string;
}

interface SocialProps{
     socials: Social[];
}

export default function Socials({ socials }: SocialProps) {
     return (
          <nav>
          <ul className="flex space-x-7">
            {socials.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link href={item.href} className="text-white hover:text-gray-200">
                  <svg 
                    className="w-6 h-6" 
                    fill="#121212" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                  >
                    <path d={item.icon} />
                  </svg>
                  <span className="sr-only">{item.name}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
          <motion.div 
            className="max-w-md w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <input
                type="search"
                placeholder="Search news..."
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
            </div>
          </motion.div>
        </nav>
}

