import { Award, Users, Lightbulb, Target } from "lucide-react";
import { useState } from "react";

const About = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
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
                Founded in 1980, Shivam Flower Decoration began as a small-scale family venture with a simple vision—to bring beauty, joy, and elegance into people’s lives through the art of decoration. What started as a humble initiative by our founder, Chhedi Saini, has grown into a trusted name in floral design and event decoration.
              </p>

              <p className="text-gray-300 leading-relaxed">
                In 2012, we expanded our journey by opening a new branch in Dohrighat, marking an important milestone in our growth and commitment to serving more customers with excellence.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, our team of skilled designers continues this legacy, creating stunning decorations that transform spaces and create unforgettable memories.

                Every flower, every detail, every arrangement is crafted with care. We believe decoration is not just about appearance—it’s about emotions, celebrations, traditions, and creating moments that last forever.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-pink-900/30">
                <img
                  src="https://res.cloudinary.com/dokijn7ni/image/upload/v1777490963/eU7W8Zk0h6C7RXiCSmQTOQfoU0JUi51qmQrfmarzcIG2QsvGeJYS2jSGMA2jnGZNI1lcluiioSGZ7aUXjODjQwYleIQfi__AdLXnPGjL89p7OC94-NtjR3PzSxoSlMtyg3sy8e4UhiIxWfAF5uc0yKwvfgaoxiXaR4RAExuSC4cNrDyiG3zOUtxd05TPPcha_be7xi8.jpg"
                  alt="Flower arrangement"
                  className="w-full h-full object-cover"
                />
              </div>
              </div>
          </div>

          {/* ----------- NEW 3 CLICKABLE IMAGE CARDS ----------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 px-4 md:px-0">
            {[
              {
                title: "Founder",
                img: "https://res.cloudinary.com/dokijn7ni/image/upload/v1763121563/Baba_yidrwq.jpg",
                detail: (
                  <>
                    Inspired by the vision of our founder,{" "}
                    <span className="font-bold text-red-500">
                      Chhedi Saini
                    </span>
                    , we create elegant wedding decorations using fresh flowers, creative
                    lighting, and beautifully designed stage setups that turn every celebration
                    into a memorable experience.
                  </>
                ),
              },
              {
                title: "Owner",
                img: "https://res.cloudinary.com/dokijn7ni/image/upload/v1763121849/Papa_zw41tl.jpg",
                detail: (
                  <>
                    Under the leadership of{" "}
                    <span className="font-bold text-red-500">
                      Paras Saini
                    </span>{" "}
                    since 2005, we specialize in professional floral arrangements for meetings,
                    product launches, and award ceremonies, adding sophistication and freshness
                    to every corporate event.
                  </>
                ),
              },
              {
                title: "Co-Owner",
                img: "https://res.cloudinary.com/dokijn7ni/image/upload/v1763121861/Ram_bgdwg2.jpg",
                detail: (
                  <>
                    Under the management of{" "}
                    <span className="font-bold text-red-500 ">
                      Ramnayan Saini
                    </span>{" "}
                    since 2012 in Dohrighat, we specialize in vibrant birthday decorations,
                    customized themes, and also provide wholesale & retail flower supply along
                    with all types of decoration materials.
                  </>
                ),
              },
            ].map((card, index) => (
              <div
                key={index}
                className="group border border-pink-900/30 rounded-2xl overflow-hidden bg-gradient-to-b from-pink-950/10 to-black/30 hover:shadow-2xl hover:border-pink-500/40 transition-all duration-500"
              >
                <div className="overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className=" w-64 h-64 object-cover rounded-full mx-auto mt-4"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3
                    onClick={() => toggleCard(index)}
                    className="text-2xl font-playfair font-bold text-pink-400 cursor-pointer hover:underline"
                  >
                    {card.title}
                  </h3>
                  {activeCard === index && (
                    <p className="text-gray-300 mt-4 leading-relaxed">
                      {card.detail}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ----------- STATS SECTION ----------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="text-center p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="text-4xl font-bold text-pink-400 mb-2">12000+</div>
              <div className="text-gray-400">Events Decorated</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="text-4xl font-bold text-pink-400 mb-2">2000+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="text-4xl font-bold text-pink-400 mb-2">50+</div>
              <div className="text-gray-400">Awards Won</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl">
              <div className="text-4xl font-bold text-pink-400 mb-2">30</div>
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

          {/* ----------- DEVELOPER CARD ----------- */}
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
              Developer of this website | Passionate about creating smooth,
              modern, and responsive web experiences.
            </p>
            <p className="text-gray-400 text-sm mt-3">
              📧{" "}
              <a
                href="mailto:shivamsaini01364@gmail.com"
                className="underline text-pink-400"
              >
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
