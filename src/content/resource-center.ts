/** /resource-center content, extracted from the reference DOM. */
export interface ResourceCenterCard {
  href: string;
  srLabel: string;
  image: string;
  title: string;
  description: string;
  cta: string;
}

export const RESOURCE_CENTER = {
  h1: "Resource Center",
  intro:
    "Explore in-depth knowledge about automotive recycling, precious metal recovery, and sustainable practices.",
};

export const RESOURCE_CENTER_CARDS: ResourceCenterCard[] = [
  {
    "href": "/resource-center/pgm-price-tracker",
    "srLabel": "View Live PGM Price Tracker",
    "image": "/images/financial-market-data-and-pgm-price-trends.jpg",
    "title": "Live PGM Price Tracker",
    "description": "Live current market price of Platinum, Palladium, and Rhodium",
    "cta": "View Tracker"
  },
  {
    "href": "/resource-center/automotive-catalytic-converter",
    "srLabel": "View The Automotive Catalytic Converter",
    "image": "/images/card-the-automotive-catalytic-converter.png",
    "title": "The Automotive Catalytic Converter",
    "description": "Essential emission control devices containing valuable Platinum Group Metals.",
    "cta": "Learn More"
  },
  {
    "href": "/resource-center/ceramic-monolith",
    "srLabel": "View Ceramic Monolith & Recovery",
    "image": "/images/card-ceramic-monolith-recovery.png",
    "title": "Ceramic Monolith & Recovery",
    "description": "High-grade ceramic cordierite cores containing concentrated precious metal deposits.",
    "cta": "Learn More"
  },
  {
    "href": "/resource-center/oxygen-sensor",
    "srLabel": "View Oxygen (Lambda) Sensors",
    "image": "/images/card-oxygen-lambda-sensors.png",
    "title": "Oxygen (Lambda) Sensors",
    "description": "Precision sensors utilizing Platinum electrodes to monitor engine air-fuel ratios.",
    "cta": "Learn More"
  },
  {
    "href": "/resource-center/e-waste-management",
    "srLabel": "View E-Waste Management",
    "image": "/images/card-e-waste-management.jpg",
    "title": "E-Waste Management",
    "description": "Closing the loop on rare earth metals from automotive ECUs, sensors, and circuitry.",
    "cta": "Learn More"
  },
  {
    "href": "/resource-center/converter-recycling-process",
    "srLabel": "View The Converter Recycling Process",
    "image": "/images/card-the-converter-recycling-process.jpg",
    "title": "The Converter Recycling Process",
    "description": "A transparent, 4-step data-driven journey from collection to high-purity refining.",
    "cta": "Learn More"
  },
  {
    "href": "/resource-center/material-recovery-pgm-prices",
    "srLabel": "View Material Recovery & PGM Prices",
    "image": "/images/card-material-recovery-pgm-prices.jpg",
    "title": "Material Recovery & PGM Prices",
    "description": "Real-time insights into the global economics of Platinum, Palladium, and Rhodium.",
    "cta": "Learn More"
  },
  {
    "href": "/resource-center/anti-theft-compliance",
    "srLabel": "View Anti-Theft & Law Compliance",
    "image": "/images/card-anti-theft-law-compliance.jpg",
    "title": "Anti-Theft & Law Compliance",
    "description": "Setting the gold standard for ethics and legal transparency in the Indian recycling sector.",
    "cta": "Learn More"
  },
  {
    "href": "/resource-center/service-areas",
    "srLabel": "View Our Service Areas: Nationwide Coverage",
    "image": "/images/card-our-service-areas-nationwide-coverage.jpg",
    "title": "Our Service Areas: Nationwide Coverage",
    "description": "Connecting sellers from Delhi to Chennai through a trusted procurement network.",
    "cta": "Learn More"
  },
  {
    "href": "/resource-center/knowledge-base",
    "srLabel": "View Common Industry Questions & Insights",
    "image": "/images/card-resource-center-hero.jpg",
    "title": "Common Industry Questions & Insights",
    "description": "Find clear answers to technical questions about catalytic recycling, valuation, and many more.",
    "cta": "Learn More"
  }
];
