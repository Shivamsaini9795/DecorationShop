import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const scriptId = "google-translate-script";

    const initGoogleTranslate = () => {
      if (
        window.google &&
        window.google.translate &&
        window.google.translate.TranslateElement
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    window.googleTranslateElementInit = initGoogleTranslate;

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      initGoogleTranslate();
    }
  }, []);

  const changeLanguage = (language: string) => {
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;

    if (select) {
      select.value = language;
      select.dispatchEvent(new Event("change"));
    }

    setLang(language);
  };

  return (
    <div className="flex items-center">
      {/* Hidden Google Translate */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* 🔥 Premium Compact Toggle */}
      <button
        onClick={() => changeLanguage(lang === "en" ? "hi" : "en")}
        className=" notranslate flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full border border-pink-500 text-pink-400 hover:bg-pink-500/20 transition-all"
      >
        {/* ⇄ Arrow Icon */}
        <span className="text-[11px]">⇄</span>

        {/* Language */}
        <span>{lang === "en" ? "EN" : "HI"}</span>
      </button>
    </div>
  );
};

export default GoogleTranslate;