import { useState } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const images: GalleryImage[] = [
    { id: 1, url: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Wedding Bouquet', category: 'weddings' },
    { id: 2, url: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Corporate Event', category: 'corporate' },
    { id: 3, url: 'https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Luxury Arrangement', category: 'luxury' },
    { id: 4, url: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Rose Bouquet', category: 'gifts' },
    { id: 5, url: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Floral Workshop', category: 'events' },
    { id: 6, url: 'https://images.pexels.com/photos/1449056/pexels-photo-1449056.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Gift Box', category: 'gifts' },
    { id: 7, url: 'https://images.pexels.com/photos/1059111/pexels-photo-1059111.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Party Decoration', category: 'events' },
    { id: 8, url: 'https://images.pexels.com/photos/2749158/pexels-photo-2749158.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Bridal Arrangement', category: 'weddings' },
    { id: 9, url: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Spring Flowers', category: 'luxury' },
    { id: 10, url: 'https://images.pexels.com/photos/1565352/pexels-photo-1565352.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Table Centerpiece', category: 'corporate' },
    { id: 11, url: 'https://images.pexels.com/photos/1903611/pexels-photo-1903611.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Sunflower Bouquet', category: 'gifts' },
    { id: 12, url: 'https://images.pexels.com/photos/1458400/pexels-photo-1458400.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Wedding Ceremony', category: 'weddings' },
  ];

  const categories = ['all', 'weddings', 'corporate', 'luxury', 'gifts', 'events'];

  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => img.category === filter);

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-pink-400 mb-6">
              Gallery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our portfolio of stunning floral arrangements and event decorations
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 capitalize ${
                    filter === category
                      ? 'bg-pink-500 text-white'
                      : 'bg-pink-500/10 text-pink-400 hover:bg-pink-500/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer border border-pink-900/20 hover:border-pink-500/50 transition-all duration-300"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    <p className="text-pink-400 text-sm capitalize">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-pink-500/20 hover:bg-pink-500/30 rounded-full text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-5xl max-h-[90vh] w-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="text-center mt-4">
              <h2 className="text-2xl font-playfair font-bold text-pink-400">
                {selectedImage.title}
              </h2>
              <p className="text-gray-400 capitalize">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
