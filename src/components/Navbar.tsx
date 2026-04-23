import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Flower2, Globe, User } from "lucide-react";
import GoogleTranslate from "./GoogleTranslate";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const [user, setUser] = useState<string | null>(null);
  const [dropdown, setDropdown] = useState(false);

  const location = useLocation();

  useEffect(() => {

  const updateUser = () => {
    const savedUser = localStorage.getItem("userEmail");
    setUser(savedUser);
  };

  updateUser();

  window.addEventListener("userLogin", updateUser);

  return () => {
    window.removeEventListener("userLogin", updateUser);
  };

}, []);

  const logout = () => {
    localStorage.removeItem("userEmail");
    setUser(null);
    setDropdown(false);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
    { path: "/booking", label: "Book Now" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const userInitial = user ? user.charAt(0).toUpperCase() : "";

  return (
    <>
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Flower2 className="h-8 w-8 text-pink-400" />
            <span className="text-lg md:text-xl font-playfair font-bold text-pink-400">
              Shivam Flower Decoration
            </span>
          </Link>

          {/* Desktop Menu */}
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

            {/* Translator */}
            <div className="ml-4 flex items-center space-x-2 bg-black/30 px-3 py-2 rounded-lg border border-pink-900/30">
              <GoogleTranslate />
            </div>

            {/* User Avatar */}
            <div className="ml-4 relative">
              <button
                onClick={() => {
                  if (user) {
                    setDropdown(!dropdown);
                  } else {
                    setLoginOpen(true);
                  }
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500 text-white font-semibold"
              >
                {user ? userInitial : <User size={18} />}
              </button>

              {dropdown && user && (
                <div className="absolute right-0 mt-3 w-44 bg-black border border-pink-900/30 rounded-lg shadow-lg">

                  <div className="px-4 py-3 text-sm text-gray-300 border-b border-pink-900/20">
                    {user}
                  </div>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-pink-500/10 hover:text-pink-400"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-pink-400"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/95 border-t border-pink-900/20">
            <div className="flex flex-col px-4 py-4 space-y-2">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? "bg-pink-500/20 text-pink-400"
                      : "text-gray-300 hover:text-pink-400 hover:bg-pink-500/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* User Section */}
              <div className="border-t border-pink-900/20 mt-3 pt-3">

                {user ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-2 text-gray-300">
                      <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-white font-semibold">
                        {userInitial}
                      </div>
                      <span>{user}</span>
                    </div>

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-pink-500/10 hover:text-pink-400"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setLoginOpen(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-pink-500/10 hover:text-pink-400"
                  >
                    <User size={16} />
                    <span>Login</span>
                  </button>
                )}

              </div>

              {/* Translator */}
              <div className="mt-4 flex items-center justify-center bg-black/30 px-3 py-2 rounded-lg border border-pink-900/30">
                <Globe className="h-5 w-5 text-pink-400 mr-2" />
                <GoogleTranslate />
              </div>

            </div>
          </div>
        )}

      </nav>

      <Login
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        openRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />

      <Register
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        openLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />
    </>
  );
};

export default Navbar;