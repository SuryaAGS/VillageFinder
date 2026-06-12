// Translations of common inventory item names. Falls back to the raw English
// (or original) name when no translation exists. Matching is case-insensitive
// and tolerates extra punctuation/parenthetical suffixes.
import type { Lang } from "./i18n";

const map: Record<string, Partial<Record<Lang, string>>> = {
  // Grains & flour
  "Sona Masuri Rice": { te: "సోనా మసూరి బియ్యం", hi: "सोना मसूरी चावल" },
  "Basmati Rice": { te: "బాస్మతి బియ్యం", hi: "बासमती चावल" },
  Rice: { te: "బియ్యం", hi: "चावल" },
  "Wheat Flour (Atta)": { te: "గోధుమ పిండి (అట్టా)", hi: "गेहूं का आटा" },
  "Wheat Flour": { te: "గోధుమ పిండి", hi: "गेहूं का आटा" },
  Atta: { te: "అట్టా", hi: "आटा" },
  "Atta Flour": { te: "గోధుమ పిండి", hi: "आटा" },
  Maida: { te: "మైదా", hi: "मैदा" },

  // Pulses
  "Toor Dal": { te: "కందిపప్పు", hi: "तूर दाल" },
  "Moong Dal": { te: "పెసరపప్పు", hi: "मूंग दाल" },
  "Chana Dal": { te: "శనగపప్పు", hi: "चना दाल" },
  "Urad Dal": { te: "మినపపప్పు", hi: "उड़द दाल" },

  // Sugar & salt
  Sugar: { te: "చక్కెర", hi: "चीनी" },
  "Refined Sugar": { te: "చక్కెర", hi: "चीनी" },
  "Jaggery (Gur)": { te: "బెల్లం", hi: "गुड़" },
  Jaggery: { te: "బెల్లం", hi: "गुड़" },
  Salt: { te: "ఉప్పు", hi: "नमक" },
  "Iodized Salt": { te: "అయోడిన్ ఉప్పు", hi: "आयोडीन नमक" },
  "Crystal Salt": { te: "ఉప్పు రాళ్లు", hi: "सेंधा नमक" },

  // Oils
  "Sunflower Oil": { te: "పొద్దుతిరుగుడు నూనె", hi: "सूरजमुखी तेल" },
  "Groundnut Oil": { te: "వేరుశనగ నూనె", hi: "मूंगफली तेल" },
  "Mustard Oil": { te: "ఆవ నూనె", hi: "सरसों तेल" },
  "Coconut Oil": { te: "కొబ్బరి నూనె", hi: "नारियल तेल" },
  Ghee: { te: "నెయ్యి", hi: "घी" },

  // Spices
  "Turmeric Powder": { te: "పసుపు పొడి", hi: "हल्दी पाउडर" },
  "Red Chili Powder": { te: "ఎర్ర మిరప పొడి", hi: "लाल मिर्च पाउडर" },
  "Coriander Powder (Dhania)": { te: "ధనియాల పొడి", hi: "धनिया पाउडर" },
  "Coriander Powder": { te: "ధనియాల పొడి", hi: "धनिया पाउडर" },
  "Cumin Seeds (Jeera)": { te: "జీలకర్ర", hi: "जीरा" },
  "Cumin Seeds": { te: "జీలకర్ర", hi: "जीरा" },
  "Mustard Seeds (Ava)": { te: "ఆవాలు", hi: "सरसों" },
  "Mustard Seeds": { te: "ఆవాలు", hi: "सरसों" },
  Cloves: { te: "లవంగాలు", hi: "लौंग" },
  Cardamom: { te: "ఏలకులు", hi: "इलायची" },
  "Garam Masala": { te: "గరం మసాలా", hi: "गरम मसाला" },
  "Chicken / Meat Masala": { te: "చికెన్ మసాలా", hi: "चिकन मसाला" },
  "Sambar Powder": { te: "సాంబార్ పొడి", hi: "सांभर पाउडर" },

  // Beverages
  "Tea Powder": { te: "టీ పొడి", hi: "चाय पत्ती" },
  "Instant Coffee": { te: "ఇన్‌స్టంట్ కాఫీ", hi: "इंस्टैंट कॉफी" },
  "Filter Coffee": { te: "ఫిల్టర్ కాఫీ", hi: "फिल्टर कॉफी" },
  Horlicks: { te: "హార్లిక్స్", hi: "हॉर्लिक्स" },
  Bournvita: { te: "బోర్న్‌వీటా", hi: "बॉर्नविटा" },
  Boost: { te: "బూస్ట్", hi: "बूस्ट" },

  // Breakfast
  "Poha (Flattened Rice)": { te: "అటుకులు", hi: "पोहा" },
  Poha: { te: "అటుకులు", hi: "पोहा" },
  "Vermicelli (Semiya)": { te: "సేమ్యా", hi: "सेवई" },
  Vermicelli: { te: "సేమ్యా", hi: "सेवई" },
  Oats: { te: "ఓట్స్", hi: "ओट्स" },

  // Biscuits
  "Marie Gold Biscuits": { te: "మేరీ గోల్డ్ బిస్కెట్లు", hi: "मैरी गोल्ड बिस्किट" },
  "Parle-G Biscuits": { te: "పార్లే-జీ బిస్కెట్లు", hi: "पारले-जी बिस्किट" },
  "Parle-G Biscuit": { te: "పార్లే-జీ బిస్కెట్", hi: "पारले-जी बिस्किट" },
  "Good Day Biscuits": { te: "గుడ్ డే బిస్కెట్లు", hi: "गुड डे बिस्किट" },
  "Bourbon Biscuits": { te: "బోర్బన్ బిస్కెట్లు", hi: "बॉर्बन बिस्किट" },

  // Namkeen
  Mixture: { te: "మిక్చర్", hi: "मिक्सचर" },
  "Aloo Bhujia": { te: "ఆలూ భుజియా", hi: "आलू भुजिया" },
  "Fried Peanuts": { te: "వేయించిన పల్లీలు", hi: "तले हुए मूंगफली" },

  // Instant
  "Maggi Noodles": { te: "మ్యాగీ నూడుల్స్", hi: "मैगी नूडल्स" },
  Pasta: { te: "పాస్తా", hi: "पास्ता" },
  Rusks: { te: "రస్క్", hi: "रस्क" },

  // Soaps / detergents
  "Lifebuoy Soap": { te: "లైఫ్‌బాయ్ సబ్బు", hi: "लाइफबॉय साबुन" },
  "Santoor Soap": { te: "శాంటూర్ సబ్బు", hi: "संतूर साबुन" },
  Soap: { te: "సబ్బు", hi: "साबुन" },
  "Rin Detergent Bar": { te: "రిన్ డిటర్జెంట్", hi: "रिन डिटर्जेंट" },
  "Wheel Detergent Bar": { te: "వీల్ డిటర్జెంట్", hi: "व्हील डिटर्जेंट" },

  // Hair & dental
  "Clinic Plus Shampoo": { te: "క్లినిక్ ప్లస్ షాంపూ", hi: "क्लिनिक प्लस शैम्पू" },
  "Sunsilk Shampoo": { te: "సన్‌సిల్క్ షాంపూ", hi: "सनसिल्क शैम्पू" },
  "Colgate Toothpaste": { te: "కోల్గేట్ టూత్‌పేస్ట్", hi: "कोलगेट टूथपेस्ट" },
  "Pepsodent Toothpaste": { te: "పెప్సోడెంట్ టూత్‌పేస్ట్", hi: "पेप्सोडेंट टूथपेस्ट" },
  Toothbrush: { te: "టూత్‌బ్రష్", hi: "टूथब्रश" },
  Medimix: { te: "మెడిమిక్స్", hi: "मेडिमिक्स" },

  // Home
  "Vim Dishwash Bar": { te: "విమ్ డిష్‌వాష్", hi: "विम डिशवॉश" },
  "Floor Cleaner": { te: "ఫ్లోర్ క్లీనర్", hi: "फ्लोर क्लीनर" },
  "Agarbatti (Incense Sticks)": { te: "అగరబత్తి", hi: "अगरबत्ती" },
  Agarbatti: { te: "అగరబత్తి", hi: "अगरबत्ती" },

  // Vegetables
  Tomato: { te: "టమాట", hi: "टमाटर" },
  Onion: { te: "ఉల్లిపాయ", hi: "प्याज" },
  Potato: { te: "బంగాళదుంప", hi: "आलू" },
  "Green Chilli": { te: "పచ్చిమిర్చి", hi: "हरी मिर्च" },
  Coriander: { te: "కొత్తిమీర", hi: "धनिया" },
  "Curry Leaves": { te: "కరివేపాకు", hi: "करी पत्ता" },

  // Dairy
  "Fresh Milk (Packet)": { te: "ప్యాకెట్ పాలు", hi: "पैकेट दूध" },
  "Cow Milk": { te: "ఆవు పాలు", hi: "गाय का दूध" },
  Milk: { te: "పాలు", hi: "दूध" },
  "Buffalo Milk": { te: "గేదె పాలు", hi: "भैंस का दूध" },
  Curd: { te: "పెరుగు", hi: "दही" },
  "Curd (Dahi)": { te: "పెరుగు", hi: "दही" },
  Paneer: { te: "పనీర్", hi: "पनीर" },
  "Eggs (Tray of 6)": { te: "గుడ్లు (6 ట్రే)", hi: "अंडे (6 की ट्रे)" },
  "Eggs (Tray of 12)": { te: "గుడ్లు (12 ట్రే)", hi: "अंडे (12 की ट्रे)" },
  Eggs: { te: "గుడ్లు", hi: "अंडे" },

  // Medical
  "Paracetamol 500": { te: "పారాసిటమాల్ 500", hi: "पैरासिटामोल 500" },
  Paracetamol: { te: "పారాసిటమాల్", hi: "पैरासिटामोल" },
  "ORS Sachet": { te: "ORS సాచెట్", hi: "ORS पाउच" },
  "Dettol Antiseptic": { te: "డెట్టోల్", hi: "डेटॉल" },
  "Bandage Roll": { te: "బ్యాండేజ్", hi: "पट्टी" },
  "Sanitary Pads": { te: "శానిటరీ ప్యాడ్స్", hi: "सैनिटरी पैड्स" },
};

// Build a case-insensitive lookup once.
const lowerMap = new Map<string, Partial<Record<Lang, string>>>();
for (const [k, v] of Object.entries(map)) {
  lowerMap.set(k.toLowerCase().trim(), v);
}

function stripParens(s: string): string {
  return s.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}

export function localizeItem(name: string, lang: Lang): string {
  if (lang === "en") return name;
  if (!name) return name;
  const key = name.toLowerCase().trim();
  const hit = lowerMap.get(key) ?? lowerMap.get(stripParens(key));
  return hit?.[lang] ?? name;
}

// Map BCP-47 lang code for the Web Speech API.
export function speechLangCode(lang: Lang): string {
  switch (lang) {
    case "te":
      return "te-IN";
    case "hi":
      return "hi-IN";
    default:
      return "en-IN";
  }
}
