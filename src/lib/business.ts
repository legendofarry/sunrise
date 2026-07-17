// Central business info. Update phone/whatsapp/coords to real values before launch.
export const BUSINESS = {
  name: "Sunrise Wines Ngumba Estate",
  short: "Sunrise Wines",
  tagline: "Your neighbourhood wine & spirits shop in Ngumba.",
  phoneDisplay: "+254 712 345 678",
  phoneRaw: "+254712345678",
  whatsappRaw: "254712345678",
  email: "hello@sunrisewines.co.ke",
  address: "Ngumba Estate, off Thika Road, Nairobi",
  neighbourhood: "Ngumba Estate, Nairobi",
  // Approx Ngumba Estate coords
  lat: -1.2385,
  lng: 36.8611,
  mapsQuery: "Ngumba+Estate,+Nairobi",
  hours: [
    { day: "Monday", hours: "9:00 AM – 11:00 PM" },
    { day: "Tuesday", hours: "9:00 AM – 11:00 PM" },
    { day: "Wednesday", hours: "9:00 AM – 11:00 PM" },
    { day: "Thursday", hours: "9:00 AM – 11:00 PM" },
    { day: "Friday", hours: "9:00 AM – 12:00 AM" },
    { day: "Saturday", hours: "9:00 AM – 12:00 AM" },
    { day: "Sunday", hours: "10:00 AM – 10:00 PM" },
  ],
} as const;

export const whatsappLink = (text = "Hi Sunrise Wines, I'd like to enquire about your stock.") =>
  `https://wa.me/${BUSINESS.whatsappRaw}?text=${encodeURIComponent(text)}`;

export const telLink = `tel:${BUSINESS.phoneRaw}`;