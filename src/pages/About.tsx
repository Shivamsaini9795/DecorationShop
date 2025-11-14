import { Award, Users, Lightbulb, Target } from "lucide-react";
import { useState } from "react";

const About = () => {
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-950/20 via-black to-black"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* ---------------- OUR STORY ---------------- */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-pink-400 mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A journey of passion, creativity, and dedication to floral excellence
            </p>
          </div>

          {/* ----------- TEXT + IMAGE SECTION ----------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-playfair font-bold text-pink-400">
                Where Beauty Meets Purpose
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Founded in 2015, Bloom & Bliss began with a simple vision: to
                bring joy and beauty into people's lives through the art of floral
                design. What started as a small boutique studio has blossomed into
                a premier destination for exquisite flower arrangements and event
                decoration.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our founder, inspired by nature's endless beauty and the power of
                flowers to transform spaces and emotions, dedicated years to
                mastering the craft of floral artistry. Today, our team of
                passionate designers continues that legacy, creating stunning
                arrangements that tell stories and capture hearts.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Every petal, every stem, every color is chosen with intention. We
                believe that flowers are more than decoration—they're expressions
                of love, celebration, remembrance, and hope.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-pink-900/30">
                <img
                  src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Flower arrangement"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-pink-500/10 rounded-2xl border border-pink-500/30 -z-10"></div>
            </div>
          </div>

          {/* ----------- NEW 3 CLICKABLE IMAGE CARDS ----------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 px-4 md:px-0">
  {[
    {
      title: "Founder",
      img: "https://res.cloudinary.com/dokijn7ni/image/upload/v1763121563/Baba_yidrwq.jpg",
      detail:
        "We design elegant wedding decorations with fresh flowers, lighting, and stage setups that make your special day unforgettable.",
    },
    {
      title: "Owner",
      img: "https://res.cloudinary.com/dokijn7ni/image/upload/v1763121849/Papa_zw41tl.jpg",
      detail:
        "Professional floral arrangements for meetings, product launches, and award ceremonies that add class and freshness to your corporate events.",
    },
    {
      title: "Co-Owner",
      img: "https://res.cloudinary.com/dokijn7ni/image/upload/v1763121861/Ram_bgdwg2.jpg",
      detail:
        "Vibrant and colorful birthday decorations with balloons, floral backdrops, and customized themes for all age groups.",
    },
  ].map((card, index) => (
    <div
      key={index}
      className="group border border-pink-900/30 rounded-2xl overflow-hidden bg-gradient-to-b from-pink-950/10 to-black/30 hover:shadow-2xl hover:border-pink-500/40 transition-all duration-500"
    >
      {/* Image Section */}
      <div className="overflow-hidden">
        <img
          src={card.img}
          alt={card.title}
          className=" w-64 h-64 object-cover rounded-full mx-auto mt-4"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 text-center">
        <h3
          onClick={() => toggleCard(index)}
          className="text-2xl font-playfair font-bold text-pink-400 cursor-pointer hover:underline"
        >
          {card.title}
        </h3>
        {activeCard === index && (
          <p className="text-gray-300 mt-4 leading-relaxed">{card.detail}</p>
        )}
      </div>
    </div>
  ))}
</div>


          {/* ----------- STATS SECTION ----------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="text-center p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="text-4xl font-bold text-pink-400 mb-2">500+</div>
              <div className="text-gray-400">Events Decorated</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="text-4xl font-bold text-pink-400 mb-2">1000+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="text-4xl font-bold text-pink-400 mb-2">15+</div>
              <div className="text-gray-400">Awards Won</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="text-4xl font-bold text-pink-400 mb-2">9</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
          </div>

          {/* ----------- MISSION / VISION / TEAM / VALUES ----------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-pink-400 mb-3">
                    Our Mission
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    To create breathtaking floral experiences that elevate every
                    celebration, transforming spaces into magical moments that
                    last a lifetime.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-pink-400 mb-3">
                    Our Vision
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    To be the most trusted name in floral artistry, known for
                    innovation, quality, and the ability to bring any vision to
                    beautiful reality.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-pink-400 mb-3">
                    Our Team
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    A passionate collective of artists, designers, and
                    horticulturists united by their love for flowers and
                    commitment to excellence.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-pink-400 mb-3">
                    Our Values
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Integrity, creativity, sustainability, and an unwavering
                    commitment to exceeding expectations in every arrangement we
                    create.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ----------- NEW DEVELOPER CARD (JUST ABOVE FOOTER) ----------- */}
          <div className="max-w-xl mx-auto text-center border border-pink-900/30 rounded-2xl p-8 bg-gradient-to-br from-pink-900/10 to-transparent mb-12">
            <img
              src="https://res.cloudinary.com/dokijn7ni/image/upload/v1763121872/slogo_tulkxj.jpg"
              alt="Shivam Saini"
              className="w-32 h-32 mx-auto rounded-full object-cover border-2 border-pink-400 mb-4"
            />
            <h3 className="text-3xl font-playfair font-bold text-pink-400">
              Shivam Saini
            </h3>
            <p className="text-gray-300 text-lg mt-2">Full Stack Developer</p>
            <p className="text-gray-400 text-sm mt-2">
              Developer of this website | Passionate about creating smooth, modern, and responsive web experiences.
            </p>
            <p className="text-gray-400 text-sm mt-3">
              📧 <a href="mailto:shivamsaini01364@gmail.com" className="underline text-pink-400">
                shivamsaini01364@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
