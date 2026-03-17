import { useState, FormEvent } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Send } from "lucide-react";

type ContactSubmission = {
  name: string;
  email: string;
  phone: string; // ✅ Added phone field
  message: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: "",
    email: "",
    phone: "", // ✅ Added
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // ✅ Correct API endpoint (working in Postman)
      const response = await axios.post("https://flower-yzko.onrender.com/api/contact", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Contact form submitted successfully:", response.data);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" }); // ✅ Reset phone too
    } catch (error: any) {
      setSubmitStatus("error");

      if (axios.isAxiosError(error)) {
        console.error("❌ Axios Error:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error("❌ Unexpected Error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-pink-400 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have a question or ready to discuss your floral needs? We'd love to hear from you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side */}
            <div>
              <h2 className="text-3xl font-playfair font-bold text-pink-400 mb-8">
                Contact Information
              </h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-xl">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-pink-400 mb-1">Address</h3>
                    <p className="text-gray-300">Shop-Doharighat, Mau</p>
                    <p className="text-gray-300">Current Add: Chakauth, Surajpur, Pin-276306</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-xl">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-pink-400 mb-1">Phone</h3>
                    <p className="text-gray-300">6394109134, 9452209117, 8115993106</p>
                    <p className="text-gray-400 text-sm">Mon-Sun: 6AM - 10PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-xl">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-pink-400 mb-1">Email</h3>
                    <p className="text-gray-300">Shivamsaini01364@gmail.com</p>
                    <p className="text-gray-400 text-sm">We reply within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Form */}
            <div>
              <h2 className="text-3xl font-playfair font-bold text-pink-400 mb-8">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-pink-400 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    placeholder="Enter Your Name"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-pink-400 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    placeholder="name@example.com"
                    placeholder="john@example.com"
                  />
                </div>

                {/* ✅ Added Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-pink-400 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    placeholder="e.g. 979*****01"
                    placeholder="e.g. 9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-pink-400 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 resize-none"
                    placeholder="Tell us about your floral needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : <>Send Message <Send className="h-5 w-5" /></>}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center mt-4">
                    ✅ Thank you! Your message has been sent successfully.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center mt-4">
                    ❌ Something went wrong. Please try again later.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
