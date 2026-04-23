import { useState, useContext } from 'react';
import { Heart, Gift, Sparkles, Building2, PartyPopper, Car, Flower2, ChevronDown, ChevronUp } from 'lucide-react';
import { CartContext, CartItem } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';


interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  image: string;
  price: number;
}

const Services = () => {

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { addToCart } = useContext(CartContext)!;

  const navigate = useNavigate();


  const handleAddDefaultService = (service: Service) => {

    const serviceItem: CartItem = {
      id: Date.now(),
      name: service.title,
      price: service.price,
      type: "service",
      service: service.id
    };

    addToCart(serviceItem);

    navigate("/booking"); // better UX
  };

  const services: Service[] = [


    {
      id: 'wedding',
      title: 'Wedding Decoration',
      description: 'Complete luxury wedding decoration setup',
      icon: <Heart className="h-8 w-8" />,
      price: 500,
      details: [
        'Stage decoration',
        'Entrance flower gate',
        'Floral aisle decoration',
        'Center table flowers',
        'Lighting setup'
      ],
      image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg'
    },

    {
      id: 'haldi',
      title: 'Haldi Decoration',
      description: 'Traditional yellow theme haldi decoration',
      icon: <Flower2 className="h-8 w-8" />,
      price: 600,
      details: [
        'Haldi stage setup',
        'Marigold flower decor',
        'Background draping',
        'Floral seating area',
        'Photo corner'
      ],
      image: 'https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg'
    },

    {
      id: 'mehndi',
      title: 'Mehndi Decoration',
      description: 'Colorful mehndi event decoration',
      icon: <Sparkles className="h-8 w-8" />,
      price: 700,
      details: [
        'Colorful umbrella decor',
        'Flower backdrop',
        'Mehndi seating setup',
        'Light decoration',
        'Photo booth'
      ],
      image: 'https://images.pexels.com/photos/1059111/pexels-photo-1059111.jpeg'
    },

    {
      id: 'birthday',
      title: 'Birthday Decoration',
      description: 'Balloon and theme birthday decoration',
      icon: <PartyPopper className="h-8 w-8" />,
      price: 300,
      details: [
        'Balloon arch',
        'Happy birthday LED',
        'Cake table setup',
        'Theme balloons',
        'Photo backdrop'
      ],
      image: 'https://images.pexels.com/photos/1449056/pexels-photo-1449056.jpeg'
    },

    {
      id: 'anniversary',
      title: 'Anniversary Decoration',
      description: 'Romantic anniversary setup',
      icon: <Heart className="h-8 w-8" />,
      price: 400,
      details: [
        'Heart balloon decoration',
        'LED name board',
        'Table candle setup',
        'Flower decoration',
        'Romantic lighting'
      ],
      image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg'
    },

    {
      id: 'car',
      title: 'Car Decoration',
      description: 'Luxury wedding car decoration',
      icon: <Car className="h-8 w-8" />,
      price: 250,
      details: [
        'Fresh flower decoration',
        'Ribbon decoration',
        'Bonnet flowers',
        'Door handles flowers'
      ],
      image: 'https://images.pexels.com/photos/1565352/pexels-photo-1565352.jpeg'
    },

    {
      id: 'stage',
      title: 'Stage Decoration',
      description: 'Wedding and event stage setup',
      icon: <Sparkles className="h-8 w-8" />,
      price: 800,
      details: [
        'Luxury stage backdrop',
        'Flower decoration',
        'Lighting setup',
        'Curtain draping'
      ],
      image: 'https://images.pexels.com/photos/2749158/pexels-photo-2749158.jpeg'
    },

    {
      id: 'engagement',
      title: 'Engagement Decoration',
      description: 'Elegant engagement ceremony decoration',
      icon: <Gift className="h-8 w-8" />,
      price: 900,
      details: [
        'Ring ceremony stage',
        'Flower decoration',
        'Entrance decoration',
        'LED lights'
      ],
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg'
    },

    {
      id: 'babyshower',
      title: 'Baby Shower Decoration',
      description: 'Cute baby shower theme decoration',
      icon: <Gift className="h-8 w-8" />,
      price: 350,
      details: [
        'Baby theme balloons',
        'Backdrop decoration',
        'Cake table setup',
        'Photo booth'
      ],
      image: 'https://images.pexels.com/photos/1903611/pexels-photo-1903611.jpeg'
    },

    {
      id: 'corporate',
      title: 'Corporate Event Decoration',
      description: 'Professional event decoration',
      icon: <Building2 className="h-8 w-8" />,
      price: 120,
      details: [
        'Stage decoration',
        'Flower centerpieces',
        'Entrance decoration',
        'Brand setup'
      ],
      image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg'
    },

    {
      id: 'proposal',
      title: 'Proposal Decoration',
      description: 'Romantic proposal setup',
      icon: <Heart className="h-8 w-8" />,
      price: 450,
      details: [
        'Candle decoration',
        'Heart balloon setup',
        'LED lights',
        'Flower decoration'
      ],
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg'
    }

  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleBooking = (service: Service) => {

    addToCart({
      id: Date.now(),
      name: service.title,
      price: service.price,
      type: "service",
      service: service.id
    });

    navigate(`/gallery?service=${service.id}`);

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
              Choose the perfect decoration service for your event
            </p>
          </div>

          <div className="space-y-6">

            {services.map((service) => {

              const isExpanded = expandedId === service.id;

              return (
                <div
                  key={service.id}
                  className={`bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-pink-500/50' : 'hover:border-pink-500/30'
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

                          <p className="text-pink-400 font-semibold mt-2">
                            Starting Price ₹{service.price}
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
                              <li key={index} className="flex items-start space-x-2 text-gray-300">
                                <span className="text-pink-400 mt-1">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}

                          </ul>

                          <div className="mt-6 flex gap-4">

                            <button
                              onClick={() => handleAddDefaultService(service)}
                              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
                            >
                              Select Service
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBooking(service);
                              }}
                              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
                            >
                              Customize Design
                            </button>

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