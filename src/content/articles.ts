/**
 * Resource-article content, extracted from the reference DOM as a typed block
 * model (see scripts/extract-articles.mjs) and rendered by one shared layout.
 *
 * Class strings are captured per element rather than assumed: the reference
 * articles are not internally consistent (one uses mb-3 on card titles where the
 * others use mb-4; /service-areas uses an emerald heading variant), and assuming
 * a single style silently shifts those pages.
 *
 * Regenerate: node scripts/extract-articles.mjs && node scripts/generate-article-content.mjs
 */
export interface ListItem {
  lead: string | null;
  text: string;
}

export interface ArticleCard {
  title: string;
  titleClass: string;
  paragraphClass: string;
  listClass: string;
  paragraphs: string[];
  items: ListItem[];
}

export type Block =
  | { type: 'sectionStart'; className: string }
  | { type: 'sectionEnd' }
  | { type: 'heading'; text: string; className: string }
  | { type: 'paragraph'; text: string; className: string }
  | { type: 'list'; className: string; ordered: string; items: ListItem[] }
  | { type: 'cards'; containerClass: string; cardClass: string; cards: ArticleCard[] }
  | {
      type: 'imageGrid';
      cols: string;
      images: { src: string; alt: string; width: number; height: number }[];
    };

export interface Article {
  h1: string;
  blocks: Block[];
}

