import { useState, useEffect, FormEvent, useContext } from "react";
import axios from "axios";
import { Calendar, Send } from "lucide-react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { CartContext } from "../context/CartContext";

type BookingSubmission = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  message: string;
};

const Booking = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useContext(CartContext)!;

  const formatSummary = (items: string[]) => {

    if (!items || items.length === 0) return "";

    if (items.length === 1) return items[0];

    return `${items[0]} +${items.length - 1} more`;

  };

  const serviceItems = cart.filter((i) => i.type === "service");
  const designItems = cart.filter((i) => i.type === "design");

  const servicePrice = serviceItems.reduce((s, i) => s + (i.price || 0), 0);
  const designPrice = designItems.reduce((s, i) => s + (i.price || 0), 0);

  const designSummary =
    designItems.length > 0
      ? formatSummary(designItems.map((d) => d.name))
      : "Choose Design";

  const [slot, setSlot] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState(0);
  const [offer, setOffer] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentDone, setPaymentDone] = useState(false);
  const [fullDates, setFullDates] = useState<string[]>([]);
  const travelCharge = Math.round(distance * 20);
  const totalPrice = servicePrice + designPrice + travelCharge;
  const finalPrice = offer ? Number(offer) : totalPrice;
  const minAdvance = Math.round(totalPrice * 0.25);
  const [advancePayment, setAdvancePayment] = useState(minAdvance);
  const remainingPayment = Math.max(totalPrice - advancePayment, 0);
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchFullDates = async () => {
      try {
        const res = await axios.get(
          "https://flower-yzko.onrender.com/api/bookings/full-dates"
        );
        setFullDates(res.data);
      } catch (err) {
        console.error("Error fetching full dates", err);
      }
    };

    fetchFullDates();
  }, []);

  useEffect(() => {

    const newMinAdvance = Math.round(totalPrice * 0.25);

    setAdvancePayment(newMinAdvance);

  }, [totalPrice]);
  const [formData, setFormData] = useState<BookingSubmission>({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: "",
  });

  const isBookingReady =
    serviceItems.length > 0 &&
    slot &&
    location &&
    formData.eventDate &&
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.message &&
    advancePayment >= minAdvance;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const formatDateLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiUrl =
    import.meta.env.VITE_BOOKING_API_URL ||
    "https://flower-yzko.onrender.com/api/bookings";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;

    const formatted = formatDateLocal(date);

    // 🔴 FULL DATE CHECK
    if (fullDates.includes(formatted)) {
      alert("❌ This date is fully booked");
      return; // stop selection
    }

    setSelectedDate(date);

    const nextDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    setFormData({ ...formData, eventDate: nextDate });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (serviceItems.length === 0) {
      alert("Please select service first");
      return;
    }

    if (!slot) {
      alert("Please select event slot");
      return;
    }

    if (!location) {
      alert("Please enter event location");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        services: serviceItems.map((s) => s.name).join(", "),
        designs: designItems.map((d) => d.name).join(", "),
        slot,
        location,
        offerPrice: Number(offer),
        servicePrice,
        designPrice,
        travelCharge,
        totalPrice,
      };

      const res = await axios.post(apiUrl, payload);

      const booking = res.data;

      if (booking.status === "auto_accepted") {
        alert("Offer accepted automatically!");
      }

      if (booking.status === "review") {
        alert("Your offer is under admin review.");
      }

      if (booking.status === "rejected") {
        alert("Offer rejected. Please increase your offer.");
      }

      alert("Booking submitted successfully");
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {

    if (totalPrice === 0) {
      alert("Please select service first");
      return;
    }

    const minAdvance = Math.round(totalPrice * 0.25);

    if (advancePayment < minAdvance) {
      alert(`Minimum advance should be ₹${minAdvance}`);
      return;
    }

    try {

      const res = await axios.post(
        "https://flower-yzko.onrender.com/payment/create-order",
        null,
        { params: { amount: advancePayment } }
      );

      const order = res.data;

      const options = {
        key: "rzp_live_Sa9aopvFX4kq82",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Shivam Flower Decoration",
        description: "Event Booking",

        // 👇 ADD THIS
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },

        // optional but useful
        notes: {
          service: serviceItems.map(s => s.name).join(", "),
          event_date: formData.eventDate,
          location: location
        },

        handler: async function () {

          document.body.style.overflow = "auto";
          document.body.style.position = "static";
          window.scrollTo(0, 0);
          setPaymentDone(true);

          const payload = {
            ...formData,
            services: serviceItems.map(s => s.name).join(", "),
            designs: designItems.map(d => d.name).join(", "),
            slot,
            location,
            servicePrice,
            designPrice,
            travelCharge,
            totalPrice,
            advanceAmount: advancePayment,
            remainingAmount: remainingPayment
          };

          try {

            const res = await axios.post(apiUrl, payload);

            const booking = res.data;

            // form reset
            setFormData({
              name: "",
              email: "",
              phone: "",
              eventDate: "",
              message: ""
            });

            setSlot("");
            setLocation("");
            setSelectedDate(null);

            // cart clear
            cart.forEach(item => removeFromCart(item.id));

            // redirect with booking data
            navigate("/booking-success", {
              state: {
                bookingId: booking.bookingId,
                eventDate: booking.eventDate,
                services: booking.services,
                designs: booking.designs,
                advanceAmount: booking.advanceAmount,
                remainingAmount: booking.remainingAmount
              }
            });

          } catch (error) {

            console.error(error);

            alert("Payment successful but booking save failed. Please contact support.");

          }

        },
        theme: {
          color: "#488aec",
        },
      };

      const rzp = new (window as any).Razorpay(options);

      // Payment Failed Handling
      rzp.on("payment.failed", function () {

        alert("❌ Payment Failed. Please try again.");

      });

      rzp.open();

    } catch (error) {

      console.error(error);

      alert("Unable to initiate payment. Please try again.");

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

            <h1 className="text-5xl font-playfair font-bold text-pink-400 mb-6">
              Book Your Event
            </h1>
            <p>Let's discuss your vision and create something beautiful together</p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-pink-400 font-medium mb-2">
                  Service
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/services?from=booking")}
                  className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white text-left hover:border-pink-500 transition"
                >
                  {serviceItems.length > 0
                    ? formatSummary(serviceItems.map((s) => s.name))
                    : "Choose Service"}
                </button>
              </div>

              <div>
                <label className="block text-pink-400 font-medium mb-2">
                  Design Upgrade
                </label>

                <button
                  type="button"
                  onClick={() => {
                    if (serviceItems.length === 0) {
                      alert("Select service first");
                      navigate("/services");
                      return;
                    }

                    navigate(
                      `/gallery?service=${serviceItems[0].service}&from=booking`,
                    );
                  }}
                  className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white text-left hover:border-pink-500 transition"
                >
                  {designSummary}
                </button>
              </div>

              {cart.length > 0 && (
                <div className="bg-black/20 border border-pink-900/30 rounded-xl p-5">
                  <h2 className="text-lg font-semibold text-pink-400 mb-4">
                    Selected Package
                  </h2>

                  <div className="space-y-3 text-gray-300">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[1fr_80px_120px] items-center"
                      >
                        {/* name */}
                        <span>{item.name}</span>

                        {/* price */}
                        <span className="text-pink-400 font-medium text-right">
                          ₹{item.price}
                        </span>

                        {/* buttons */}
                        <div className="flex gap-4 ml-2">
                          <button
                            type="button"
                            onClick={() => {

                              removeFromCart(item.id);

                              // agar service remove hui hai
                              if (item.type === "service") {

                                cart
                                  .filter(
                                    (i) =>
                                      i.type === "design" &&
                                      i.service === item.service   // sirf same service ka design
                                  )
                                  .forEach((design) => removeFromCart(design.id));

                              }

                            }}
                            className="text-red-400 text-sm hover:text-red-500"
                          >
                            remove
                          </button>

                          {item.type === "design" && (
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/gallery?service=${item.service}&from=booking`,
                                )
                              }
                              className="text-blue-400 text-sm hover:text-blue-500"
                            >
                              change
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-pink-900/30 pt-4 space-y-2 text-gray-300">
                    <div className="grid grid-cols-2">
                      <span>Service Price</span>
                      <span className="text-right">₹{servicePrice}</span>
                    </div>

                    <div className="grid grid-cols-2">
                      <span>Design Price</span>
                      <span className="text-right">₹{designPrice}</span>
                    </div>

                    <div className="grid grid-cols-2">
                      <span>Travel Charge</span>
                      <span className="text-right">₹{travelCharge}</span>
                    </div>

                    <div className="grid grid-cols-[1fr_auto] text-pink-400 font-semibold border-t border-pink-900/30 pt-2 gap-y-2">
                      <span>Total</span>
                      <span className="text-right">₹{totalPrice}</span>

                      {/* <span>Final Price</span>
                      <span className="text-right">₹{totalPrice}</span> */}

                      <span className="whitespace-nowrap flex items-center gap-1">
                        Advance Payment
                        <span className="text-xs text-white">(25%)</span>
                      </span>
                      <span className="text-right text-green-400 font-semibold">
                        ₹{advancePayment}
                      </span>
                      <span>Remaining Payment</span>
                      <span className="text-right">₹{remainingPayment}</span>
                    </div>
                  </div>
                </div>
              )}

              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-pink-900/30 rounded-lg text-white focus:border-pink-500 outline-none"
              >
                <option value="">Select Event Slot</option>
                <option value="morning">Morning 8-11</option>
                <option value="afternoon">Afternoon 12-3</option>
                <option value="evening">Evening 4-7</option>
                <option value="night">Night 8-11</option>
              </select>

              <input
                type="text"
                placeholder="Event Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white focus:border-pink-500 outline-none"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white focus:border-pink-500 outline-none"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white focus:border-pink-500 outline-none"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white focus:border-pink-500 outline-none"
                />

                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  minDate={new Date()}
                  required
                  placeholderText="Select event date"
                  className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white focus:border-pink-500 outline-none"

                  dayClassName={(date) => {
                    const formatted = formatDateLocal(date);

                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    // ❌ past dates
                    if (date < today) {
                      return "past-day";
                    }

                    // 🔴 full booked
                    if (fullDates.includes(formatted)) {
                      return "full-day";
                    }

                    // 🟢 available
                    return "available-day";
                  }}
                />
              </div>

              <textarea
                name="message"
                rows={5}
                placeholder="Share details about your event..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white focus:border-pink-500 outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={advancePayment}
                  onChange={(e) => {

                    const value = e.target.value;

                    if (!/^\d*$/.test(value)) return;

                    const num = value === "" ? 0 : Number(value);

                    if (num > totalPrice) return; // max limit

                    if (num < minAdvance && value !== "") return; // min limit

                    setAdvancePayment(num);

                  }}
                  className="px-4 py-3 bg-black/30 border border-pink-900/30 rounded-lg text-white"
                  inputMode="numeric"
                />

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={!isBookingReady || paymentDone}
                  className={`w-full px-6 py-4 rounded-lg font-medium ${isBookingReady
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-600 cursor-not-allowed"
                    }`}
                >
                  {paymentDone ? "Payment Completed" : `Pay ₹${advancePayment}`}
                </button>
                <p className="text-xs text-gray-400 mt-1">
                  Min ₹{minAdvance} • Max ₹{totalPrice}
                </p>

              </div>
              {!isBookingReady && (
                <p className="text-sm text-red-400 mt-2 text-center ">
                  Please fill all required fields before payment
                </p>
              )}
              {/* <button
                type="submit"
                disabled={!paymentDone || isSubmitting}
                className="w-full px-6 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg flex justify-center items-center space-x-2"
              >
                <span>Confirm Booking</span>
                <Send className="h-5 w-5" />
              </button> */}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
