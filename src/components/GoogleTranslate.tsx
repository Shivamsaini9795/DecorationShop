import React, { useEffect } from "react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const existing = document.getElementById("google-translate-script");

    const initGoogleTranslate = () => {
      if (
        window.google &&
        window.google.translate &&
        window.google.translate.TranslateElement
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi", // ✅ only English & Hindi
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };

    window.googleTranslateElementInit = initGoogleTranslate;

    if (!existing) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      initGoogleTranslate();
    }

    return () => {
      try {
        delete window.googleTranslateElementInit;
      } catch (e) {
        console.error("Cleanup error:", e);
      }
    };
  }, []);

  return (
    <div id="google_translate_wrapper" style={{ display: "inline-block" }}>
      <div id="google_translate_element" />
      <style>{`
        /* ===== Custom Styling for Navbar look ===== */

        #google_translate_wrapper {
          display: flex;
          align-items: center;
          height: 40px;
        }

        #google_translate_wrapper select {
          background-color: #0f0f0f;
          color: #f9f9f9;
          border: 1px solid #ff66b2;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 0.85rem;
          font-family: 'Inter', sans-serif;
          height: 36px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        #google_translate_wrapper select:hover {
          background-color: #1a1a1a;
          border-color: #ff85c1;
        }

        /* Remove Google branding text/logo */
        .goog-logo-link,
        .goog-te-gadget span,
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        .goog-te-gadget {
          color: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;
