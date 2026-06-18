// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-red-50 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 max-w-xl w-full border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-700 dark:text-yellow-300">
          📞 Contact Us
        </h2>

        <div className="space-y-4 text-gray-800 dark:text-gray-200 text-center text-sm sm:text-base">
          <p>
            📧 Email:{" "}
            <a
              href="mailto:support@radhakrishnapath.in"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              support@brajpandit.in
            </a>
          </p>

          <p>
            📱 Phone:{" "}
            <a
              href="tel:+911234567890"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              +91 12345 67890
            </a>
          </p>

          {/* Optional Address or Help Section */}
          <p className="text-gray-500 dark:text-gray-400 mt-6 text-xs italic">
            For assistance with bookings or product orders, feel free to reach out to us anytime between 9:00 AM – 8:00 PM.
          </p>
        </div>
      </div>
    </div>
  );
}
