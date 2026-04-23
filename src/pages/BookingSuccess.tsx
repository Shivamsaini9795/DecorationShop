import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

useEffect(() => {
  document.body.style.overflow = "auto";
  document.body.style.position = "static";
  window.scrollTo(0, 0);
}, []);

const BookingSuccess = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const data: any = location.state || {};

  // ⭐ Summary formatter
  const formatSummary = (text?: string) => {

    if (!text) return "-";

    const items = text
      .split(",")
      .map((item: string) => item.trim())
      .filter(Boolean);

    if (items.length === 0) return "-";

    if (items.length === 1) return items[0];

    return `${items[0]} +${items.length - 1} more`;
  };

  return (

    <div className="min-h-screen pt-16">

      <section className="py-20 px-4">

        <div className="max-w-3xl mx-auto text-center">

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-400" />
          </div>

          {/* Title */}
          <h1 className="text-5xl font-playfair font-bold text-pink-400 mb-4">
            Booking Confirmed
          </h1>

          <p className="text-gray-300 mb-10">
            Thank you for choosing{" "}
            <span className="text-pink-400 font-medium">
              Shivam Flower Decoration
            </span>.
          </p>

          {/* Booking Card */}
          <div className="bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-900/20 rounded-2xl p-8 text-left">

            <h2 className="text-lg font-semibold text-pink-400 mb-6">
              Booking Details
            </h2>

            <div className="space-y-4 text-gray-300">

              <div className="flex justify-between">
                <span>Booking ID</span>
                <span>{data.bookingId || "FD-XXXX"}</span>
              </div>

              <div className="flex justify-between">
                <span>Event Date</span>
                <span>{data.eventDate || "-"}</span>
              </div>

              <div className="flex justify-between">
                <span>Service</span>
                <span>{formatSummary(data.services)}</span>
              </div>

              {data.designs && (
                <div className="flex justify-between">
                  <span>Design</span>
                  <span>{formatSummary(data.designs)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Advance Paid</span>
                <span className="text-green-400 font-medium">
                  ₹{data.advanceAmount ?? 0}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Remaining Payment</span>
                <span>
                  ₹{data.remainingAmount ?? 0}
                </span>
              </div>

            </div>

          </div>

          {/* Email Confirmation */}
          <div className="mt-8 bg-green-900/20 border border-green-500/30 rounded-xl p-4 text-sm text-gray-300">
            📧 A confirmation email with your booking invoice has been sent to
            your registered email address.
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-10">

            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition"
            >
              Go to Home
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 border border-pink-900/40 hover:border-pink-500 rounded-lg transition"
            >
              Contact Support
            </button>

          </div>

        </div>

      </section>

    </div>

  );

};

export default BookingSuccess;