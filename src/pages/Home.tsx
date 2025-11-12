import { Link } from 'react-router-dom';
import { Calendar, Sparkles, Heart } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-pink-950/20 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-pink-400 mb-6 animate-fade-in">
            Shivam Flower Decoration
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Crafting Elegant Floral Moments for Your Most Precious Celebrations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50"
            >
              Book Consultation
            </Link>
            <Link
              to="/gallery"
              className="px-8 py-4 bg-transparent border-2 border-pink-400 text-pink-400 hover:bg-pink-500/10 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              View Gallery
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-pink-400 rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-pink-400 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We bring passion, creativity, and dedication to every floral arrangement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-500/30 transition-colors">
                <Heart className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-pink-400 mb-4">
                Passionate Artistry
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Each arrangement is crafted with love and attention to detail, ensuring your vision comes to life beautifully.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-500/30 transition-colors">
                <Sparkles className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-pink-400 mb-4">
                Premium Quality
              </h3>
              <p className="text-gray-400 leading-relaxed">
                We source only the freshest, highest quality flowers to create stunning arrangements that last.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-500/30 transition-colors">
                <Calendar className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-pink-400 mb-4">
                Timely Service
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Your special day is important to us. We ensure every arrangement is delivered on time, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-pink-950/10 via-black to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-pink-400 mb-6">
            Ready to Create Magic?
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Let us transform your special occasion into an unforgettable floral experience
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50"
          >
            Contact Us 
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
