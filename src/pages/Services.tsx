import { useState } from 'react';
import { Heart, Gift, Sparkles, Building2, PartyPopper, ChevronDown, ChevronUp } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  image: string;
}

const Services = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const services: Service[] = [
    {
      id: 'weddings',
      title: 'Wedding Florals',
      description: 'Breathtaking arrangements to make your special day unforgettable',
      icon: <Heart className="h-8 w-8" />,
      details: [
        'Bridal bouquets and bridesmaid arrangements',
        'Ceremony arches and aisle decorations',
        'Reception centerpieces and table settings',
        'Boutonnieres and corsages',
        'Personalized floral installations',
      ],
      image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'events',
      title: 'Corporate Events',
      description: 'Professional floral designs for business occasions and conferences',
      icon: <Building2 className="h-8 w-8" />,
      details: [
        'Conference and seminar decorations',
        'Product launch arrangements',
        'Corporate gala centerpieces',
        'Office space beautification',
        'Branded floral installations',
      ],
      image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'parties',
      title: 'Private Celebrations',
      description: 'Custom designs for birthdays, anniversaries, and special moments',
      icon: <PartyPopper className="h-8 w-8" />,
      details: [
        'Birthday party decorations',
        'Anniversary celebrations',
        'Baby showers and gender reveals',
        'Graduation ceremonies',
        'Themed party arrangements',
      ],
      image: 'https://images.pexels.com/photos/1059111/pexels-photo-1059111.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'luxury',
      title: 'Luxury Arrangements',
      description: 'Premium exotic flowers for distinguished tastes',
      icon: <Sparkles className="h-8 w-8" />,
      details: [
        'Rare and exotic flower selections',
        'High-end event styling',
        'Luxury hotel and venue decorations',
        'VIP client arrangements',
        'Custom artistic installations',
      ],
      image: 'https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'gifts',
      title: 'Gift Arrangements',
      description: 'Thoughtful floral gifts for every occasion',
      icon: <Gift className="h-8 w-8" />,
      details: [
        'Hand-tied bouquets',
        'Flower boxes and baskets',
        'Seasonal arrangements',
        'Thank you and appreciation gifts',
        'Same-day delivery available',
      ],
      image: 'https://images.pexels.com/photos/1449056/pexels-photo-1449056.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-pink-400 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From intimate gatherings to grand celebrations, we create floral experiences that captivate and inspire
            </p>
          </div>

          <div className="space-y-6">
            {services.map((service) => {
              const isExpanded = expandedId === service.id;

              return (
                <div
                  key={service.id}
                  className={`bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'border-pink-500/50' : 'hover:border-pink-500/30'
                  }`}
                >
                  <div
                    className="p-6 md:p-8 cursor-pointer"
                    onClick={() => toggleExpand(service.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-16 h-16 bg-pink-500/20 rounded-xl flex items-center justify-center text-pink-400 flex-shrink-0">
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl md:text-3xl font-playfair font-bold text-pink-400 mb-2">
                            {service.title}
                          </h2>
                          <p className="text-gray-300 text-lg">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <button className="text-pink-400 hover:text-pink-300 transition-colors ml-4">
                        {isExpanded ? (
                          <ChevronUp className="h-6 w-6" />
                        ) : (
                          <ChevronDown className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 md:px-8 pb-8 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-pink-900/20">
                        <div>
                          <h3 className="text-xl font-semibold text-pink-400 mb-4">
                            What We Offer
                          </h3>
                          <ul className="space-y-3">
                            {service.details.map((detail, index) => (
                              <li
                                key={index}
                                className="flex items-start space-x-2 text-gray-300"
                              >
                                <span className="text-pink-400 mt-1">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6">
                            <a
                              href="/booking"
                              className="inline-block px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
                            >
                              Book This Service
                            </a>
                          </div>
                        </div>
                        <div className="rounded-xl overflow-hidden h-64 md:h-full">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
