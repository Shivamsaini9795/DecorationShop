import { useState, useContext, useEffect } from "react";
import { X } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { useSearchParams, useNavigate } from "react-router-dom";

interface DesignOption {
  name: string;
  price: number;
  image: string;
  features: string[];
}

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  designs: DesignOption[];
}

const Gallery = () => {

  const { addToCart } = useContext(CartContext)!;

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [filter, setFilter] = useState("all");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service");
  const navigate = useNavigate();

  useEffect(() => {
    if (serviceParam) {
      setFilter(serviceParam);
      setSelectedService(serviceParam);
      setSelectedDesign(0);
    }
  }, [serviceParam]);

  const images: GalleryImage[] = [

    {
      id: 1,
      title: "Wedding Decoration",
      category: "wedding",
      description: "Luxury wedding stage decoration",
      price: 150,
      designs: [
        {
          name: "Classic",
          price: 0,
          image: "https://res.cloudinary.com/dokijn7ni/image/upload/v1777625431/WhatsApp_Image_2026-05-01_at_2.15.49_PM_nyw6bm.jpg",
          features: ["Stage decoration", "Flower gate", "Lighting"]
        },
        {
          name: "Premium Floral",
          price: 300,
          image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
          features: ["Premium flowers", "Entry decor", "Lighting", "Stage backdrop"]
        },
        {
          name: "Royal Wedding",
          price: 600,
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
          features: ["Royal sofa", "Floral stage", "LED lighting", "Entry decor", "Premium backdrop"]
        },
        {
          name: "Luxury Wedding",
          price: 900,
          image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
          features: ["Luxury stage", "Crystal lights", "Premium flowers", "Royal sofa", "Entry decor", "LED lighting"]
        }
      ]
    },

    {
      id: 2,
      title: "Haldi Decoration",
      category: "haldi",
      description: "Beautiful haldi ceremony decor",
      price: 800,
      designs: [
        {
          name: "Classic Haldi",
          price: 0,
          image: "https://res.cloudinary.com/dokijn7ni/image/upload/v1777622869/WhatsApp_Image_2026-05-01_at_1.36.34_PM_zp4nkk.jpg",
          features: ["Marigold decor", "Haldi seating", "Flower backdrop"]
        },
        {
          name: "Flower Haldi",
          price: 150,
          image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a",
          features: ["Flower canopy", "Lighting", "Haldi seating", "Backdrop decor"]
        },
        {
          name: "Premium Haldi",
          price: 300,
          image: "https://images.unsplash.com/photo-1603575448366-153f093fd0ea",
          features: ["Premium flowers", "Decor seating", "Flower canopy", "Lighting setup", "Entry decor"]
        },
        {
          name: "Luxury Haldi",
          price: 500,
          image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa",
          features: ["Luxury canopy", "Premium setup", "Flower decor", "Lighting", "Entry decor", "Stage setup"]
        }
      ]
    },

    {
      id: 3,
      title: "Mehndi Decoration",
      category: "mehndi",
      description: "Stylish mehndi decor",
      price: 900,
      designs: [
        {
          name: "Classic Mehndi",
          price: 0,
          image: "https://res.cloudinary.com/dokijn7ni/image/upload/v1777623743/IMG_9353.JPEG_v5wvvp.webp",
          features: ["Floral decor", "Seating", "Backdrop decor"]
        },
        {
          name: "Umbrella Theme",
          price: 200,
          image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa",
          features: ["Umbrella decor", "Flowers", "Seating", "Backdrop"]
        },
        {
          name: "Premium Mehndi",
          price: 400,
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
          features: ["Premium seating", "Decor stage", "Umbrella decor", "Lighting", "Flower setup"]
        },
        {
          name: "Luxury Mehndi",
          price: 650,
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
          features: ["Luxury decor", "LED lighting", "Premium seating", "Stage decor", "Entry decor", "Flower canopy"]
        }
      ]
    },

    {
      id: 4,
      title: "Car Decoration",
      category: "car",
      description: "Wedding car flower decoration",
      price: 300,
      designs: [
        {
          name: "Classic",
          price: 0,
          image: "https://res.cloudinary.com/dokijn7ni/image/upload/v1777624191/SKU-1808_0-1739082657175_tq2i6b.webp",
          features: ["Bonnet flowers", "Ribbon decor", "Front flower strip"]
        },
        {
          name: "Premium",
          price: 80,
          image: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
          features: ["Side flowers", "Ribbon decor", "Bonnet flowers", "Door ribbons"]
        },
        {
          name: "Royal",
          price: 150,
          image: "https://images.unsplash.com/photo-1493238792000-8113da705763",
          features: ["Full bonnet decor", "Side flowers", "Ribbon decor", "Front bouquet", "Door decor"]
        },
        {
          name: "Luxury",
          price: 250,
          image: "https://images.unsplash.com/photo-1493238792000-8113da705763",
          features: ["Premium roses", "Full car decor", "Door flowers", "Bonnet bouquet", "Ribbon decor", "Mirror flowers"]
        }
      ]
    },

    {
      id: 5,
      title: "Birthday Decoration",
      category: "birthday",
      description: "Birthday party decoration",
      price: 600,
      designs: [
        {
          name: "Classic Balloon",
          price: 0,
          image: "https://res.cloudinary.com/dokijn7ni/image/upload/v1777623861/1727785777pixelcut-export-_18_cnerin.webp",
          features: ["Balloon decor", "Cake table", "Backdrop"]
        },
        {
          name: "Theme Decor",
          price: 150,
          image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d",
          features: ["Theme balloons", "Cake setup", "Backdrop", "Table decor"]
        },
        {
          name: "Premium Party",
          price: 300,
          image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
          features: ["LED decor", "Premium theme", "Balloon arch", "Table setup", "Backdrop decor"]
        },
        {
          name: "Luxury Party",
          price: 500,
          image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659",
          features: ["Full theme decor", "Premium lighting", "Balloon arch", "Cake stage", "Entry decor", "Photo backdrop"]
        }
      ]
    },

    {
      id: 6,
      title: "Anniversary Decoration",
      category: "anniversary",
      description: "Romantic anniversary decoration",
      price: 700,
      designs: [
        {
          name: "Classic",
          price: 0,
          image: "https://res.cloudinary.com/dokijn7ni/image/upload/v1777624057/fe7f48af3b6b733828db9c68ba90fe38_z9vgxs.jpg",
          features: ["Table decor", "Flowers", "Candles"]
        },
        {
          name: "Candle Theme",
          price: 200,
          image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
          features: ["Candle decor", "Flower setup", "Table decor", "Backdrop"]
        },
        {
          name: "Premium",
          price: 350,
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
          features: ["Premium table", "Lighting", "Flower decor", "Candle setup", "Backdrop decor"]
        },
        {
          name: "Luxury",
          price: 550,
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
          features: ["Luxury seating", "Premium decor", "Candle lighting", "Flower arch", "Entry decor", "Table setup"]
        }
      ]
    },

    {
      id: 7,
      title: "Engagement Decoration",
      category: "engagement",
      description: "Elegant engagement stage",
      price: 1200,
      designs: [
        {
          name: "Classic",
          price: 0,
          image: "https://res.cloudinary.com/dokijn7ni/image/upload/v1777624496/event-decoration_nduueq.jpg",
          features: ["Stage decor", "Flowers", "Backdrop"]
        },
        {
          name: "Premium",
          price: 300,
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
          features: ["Premium flowers", "Lighting", "Stage decor", "Backdrop"]
        },
        {
          name: "Royal",
          price: 600,
          image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
          features: ["Royal sofa", "Floral backdrop", "Lighting", "Entry decor", "Stage flowers"]
        },
        {
          name: "Luxury",
          price: 900,
          image: "https://images.unsplash.com/photo-1519741497674-611481863552",
          features: ["Luxury stage", "Premium seating", "Crystal lights", "Flower arch", "Entry decor", "LED backdrop"]
        }
      ]
    },

    {
      id: 8,
      title: "Baby Shower Decoration",
      category: "babyshower",
      description: "Cute baby shower theme",
      price: 700,
      designs: [
        {
          name: "Classic",
          price: 0,
          image: "https://res.cloudinary.com/dokijn7ni/image/upload/v1777624603/1687940419_original_zhtay3.jpg",
          features: ["Balloon decor", "Backdrop", "Cake table"]
        },
        {
          name: "Theme",
          price: 200,
          image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659",
          features: ["Theme backdrop", "Balloon arch", "Cake setup", "Table decor"]
        },
        {
          name: "Premium",
          price: 350,
          image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
          features: ["Premium balloons", "Theme backdrop", "Lighting", "Cake stage", "Entry decor"]
        },
        {
          name: "Luxury",
          price: 500,
          image: "https://images.unsplash.com/photo-1519741497674-611481863552",
          features: ["Luxury theme decor", "Balloon arch", "Premium lighting", "Photo backdrop", "Cake stage", "Entry decor"]
        }
      ]
    },

    {
      id: 9,
      title: "Proposal Decoration",
      category: "proposal",
      description: "Romantic proposal setup",
      price: 500,
      designs: [
        {
          name: "Classic",
          price: 0,
          image: "https://res.cloudinary.com/dokijn7ni/image/upload/v1777624868/dff3809d46404aca9fd3db68e16ca90e.0000000_v0zha2.jpg",
          features: ["Rose path", "Candles", "Table setup"]
        },
        {
          name: "Candle Theme",
          price: 150,
          image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
          features: ["Candle decor", "Rose path", "Table decor", "Lighting"]
        },
        {
          name: "Premium",
          price: 300,
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
          features: ["LED letters", "Rose decor", "Candle lighting", "Entry decor", "Table setup"]
        },
        {
          name: "Luxury",
          price: 450,
          image: "https://images.unsplash.com/photo-1519741497674-611481863552",
          features: ["Luxury roses decor", "LED letters", "Candle path", "Entry flowers", "Lighting setup", "Table decor"]
        }
      ]
    },

    {
      id: 10,
      title: "Corporate Event Decoration",
      category: "corporate",
      description: "Professional corporate decor",
      price: 1000,
      designs: [
        {
          name: "Classic",
          price: 0,
          image: "https://res.cloudinary.com/dokijn7ni/image/upload/v1777624790/1677139298005_stwgbr.jpg",
          features: ["Stage", "Lighting", "Backdrop"]
        },
        {
          name: "Premium",
          price: 250,
          image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0",
          features: ["LED backdrop", "Stage decor", "Lighting", "Seating"]
        },
        {
          name: "Royal",
          price: 450,
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
          features: ["Premium seating", "Stage lighting", "LED backdrop", "Entry decor", "Brand board"]
        },
        {
          name: "Luxury",
          price: 700,
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
          features: ["Luxury stage", "Premium seating", "LED wall", "Lighting setup", "Entry decor", "Brand display"]
        }
      ]
    },

    {
      id: 11,
      title: "Reception Decoration",
      category: "reception",
      description: "Luxury reception stage decor",
      price: 1400,
      designs: [
        {
          name: "Classic",
          price: 0,
          image: "https://images.unsplash.com/photo-1519741497674-611481863552",
          features: ["Stage flowers", "Backdrop", "Lighting"]
        },
        {
          name: "Premium",
          price: 300,
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
          features: ["Premium decor", "Stage flowers", "Lighting", "Entry decor"]
        },
        {
          name: "Royal",
          price: 600,
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
          features: ["Royal sofa", "Floral backdrop", "Lighting", "Entry decor", "Stage flowers"]
        },
        {
          name: "Luxury",
          price: 900,
          image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
          features: ["Full luxury stage", "Crystal lights", "Premium flowers", "Royal sofa", "Entry decor", "LED backdrop"]
        }
      ]
    }

  ];

  const filteredImages =
    filter === "all"
      ? images
      : images.filter(img => img.category === filter);

  const handleAddDesign = () => {

    if (!selectedService) {
      alert("Please select service first");
      navigate("/services");
      return;
    }

    if (!selectedImage) return;

    const design = selectedImage.designs[selectedDesign];

    addToCart({
      id: Date.now(),
      name: selectedImage.title + " - " + design.name,
      price: selectedImage.price + design.price,
      type: "design",
      service: selectedImage.category
    });

    setSelectedImage(null);
    navigate("/booking");

  };

  return (
    <div className="min-h-screen pt-16">

      <section className="py-20 px-4">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-pink-400 mb-6">
              Gallery
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our decoration designs
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12 mt-8">

              {["all", "wedding", "haldi", "mehndi", "birthday", "anniversary", "engagement", "babyshower", "corporate", "proposal", "reception"].map(category => (

                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-lg capitalize transition ${filter === category
                      ? "bg-pink-500 text-white"
                      : "bg-pink-900/20 text-pink-300 hover:bg-pink-500/20"
                    }`}
                >
                  {category}
                </button>

              ))}

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredImages.map(image => (

              <div
                key={image.id}
                onClick={() => {
                  setSelectedImage(image);
                  setSelectedDesign(0);
                }}
                className="cursor-pointer border border-pink-900/20 rounded-xl overflow-hidden"
              >

                <img
                  src={image.designs[0].image}
                  alt={image.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-3 bg-black/60">
                  <h3 className="text-white font-semibold">
                    {image.title}
                  </h3>
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {selectedImage && (

        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full bg-black rounded-xl p-4 md:p-8 "
          >

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={32} />
            </button>

            <div className="flex flex-wrap gap-3 mb-6 overflow-x-auto">

              {selectedImage.designs.map((design, index) => (

                <button
                  key={index}
                  onClick={() => setSelectedDesign(index)}
                  className={`px-4 py-2 rounded-lg border ${selectedDesign === index
                      ? "bg-pink-500 text-white"
                      : "border-pink-500 text-pink-400"
                    }`}
                >
                  {design.name}
                </button>

              ))}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

              <div className="text-white">

                <h2 className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">
                  {selectedImage.title}
                </h2>

                <p className="text-gray-300 mb-3">
                  {selectedImage.description}
                </p>

                <p className="text-pink-400 font-semibold mb-6">
                  Price ₹{selectedImage.price + selectedImage.designs[selectedDesign].price}
                </p>

                <ul className="space-y-2 mb-6">

                  {selectedImage.designs[selectedDesign].features.map((item, i) => (

                    <li key={i} className="text-gray-300">
                      • {item}
                    </li>

                  ))}

                </ul>

                <button
                  onClick={handleAddDesign}
                  className="bg-pink-500 px-6 py-3 rounded-lg"
                >
                  Add Design To Booking
                </button>

              </div>

              <div>

                <img
                  src={selectedImage.designs[selectedDesign].image}
                  className="rounded-lg w-full h-[260px] md:h-[420px] object-cover"
                />

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );

};

export default Gallery;