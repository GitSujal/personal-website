import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  React.useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Hire Me', href: '/hire-me' },
    { name: 'Ventures', href: '/ventures' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Home">
          <img src="/logo.svg" alt="Sujal Dhungana" className="h-10 w-10 rounded" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {links.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`${
                isActive(link.href)
                  ? 'text-teal-600 dark:text-teal-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400'
              } transition-colors`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Theme Toggle + Mobile Menu */}
        <div className="flex gap-4 items-center">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 space-y-2">
          {links.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`block px-4 py-2 rounded ${
                isActive(link.href)
                  ? 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
    </header>
  );
}
