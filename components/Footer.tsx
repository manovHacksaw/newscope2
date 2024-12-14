import Image from 'next/image';
import Link from 'next/link';
import { socials } from '@/utils/socials';
import { categories } from '@/utils/categories';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section: Join Us */}
        <div className="text-center mb-12">
          <p className="text-gray-700 text-lg">
            Want to share your thoughts?{' '}
            <Link href="/apply-author" className="text-blue-600 hover:underline font-semibold">
              Join us as an author!
            </Link>
          </p>
        </div>

        {/* Middle Section: Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start col-span-1 md:col-span-2 lg:col-span-1">
            <Image
              src="/footerLogo.png"
              alt="Website Logo"
              width={100}
              height={100}
              className="w-28 h-28"
            />
            
          </div>

          {/* Categories */}
          <div className="flex flex-col items-center md:items-start ">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>
            <ul className="space-y-2 text-center md:text-left" >
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Follow Us</h2>
            <div className="grid grid-cols-3 gap-4">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={`Follow us on ${social.name}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-8 h-8"
                  >
                    <path d={social.icon} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} NEWSCOPE. All Rights Reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-blue-600 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-500 hover:text-blue-600 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

