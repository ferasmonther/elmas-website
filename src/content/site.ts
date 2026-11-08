export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  buyers: string[];
  applications: string[];
  note: string;
  image: ImageKey;
  seoDescription: string;
  inquiryDetails: string[];
  faq: { question: string; answer: string }[];
  specifications: { label: string; value: string | null }[];
};
export const products: Product[] = [
  {
    slug: 'bsfl-protein',
    name: 'BSFL Protein',
    category: 'Insect protein',
    summary: 'Larvae-based protein for feed formulation and animal nutrition discussions.',
    description:
      'Black Soldier Fly larvae turn suitable organic resources into insect biomass. Elma’s develops larvae-based protein products for potential inclusion in formulated animal feeds. Harvesting and processing depend on the intended product and application; contact us to discuss current availability and specifications.',
    buyers: ['Feed manufacturers', 'Poultry businesses', 'Aquaculture and livestock businesses'],
    applications: [
      'Explore insect-derived ingredients for feed formulation.',
      'Discuss suitability with your nutritionist and our team.',
      'Request current formats, availability and technical documentation.',
    ],
    note: 'Suitability depends on the species, formulation and applicable requirements. No universal inclusion rate or performance outcome is implied.',
    image: 'larvae',
    seoDescription:
      'Explore Black Soldier Fly larvae protein from Elma’s in Lebanon for feed formulation. Ask about current formats, suitability, availability and specifications.',
    inquiryDetails: [
      'Animal species, production stage and intended feed application',
      'Required quantity, preferred format and order frequency',
      'Delivery location and any technical documentation you need',
    ],
    faq: [
      {
        question: 'Can BSFL protein be used in any animal feed?',
        answer:
          'Suitability depends on the animal species, processing, formulation and applicable requirements. Discuss the intended application with a qualified nutritionist and request current specifications before use.',
      },
      {
        question: 'What product formats and quantities are available?',
        answer:
          'Contact Elma’s to confirm current formats, packaging, quantities and supply timing. These details are quoted for your requirements rather than assumed from a photograph.',
      },
    ],
    specifications: [
      { label: 'Product format', value: null },
      { label: 'Protein content', value: null },
      { label: 'Packaging', value: null },
    ],
  },
  {
    slug: 'bsfl-frass',
    name: 'BSFL Frass',
    category: 'Organic soil input',
    summary: 'A BSFL production byproduct for agricultural soil management.',
    description:
      'Frass is a byproduct of Black Soldier Fly larvae production. It can include insect excreta, shed material and residual substrate. It is a distinct agricultural soil input, with properties that depend on the production and treatment process.',
    buyers: ['Crop farmers', 'Greenhouses and nurseries', 'Agricultural distributors'],
    applications: [
      'Discuss use within an existing soil management plan.',
      'Explore applications for cultivated land and horticulture.',
      'Request verified composition and application guidance before use.',
    ],
    note: 'Composition, treatment, application rates and suitability must be confirmed for your crop and soil. Frass and vermicompost are different products.',
    image: 'application',
    seoDescription:
      'Discuss BSFL frass from Elma’s in Lebanon for agricultural soil management. Request verified composition, treatment details and application guidance.',
    inquiryDetails: [
      'Crop, growing environment and soil information if available',
      'Area to be treated and approximate quantity required',
      'Delivery location, timing and any analysis or treatment documentation needed',
    ],
    faq: [
      {
        question: 'Is frass the same as vermicompost?',
        answer:
          'No. Frass is a byproduct of Black Soldier Fly larvae production; vermicompost is produced through earthworm and microbial activity. Their properties depend on their respective inputs and processes.',
      },
      {
        question: 'How much frass should I apply?',
        answer:
          'A suitable rate depends on verified product composition, treatment, soil conditions and the crop. Request current documentation and discuss your soil management plan before applying it.',
      },
    ],
    specifications: [
      { label: 'NPK analysis', value: null },
      { label: 'Organic matter', value: null },
      { label: 'Treatment and packaging', value: null },
    ],
  },
  {
    slug: 'vermicompost',
    name: 'Vermicompost',
    category: 'Organic soil amendment',
    summary: 'An earthworm-processed organic amendment for horticulture and soil management.',
    description:
      'Vermicompost is an organic soil amendment produced through the activity of earthworms and microorganisms. It is distinct from BSFL frass and may be considered as part of a wider horticultural or soil management programme.',
    buyers: ['Nurseries and greenhouses', 'Crop farmers', 'Landscaping operators'],
    applications: [
      'Explore incorporation into horticultural soil management.',
      'Discuss nursery, greenhouse and landscape needs.',
      'Request current availability and guidance for your intended use.',
    ],
    note: 'Composition and dosage are not published until verified. Choose application practices based on your soil, crop and professional advice.',
    image: 'field',
    seoDescription:
      'Explore vermicompost from Elma’s in Lebanon for nurseries, greenhouses and soil management. Ask about suitability, availability and verified specifications.',
    inquiryDetails: [
      'Plants or crops, growing media and intended use',
      'Approximate quantity, growing area and preferred supply timing',
      'Delivery location and any composition or application questions',
    ],
    faq: [
      {
        question: 'Where might vermicompost be used?',
        answer:
          'Vermicompost may be considered within nursery, greenhouse, landscaping and crop soil management. Suitability depends on the product, existing growing media and plant requirements.',
      },
      {
        question: 'Are composition and application rates available?',
        answer:
          'Ask Elma’s for current product information and guidance for your application. No fixed composition, dosage or growing result is assumed across different soils or crops.',
      },
    ],
    specifications: [
      { label: 'Composition', value: null },
      { label: 'Application guidance', value: null },
      { label: 'Packaging', value: null },
    ],
  },
];
export const navigation = [
  { href: '/products', label: 'Our products' },
  { href: '/about', label: 'About Elma’s' },
  { href: '/sustainability', label: 'Our approach' },
  { href: '/contact', label: 'Contact' },
];
export const images = {
  larvae: {
    file: 'larvae.webp',
    alt: 'A gloved team member handling larvae in blue production trays',
    caption: 'Black Soldier Fly larvae production at Elma’s.',
    position: '55% 50%',
  },
  application: {
    file: 'application.webp',
    alt: 'Organic material being applied with a scoop among outdoor plants',
    caption: 'Field application of organic material; agricultural context.',
    position: '72% 50%',
  },
  field: {
    file: 'field.webp',
    alt: 'A hand holding a scoop of granular organic material above green plants',
    caption: 'Organic material handling outdoors; agricultural context.',
    position: '52% 50%',
  },
  facility: {
    file: 'facility.webp',
    alt: 'A team member tending larvae production trays inside the facility',
    caption: 'Black Soldier Fly larvae production at Elma’s.',
    position: '55% 50%',
  },
  breeding: {
    file: 'breeding.webp',
    alt: 'Adult flies on wooden slats inside a breeding enclosure',
    caption: 'Adult flies in the breeding environment at Elma’s.',
    position: '52% 50%',
  },
} as const;
export type ImageKey = keyof typeof images;