export const ARTICLES: Record<string, Article> = {
  "service-areas": {
    "h1": "Our Service Areas: Nationwide Coverage",
    "blocks": [
      {
        "type": "sectionStart",
        "className": "mb-16"
      },
      {
        "type": "heading",
        "text": "Your Local Buyer, Everywhere",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "paragraph",
        "text": "We have established a robust logistics network enabling us to serve workshops, scrap yards, and dealerships across India efficiently.",
        "className": "text-lg text-gray-600 leading-relaxed"
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "cards",
        "containerClass": "grid md:grid-cols-3 gap-6 mb-16",
        "cardClass": "bg-slate-50 p-6 rounded-3xl",
        "cards": [
          {
            "title": "North India",
            "titleClass": "text-xl font-bold mb-3 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "We are the leading Catalytic Converter Buyer in Delhi."
            ],
            "items": []
          },
          {
            "title": "West India",
            "titleClass": "text-xl font-bold mb-3 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "As a top Catalytic Converter Buyer in Mumbai and Pune, we support the massive automotive hubs of Maharashtra."
            ],
            "items": []
          },
          {
            "title": "South India",
            "titleClass": "text-xl font-bold mb-3 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "From being a specialized Catalytic Converter Buyer in Karnataka (Bangalore) to our strong presence in Kerala and Chennai."
            ],
            "items": []
          }
        ]
      },
      {
        "type": "sectionStart",
        "className": "mb-16 bg-emerald-50 p-8 rounded-3xl"
      },
      {
        "type": "heading",
        "text": "The Remote Seller Assist Program",
        "className": "text-2xl font-semibold mb-6 text-emerald-900"
      },
      {
        "type": "paragraph",
        "text": "Not near a major hub? Our Remote Seller program utilizes verified courier partners. You send pictures, we provide an initial quote, and we handle the shipping logistics securely.",
        "className": "text-lg text-emerald-800 leading-relaxed"
      },
      {
        "type": "sectionEnd"
      }
    ]
  },
  "automotive-catalytic-converter": {
    "h1": "The Automotive Catalytic Converter",
    "blocks": [
      {
        "type": "sectionStart",
        "className": "mb-16"
      },
      {
        "type": "heading",
        "text": "The Engineering Behind the Exhaust",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "paragraph",
        "text": "A catalytic converter is an exhaust emission control device that reduces toxic gases and pollutants in exhaust gas from an internal combustion engine into less-toxic pollutants by catalyzing a redox reaction.",
        "className": "text-lg text-gray-600 leading-relaxed mb-4"
      },
      {
        "type": "paragraph",
        "text": "They convert harmful Carbon Monoxide (CO), Nitrogen Oxides (NOx), and Hydrocarbons into less harmful Carbon Dioxide (CO₂), Nitrogen (N₂), and Water (H₂O). For more information refer Wikipedia https://en.wikipedia.org/wiki/Catalytic_converter",
        "className": "text-lg text-gray-600 leading-relaxed"
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "sectionStart",
        "className": "mb-16 bg-slate-50 p-8 rounded-3xl"
      },
      {
        "type": "heading",
        "text": "Why Are They So Valuable?",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "list",
        "className": "space-y-4 text-lg text-gray-600",
        "ordered": "check",
        "items": [
          {
            "lead": "Platinum (Pt):",
            "text": "Acts as an oxidation catalyst, highly durable under extreme heat."
          },
          {
            "lead": "Palladium (Pd):",
            "text": "Also an oxidation catalyst, particularly effective for gasoline engines."
          },
          {
            "lead": "Rhodium (Rh):",
            "text": "A reduction catalyst crucial for tackling NOx emissions."
          }
        ]
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "sectionStart",
        "className": "mb-16"
      },
      {
        "type": "heading",
        "text": "The Indian Market Shift (BS4 to BS6)",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "paragraph",
        "text": "The transition from Bharat Stage IV (BS4) to Bharat Stage VI (BS6) emission norms brought a paradigm shift in Indian automotive engineering. BS6 standards mandated significantly stricter emission limits, necessitating more advanced catalytic converters with higher loadings of Platinum Group Metals (PGMs) to achieve the required catalytic efficiency, thus increasing the inherent recycling value of modern end-of-life converters.",
        "className": "text-lg text-gray-600 leading-relaxed"
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "imageGrid",
        "cols": "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        "images": [
          {
            "src": "/images/catalytic-converter-with-part-number-and-serial.webp",
            "alt": "Catalytic converter with part number and serial marking",
            "width": 1280,
            "height": 960
          },
          {
            "src": "/images/catalytic-converter-showing-metallic-finish.webp",
            "alt": "Catalytic converter showing metallic finish",
            "width": 800,
            "height": 495
          },
          {
            "src": "/images/multiple-catalytic-converters-mounted-on-manifold.webp",
            "alt": "Multiple catalytic converters mounted on manifold",
            "width": 1200,
            "height": 800
          },
          {
            "src": "/images/catalytic-converter-in-industrial-facility.webp",
            "alt": "Catalytic converter in industrial facility",
            "width": 1376,
            "height": 768
          }
        ]
      }
    ]
  },
  "ceramic-monolith": {
    "h1": "Ceramic Monolith & Recovery",
    "blocks": [
      {
        "type": "sectionStart",
        "className": "mb-16"
      },
      {
        "type": "heading",
        "text": "Understanding Cordierite Honeycombs",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "paragraph",
        "text": "At the core of most catalytic converters lies a ceramic monolith, typically extruded from cordierite. Its intricate honeycomb structure provides an immense surface area while maintaining low thermal expansion, essential for surviving extreme exhaust temperatures and rapid heating cycles.",
        "className": "text-lg text-gray-600 leading-relaxed"
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "sectionStart",
        "className": "mb-16 bg-slate-50 p-8 rounded-3xl"
      },
      {
        "type": "heading",
        "text": "The Role of the Washcoat",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "list",
        "className": "space-y-4 text-lg text-gray-600",
        "ordered": "check",
        "items": [
          {
            "lead": "Surface Area:",
            "text": "The washcoat (often Al₂O₃) drastically increases the active surface area for reactions."
          },
          {
            "lead": "Cell Density:",
            "text": "Measured in Cells Per Square Inch (CPSI), higher density means more PGM contact but higher backpressure."
          },
          {
            "lead": "PGM Suspension:",
            "text": "It acts as a carrier, suspending the micro-particles of Pt, Pd, and Rh evenly across the channels."
          }
        ]
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "sectionStart",
        "className": "mb-16"
      },
      {
        "type": "heading",
        "text": "Recovery Challenges",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "paragraph",
        "text": "Extracting PGMs from the ceramic monolith is a complex metallurgical process. It requires careful de-canning to avoid ceramic dust loss, precise milling to homogenize the material, and advanced smelting techniques. The challenge lies in separating parts-per-million concentrations of precious metals from the bulk ceramic slag efficiently and sustainably.",
        "className": "text-lg text-gray-600 leading-relaxed"
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "imageGrid",
        "cols": "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        "images": [
          {
            "src": "/images/ceramic-monolith-honeycomb-structure-close-up.webp",
            "alt": "Ceramic monolith honeycomb structure close-up",
            "width": 1020,
            "height": 576
          },
          {
            "src": "/images/catalytic-converter-with-ceramic-monolith-and-recovered.webp",
            "alt": "Catalytic converter with ceramic monolith and recovered materials",
            "width": 1200,
            "height": 594
          },
          {
            "src": "/images/catalytic-converter-disassembly-showing-ceramic-components.webp",
            "alt": "Catalytic converter disassembly showing ceramic components",
            "width": 756,
            "height": 432
          },
          {
            "src": "/images/recovered-ceramic-monolith-pieces-in-recycling-process.webp",
            "alt": "Recovered ceramic monolith pieces in recycling process",
            "width": 1000,
            "height": 667
          }
        ]
      }
    ]
  },
  "oxygen-sensor": {
    "h1": "Oxygen (Lambda) Sensors",
    "blocks": [
      {
        "type": "sectionStart",
        "className": "mb-16"
      },
      {
        "type": "heading",
        "text": "How Sensors Work",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "paragraph",
        "text": "Oxygen or Lambda sensors monitor the unburned oxygen in the exhaust as it exits the engine. They generate a voltage signal based on the differential between exhaust oxygen and ambient oxygen. This relies on a solid-state electrolyte, typically made of Zirconium Dioxide (ZrO₂), coated with thin layers of porous Platinum.",
        "className": "text-lg text-gray-600 leading-relaxed"
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "sectionStart",
        "className": "mb-16 bg-slate-50 p-8 rounded-3xl"
      },
      {
        "type": "heading",
        "text": "Why Recycle Sensors?",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "list",
        "className": "space-y-4 text-lg text-gray-600",
        "ordered": "check",
        "items": [
          {
            "lead": "Platinum Recovery:",
            "text": "The electrodes and internal heating elements contain recoverable quantities of pure Platinum."
          },
          {
            "lead": "Zirconia Recovery:",
            "text": "The ZrO₂ ceramic thimble itself has industrial recycling value."
          },
          {
            "lead": "Copper & Wire Harnesses:",
            "text": "Associated wiring, stainless steel housings, and connectors contribute to the overall recycling yield."
          }
        ]
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "imageGrid",
        "cols": "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        "images": [
          {
            "src": "/images/collection-of-oxygen-sensors-showing-various-types.webp",
            "alt": "Collection of oxygen sensors showing various types",
            "width": 768,
            "height": 576
          },
          {
            "src": "/images/oxygen-sensor-with-wire-and-internal-components.jpg",
            "alt": "Oxygen sensor with wire and internal components on blue background",
            "width": 700,
            "height": 486
          },
          {
            "src": "/images/oxygen-sensor-installed-in-engine-with-blue.webp",
            "alt": "Oxygen sensor installed in engine with blue wire",
            "width": 1002,
            "height": 631
          },
          {
            "src": "/images/oxygen-sensor-held-in-hand-showing-wear.webp",
            "alt": "Oxygen sensor held in hand showing wear and deposits",
            "width": 819,
            "height": 541
          }
        ]
      }
    ]
  },
  "e-waste-management": {
    "h1": "E-Waste Management",
    "blocks": [
      {
        "type": "sectionStart",
        "className": "mb-16"
      },
      {
        "type": "heading",
        "text": "The Rise of Automotive Electronics",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "paragraph",
        "text": "Modern vehicles are essentially computers on wheels. Engine Control Units (ECUs), infotainment systems, ABS modules, and complex wiring harnesses represent a rapidly growing segment of automotive waste. Proper disposal is critical to prevent hazardous materials like Lead (Pb) from entering the environment.",
        "className": "text-lg text-gray-600 leading-relaxed"
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "sectionStart",
        "className": "mb-16 bg-slate-50 p-8 rounded-3xl"
      },
      {
        "type": "heading",
        "text": "Precious & Rare Earth Metal Recovery",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "list",
        "className": "space-y-4 text-lg text-gray-600",
        "ordered": "check",
        "items": [
          {
            "lead": "Circuit Board Gold:",
            "text": "Gold is used extensively in contact points and edge connectors for its excellent conductivity and corrosion resistance."
          },
          {
            "lead": "Tantalum & Silver:",
            "text": "Capacitors and solder junctions contain valuable Tantalum, Silver, and Palladium."
          },
          {
            "lead": "Environmental Responsibility:",
            "text": "Urban mining of E-waste reduces the carbon footprint compared to traditional hard-rock mining operations."
          }
        ]
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "imageGrid",
        "cols": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        "images": [
          {
            "src": "/images/collection-of-computer-ram-memory-modules.webp",
            "alt": "Collection of computer RAM memory modules",
            "width": 807,
            "height": 533
          },
          {
            "src": "/images/organized-ddr2-memory-modules-with-labels.webp",
            "alt": "Organized DDR2 memory modules with labels",
            "width": 1200,
            "height": 743
          },
          {
            "src": "/images/collection-of-computer-processors-and-chips.jpg",
            "alt": "Collection of computer processors and chips",
            "width": 1024,
            "height": 683
          },
          {
            "src": "/images/blue-bin-with-sorted-e-waste-materials.webp",
            "alt": "Blue bin with sorted e-waste materials",
            "width": 1600,
            "height": 1067
          }
        ]
      }
    ]
  },
  "converter-recycling-process": {
    "h1": "The Converter Recycling Process",
    "blocks": [
      {
        "type": "sectionStart",
        "className": "mb-16"
      },
      {
        "type": "heading",
        "text": "A Data-Driven Journey",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "paragraph",
        "text": "We employ a transparent, scientifically backed process to ensure maximum yield and fair valuation for every unit processed.",
        "className": "text-lg text-gray-600 leading-relaxed"
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "cards",
        "containerClass": "grid grid-cols-1 md:grid-cols-2 gap-8 mb-16",
        "cardClass": "bg-slate-50 p-8 rounded-3xl",
        "cards": [
          {
            "title": "Step 1: De-canning",
            "titleClass": "text-xl font-bold mb-4 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "The stainless steel shell is sheared open using specialized hydraulic guillotines, ensuring the inner ceramic honeycomb is extracted without dust loss. The steel itself is segregated for standard metal recycling."
            ],
            "items": []
          },
          {
            "title": "Step 2: Milling & Homogenization",
            "titleClass": "text-xl font-bold mb-4 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "The extracted ceramic is crushed and milled into a fine powder. Homogenization is the most critical step; blending the powder thoroughly ensures that a small sample accurately represents the entire batch's PGM content."
            ],
            "items": []
          },
          {
            "title": "Step 3: XRF & ICP Analysis",
            "titleClass": "text-xl font-bold mb-4 text-emerald-800",
            "paragraphClass": "",
            "listClass": "text-gray-600 space-y-2 list-disc list-inside",
            "paragraphs": [],
            "items": [
              {
                "lead": "XRF (X-ray Fluorescence):",
                "text": "Provides rapid, non-destructive bulk elemental analysis."
              },
              {
                "lead": "ICP (Inductively Coupled Plasma):",
                "text": "Used for high-precision, parts-per-million chemical assaying."
              }
            ]
          },
          {
            "title": "Step 4: Smelting & Refining",
            "titleClass": "text-xl font-bold mb-4 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "The assayed powder is shipped to specialized refineries. Using plasma arc furnaces at extreme temperatures, the PGMs are separated from the ceramic slag, purified, and returned to the global supply chain as sponge or ingots."
            ],
            "items": []
          }
        ]
      },
      {
        "type": "imageGrid",
        "cols": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        "images": [
          {
            "src": "/images/warehouse-storage-facility-with-catalytic-converters-on.webp",
            "alt": "Warehouse storage facility with catalytic converters on shelves",
            "width": 1344,
            "height": 768
          },
          {
            "src": "/images/industrial-recycling-facility-with-catalytic-converters-and.webp",
            "alt": "Industrial recycling facility with catalytic converters and processing equipment",
            "width": 1600,
            "height": 893
          },
          {
            "src": "/images/catalytic-converters-collected-in-industrial-facility.webp",
            "alt": "Catalytic converters collected in industrial facility",
            "width": 1600,
            "height": 893
          },
          {
            "src": "/images/recycling-and-storage-center-with-organized-catalytic.webp",
            "alt": "Recycling and storage center with organized catalytic converters",
            "width": 1600,
            "height": 893
          }
        ]
      }
    ]
  },
  "material-recovery-pgm-prices": {
    "h1": "Material Recovery & PGM Prices",
    "blocks": [
      {
        "type": "sectionStart",
        "className": "mb-16"
      },
      {
        "type": "heading",
        "text": "The Volatility of the Market",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "paragraph",
        "text": "Platinum Group Metals (PGMs) are traded globally, with prices dictated by mining outputs, automotive industry demand (especially shifting EV adoption rates), and geopolitical factors.",
        "className": "text-lg text-gray-600 leading-relaxed"
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "cards",
        "containerClass": "space-y-8 mb-16",
        "cardClass": "bg-slate-50 p-8 rounded-3xl",
        "cards": [
          {
            "title": "Rhodium Trends",
            "titleClass": "text-xl font-bold mb-4 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "Often dubbed \"Liquid Gold,\" Rhodium experiences intense price swings due to its rarity and indispensable role in NOx reduction. Small supply disruptions cause major market spikes."
            ],
            "items": []
          },
          {
            "title": "Platinum Surplus vs. Deficit",
            "titleClass": "text-xl font-bold mb-4 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "As we look toward 2026, the transition toward hydrogen fuel cells and industrial applications provides a strong floor for Platinum demand, despite fluctuations in traditional diesel vehicle production."
            ],
            "items": []
          },
          {
            "title": "Pricing Transparency",
            "titleClass": "text-xl font-bold mb-4 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "We utilize live market feeds and transparent Assay Reports. Valuations are based on the specific grams per ton (g/t) of each metal present in your batch, multiplied by the daily global spot price."
            ],
            "items": []
          }
        ]
      },
      {
        "type": "imageGrid",
        "cols": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        "images": [
          {
            "src": "/images/financial-market-data-and-pgm-price-trends.webp",
            "alt": "Financial market data and PGM price trends",
            "width": 1600,
            "height": 1067
          }
        ]
      }
    ]
  },
  "anti-theft-compliance": {
    "h1": "Anti-Theft & Law Compliance",
    "blocks": [
      {
        "type": "sectionStart",
        "className": "mb-16"
      },
      {
        "type": "heading",
        "text": "Combatting the Gray Market",
        "className": "text-2xl font-semibold mb-6 text-gray-800"
      },
      {
        "type": "paragraph",
        "text": "Catalit operates with a zero-tolerance policy towards stolen goods. We enforce a strict Know Your Customer (KYC) protocol to protect legitimate scrap dealers and workshops while deterring catalytic converter theft.",
        "className": "text-lg text-gray-600 leading-relaxed"
      },
      {
        "type": "sectionEnd"
      },
      {
        "type": "cards",
        "containerClass": "space-y-6 mb-16",
        "cardClass": "bg-slate-50 p-6 rounded-3xl border border-slate-100",
        "cards": [
          {
            "title": "ID Verification",
            "titleClass": "text-xl font-bold mb-3 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "All transactions require valid, Government-approved photographic identification (Aadhaar, PAN) tied to the seller."
            ],
            "items": []
          },
          {
            "title": "Business Documentation",
            "titleClass": "text-xl font-bold mb-3 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "Commercial sellers must provide valid GST registration and relevant local pollution control board authorizations where applicable."
            ],
            "items": []
          },
          {
            "title": "Digital Ledger",
            "titleClass": "text-xl font-bold mb-3 text-emerald-800",
            "paragraphClass": "text-gray-600",
            "listClass": "",
            "paragraphs": [
              "Every transaction is logged digitally, including serial numbers, vehicle origins (when available), and payout details, making the entire supply chain auditable by law enforcement authorities."
            ],
            "items": []
          }
        ]
      }
    ]
  }
};

export const ARTICLE_SLUGS = Object.keys(ARTICLES);
