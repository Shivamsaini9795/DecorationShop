import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Flower2, Globe } from "lucide-react";
import GoogleTranslate from "./GoogleTranslate";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
    { path: "/booking", label: "Book Now" },
  ];

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-pink-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* 🌸 Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <Flower2 className="h-8 w-8 text-pink-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xl font-playfair font-bold text-pink-400">
            Shivam Flower Decoration
          </span>
        </Link>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive(link.path)
                  ? "bg-pink-500/20 text-pink-400"
                  : "text-gray-300 hover:text-pink-400 hover:bg-pink-500/10"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* 🌍 Translator */}
          <div className="ml-4 flex items-center space-x-2 bg-black/30 px-3 py-2 rounded-lg border border-pink-900/30">
            <Globe className="h-5 w-5 text-pink-400" />
            <GoogleTranslate />
          </div>
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-pink-400 hover:bg-pink-500/10 transition-colors"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-pink-900/20">
          <div className="flex flex-col px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? "bg-pink-500/20 text-pink-400"
                    : "text-gray-300 hover:text-pink-400 hover:bg-pink-500/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* 🌍 Mobile Translator */}
            <div className="mt-4 flex items-center justify-center space-x-2 bg-black/30 px-3 py-2 rounded-lg border border-pink-900/30">
              <Globe className="h-5 w-5 text-pink-400" />
              <GoogleTranslate />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;