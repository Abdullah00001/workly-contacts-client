import type { FC } from 'react';
import { Users, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const CommonFooter: FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Workly Contacts
                </h3>
              </div>
            </div>
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              The most intuitive contact management platform. Organize, manage,
              and stay connected with your contacts effortlessly.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm break-all">
                  support@workly.ink
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Support Links */}
          <div className="col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Support
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href={'/help'}
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group text-sm sm:text-base"
                >
                  <span>Help Center</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              </li>
              <li>
                <Link
                  href={'/privacy'}
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group text-sm sm:text-base"
                >
                  <span>Privacy Policy</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              </li>
              <li>
                <Link
                  href={'/terms'}
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group text-sm sm:text-base"
                >
                  <span>Terms of Service</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              </li>
              <li>
                <Link
                  href={'/contact'}
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group text-sm sm:text-base"
                >
                  <span>Contact Us</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Stay Connected
            </h4>
            <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
              Follow us for updates and contact management tips
            </p>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.329-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.329c.807-.881 1.958-1.371 3.329-1.371s2.448.49 3.329 1.371c.881.881 1.371 2.032 1.371 3.329s-.49 2.448-1.371 3.329c-.881.881-2.032 1.371-3.329 1.371zm7.718-7.718c-.881-.881-2.032-1.371-3.329-1.371s-2.448.49-3.329 1.371c-.881.881-1.371 2.032-1.371 3.329s.49 2.448 1.371 3.329c.881.881 2.032 1.371 3.329 1.371s2.448-.49 3.329-1.371c.881-.881 1.371-2.032 1.371-3.329s-.49-2.448-1.371-3.329z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="GitHub"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4">
              <h5 className="text-sm font-medium mb-2">Newsletter</h5>
              <p className="text-gray-400 text-xs mb-3">
                Get tips and updates delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-700 text-white text-sm rounded-md sm:rounded-l-md sm:rounded-r-none border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
                />
                <button className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md sm:rounded-l-none sm:rounded-r-md transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025 Workly Contact. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-xs text-center sm:text-left">
                Made with ❤️ for better contact management
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CommonFooter;
