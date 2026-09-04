/**
 * Homepage content, transcribed from the reference site's rendered DOM.
 * Image paths point at the locally stored copies in public/images.
 */
export interface ImageRef {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

export const HOME_FEATURES = [
  { title: "Since 2020", description: "We're in this business since 2020" },
  { title: "Coverage", description: "Active in Kerala, TN, Karnataka & beyond." },
  { title: "Top Payout", description: "Highest rates for all converter types." },
  { title: "#1 Ranked", description: "Leading the industry in precise XRF analysis and ethical recycling." },
] as const;

export interface BuyCategory {
  title: string;
  body: string;
  image: ImageRef & { alt: string };
}

export const WHAT_WE_BUY: BuyCategory[] = [
  {
    title: "Catalytic Converters",
    body:
      "We buy every make and model of automotive catalytic converter, from passenger cars to heavy-duty commercial vehicles. Whether it is a Ceramic, Metallic, or Pre-filter unit, our experts use a comprehensive database to identify the exact value based on its precious metal content (Platinum, Palladium, and Rhodium). We accept units in any condition—whole, cut, or rusted.",
    image: { src: "/images/catalytic-converter-recycling-at-catalit-facility.jpg", alt: "Catalytic converter recycling at Catalit facility", width: 1600, height: 900 },
  },
  {
    title: "Autocatalyst Ceramics",
    body:
      "We purchase loose ceramic monoliths (Converter powder) in all forms—whether they are whole bricks, broken pieces, or crushed dust. Since the value of ceramic scrap is based entirely on the concentration of precious metals, we use XRF Machine, precision weighing and transparent grading to ensure you receive the full market value. Don't let your loose ceramic go to waste we can help you to turn your ceramic into instant cash",
    image: { src: "/images/autocatalyst-ceramic-scrap-for-recycling.jpg", alt: "Autocatalyst ceramic scrap for recycling", width: 1600, height: 900 },
  },
  {
    title: "Oxygen Sensors",
    body:
      "We buy oxygen sensors and by the kilo, offering competitive payouts ranging from hundreds to thousands per kilogram depending on the brand and material condition. Our pricing is based on the high-value precious metals found within each unit, ensuring you receive the most accurate market rate for your scrap. Whether you have a small batch or bulk quantities, we provide professional grading and immediate payment for all automotive sensors and converters.",
    image: { src: "/images/oxygen-sensors-for-recycling-and-cash-conversion.webp", alt: "Oxygen sensors for recycling and cash conversion", width: 1024, height: 683 },
  },
  {
    title: "E-Waste",
    body:
      "Electronic waste contains valuable metals including gold, silver, copper, and palladium. We purchase various types of e-waste from computers, mobile phones, circuit boards, and industrial electronics. Our comprehensive e-waste buying program helps businesses and individuals responsibly recycle outdated electronics. Computer motherboards, processors, RAM modules, and hard drives all contain recoverable precious metals.",
    image: { src: "/images/e-waste-and-electronic-scrap-for-recycling.jpg", alt: "E-waste and electronic scrap for recycling", width: 1160, height: 600 },
  },
];

export interface SellStep {
  title: string;
  body: string;
}

export const SELL_STEPS: SellStep[] = [
  {
    title: "Snap & Send",
    body:
      "Simply take a photo of your catalytic converter, ceramics, or e-waste and send it to us via WhatsApp. Our expert team will provide you with an instant valuation based on current market rates for precious metals. No need to visit us - get your quote from the comfort of your location.",
  },
  {
    title: "Collection",
    body:
      "We have 6 dedicated collection teams strategically positioned across South India covering Kerala, Tamil Nadu, Karnataka, Andhra Pradesh, and Telangana. Once you accept our offer, schedule a pickup at your convenience. Our teams reach even remote locations to collect your materials safely and professionally.",
  },
  {
    title: "Instant Cashout",
    body:
      "Choose your preferred payment method - instant cash on collection or immediate bank transfer. No waiting periods or delayed payments. We believe in transparent, instant transactions. The moment our team verifies your materials, you receive your full payment on the spot with complete documentation.",
  },
  {
    title: "Done!",
    body:
      "You're now part of our priority network! Enjoy exclusive benefits including first access to premium pricing updates, priority collection scheduling, and special rates for bulk quantities. Build a long-term partnership with South India's most trusted buyer and maximize your earnings on every transaction.",
  },
];

export interface ResourceCard {
  title: string;
  description: string;
  href: string;
  image: ImageRef;
}

export const RESOURCE_CARDS: ResourceCard[] = [
  {
    title: "The Automotive Catalytic Converter",
    description: "Essential emission control devices containing valuable Platinum Group Metals.",
    href: "/resource-center/automotive-catalytic-converter",
    image: { src: "/images/card-the-automotive-catalytic-converter.png", width: 1376, height: 768 },
  },
  {
    title: "Ceramic Monolith & Recovery",
    description: "High-grade ceramic cordierite cores containing concentrated precious metal deposits.",
    href: "/resource-center/ceramic-monolith",
    image: { src: "/images/card-ceramic-monolith-recovery.png", width: 756, height: 432 },
  },
  {
    title: "Oxygen (Lambda) Sensors",
    description: "Precision sensors utilizing Platinum electrodes to monitor engine air-fuel ratios.",
    href: "/resource-center/oxygen-sensor",
    image: { src: "/images/card-oxygen-lambda-sensors.png", width: 819, height: 541 },
  },
  {
    title: "E-Waste Management",
    description: "Closing the loop on rare earth metals from automotive ECUs, sensors, and circuitry.",
    href: "/resource-center/e-waste-management",
    image: { src: "/images/card-e-waste-management.jpg", width: 1024, height: 683 },
  },
  {
    title: "The Converter Recycling Process",
    description: "A transparent, 4-step data-driven journey from collection to high-purity refining.",
    href: "/resource-center/converter-recycling-process",
    image: { src: "/images/card-the-converter-recycling-process.jpg", width: 1600, height: 893 },
  },
  {
    title: "Material Recovery & PGM Prices",
    description: "Real-time insights into the global economics of Platinum, Palladium, and Rhodium.",
    href: "/resource-center/material-recovery-pgm-prices",
    image: { src: "/images/card-material-recovery-pgm-prices.jpg", width: 1600, height: 1067 },
  },
  {
    title: "Anti-Theft & Law Compliance",
    description: "Setting the gold standard for ethics and legal transparency in the Indian recycling sector.",
    href: "/resource-center/anti-theft-compliance",
    image: { src: "/images/card-anti-theft-law-compliance.jpg", width: 1600, height: 901 },
  },
  {
    title: "Our Service Areas: Nationwide Coverage",
    description: "Connecting sellers from Delhi to Chennai through a trusted procurement network.",
    href: "/resource-center/service-areas",
    image: { src: "/images/card-our-service-areas-nationwide-coverage.jpg", width: 1600, height: 1067 },
  },
];
