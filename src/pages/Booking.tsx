import { useState, FormEvent } from "react";
import axios from "axios";
import { Calendar, Send } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type BookingSubmission = {
  name: string;
  phone: string;
  date: string;
  eventType: string;
  message: string;
};

const Booking = () => {
  const [formData, setFormData] = useState<BookingSubmission>({
    name: "",
    phone: "",
    date: "",
    eventType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const eventTypes = [
    "Wedding",
    "Corporate Event",
    "Birthday Party",
    "Anniversary",
    "Baby Shower",
    "Graduation",
    "Other Celebration",
  ];

  // ✅ Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 📅 Handle Date Selection (Reversed format: DD-MM-YYYY)
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`; // 👈 reversed format
      setFormData({ ...formData, date: formattedDate });
    } else {
      setFormData({ ...formData, date: "" });
    }
  };

  // 🚀 Submit Booking Form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    if (!formData.name || !formData.phone || !formData.date || !formData.eventType) {
      alert("Please fill all required fields!");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        eventType: formData.eventType.trim(),
        message: formData.message.trim(),
      };

      console.log("📤 Sending booking data:", payload);
      await axios.post("https://flower-yzko.onrender.com/api/bookings", payload);

      setSubmitStatus("success");
      setFormData({ name: "", phone: "", date: "", eventType: "", message: "" });
      setSelectedDate(null);
    } catch (error) {
      console.error("❌ Error submitting booking form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="h-16 w-16 text-pink-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-pink-400 mb-6">
              Book Your Event
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Let's discuss your vision and create something beautiful together
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-pink-400 font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white"
                    placeholder="Enter Your Name"
                    placeholder="Jane Smith"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-pink-400 font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white"
                    placeholder="+91 98******10"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Date + Event Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-pink-400 font-medium mb-2">
                    Event Date *
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd-MM-yyyy"
                    minDate={new Date()}
                    className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white"
                    placeholderText="Select event date"
                  />
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-pink-400 font-medium mb-2">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-400 appearance-none"
                  >
                    <option value="" className="bg-black text-gray-300">
                      Select event type
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type} className="bg-black text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-pink-400 font-medium mb-2">
                  Tell Us About Your Vision
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white resize-none"
                  placeholder="Share details about your event..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Booking Request</span>
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                  <p className="text-green-400 font-semibold text-lg mb-2">
                    Booking Request Received!
                  </p>
                  <p className="text-gray-300 text-sm">
                    Thank you! We'll contact you within 24 hours.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
