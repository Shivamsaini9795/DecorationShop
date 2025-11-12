// import React, { useState } from "react";
// import axios from "axios";

// const BodyTranslator: React.FC = () => {
//   const [language, setLanguage] = useState<"en" | "hi">("en");
//   const [loading, setLoading] = useState<boolean>(false);

//   // 🔹 Helper function: Translate visible text nodes
//   const translateTextNodes = async (source: "en" | "hi", target: "en" | "hi") => {
//     const walker = document.createTreeWalker(
//       document.body,
//       NodeFilter.SHOW_TEXT,
//       {
//         acceptNode: (node) => {
//           if (
//             node.textContent &&
//             node.textContent.trim().length > 0 &&
//             node.textContent.trim().length < 200 // skip huge text blocks
//           ) {
//             return NodeFilter.FILTER_ACCEPT;
//           }
//           return NodeFilter.FILTER_REJECT;
//         },
//       }
//     );

//     const textNodes: Text[] = [];
//     let node;
//     while ((node = walker.nextNode() as Text | null)) {
//       textNodes.push(node);
//     }

//     // Collect all text content
//     const texts = textNodes.map((n) => n.textContent || "");

//     if (texts.length === 0) return;

//     try {
//       setLoading(true);

//       // 🌍 Translate via API
//       const res = await axios.post("https://libretranslate.com/translate", {
//         q: texts.join("\n###\n"), // separator
//         source,
//         target,
//         format: "text",
//       });

//       const translated = (res.data.translatedText as string).split("\n###\n");

//       // Replace text nodes
//       translated.forEach((t, i) => {
//         textNodes[i].textContent = t;
//       });
//     } catch (err) {
//       console.error("Translation failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔸 Main toggle function
//   const handleTranslate = async () => {
//     const newLang = language === "en" ? "hi" : "en";
//     await translateTextNodes(language, newLang);
//     setLanguage(newLang);
//   };

//   return (
//     <button
//       onClick={handleTranslate}
//       disabled={loading}
//       className="fixed top-5 right-6 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-pink-600 transition-all"
//     >
//       {loading
//         ? "Translating..."
//         : language === "en"
//         ? "🇮🇳 Translate to Hindi"
//         : "🇬🇧 Translate to English"}
//     </button>
//   );
// };

// export default BodyTranslator;
