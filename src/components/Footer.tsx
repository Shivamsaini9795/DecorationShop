import { Flower2, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-pink-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Flower2 className="h-8 w-8 text-pink-400" />
              <span className="text-base font-playfair font-bold text-pink-400">
                Shivam Flower Decoration
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Creating unforgettable moments with exquisite floral arrangements for every occasion.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-400 mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
                <span>Doharighat, Surajpur,Mau</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-pink-400 flex-shrink-0" />
                <span>+916394109134 <br/>&ensp;9452209117<br/>&ensp;8318019953</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-pink-400 flex-shrink-0" />
                <span translate="no"> Shivamsaini01364@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-400 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-pink-500/10 rounded-lg text-pink-400 hover:bg-pink-500/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/shivam_flower_decoration?igsh=MTcwYWtzczBlZHJkdg=="
              
                className="p-2 bg-pink-500/10 rounded-lg text-pink-400 hover:bg-pink-500/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-pink-500/10 rounded-lg text-pink-400 hover:bg-pink-500/20 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-pink-900/20 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Shivam Flower Decoration. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
