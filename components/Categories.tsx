import {motion} from 'framer-motion' 
import Link from 'next/link';
type Category = {
     name: string;
     href: string;
   };
   
   interface CategoriesProps {
     categories: Category[];
   }

export default function Categories({categories}:CategoriesProps) {
  return (
     <nav className="bg-gray-800 text-white sticky top-0 z-10 w-full">
        <div className="container mx-auto">
          <ul className="flex justify-between  p-2">
            {categories.map((category, index) => (
              <motion.li 
                key={category.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-base font-normal"
              >
                <Link 
                  href={category.href} 
                  className="hover:text-gray-300 transition-colors"
                >
                  {category.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>
  )
}

