export type Pack = {
  id: string;
  weightKg: number;
  priceUsd: number;
  format?: 'Live';
  mockupViewBox: string;
};
export const deliveryNote =
  'Confirm delivery arrangements and any additional charges with Elma’s before committing to an order. Opening WhatsApp prepares an inquiry; it does not place or pay for an order.';
export function packLabel(product: Pick<Product, 'name'>, pack: Pack) {
  return `${pack.format ? pack.format + ' ' : ''}${product.name} — ${pack.weightKg} kg — US$${pack.priceUsd}`;
}
export function quoteHref(product: Product, pack?: Pack) {
  return `/request-quote?product=${product.slug}${pack ? `&pack=${pack.id}` : ''}`;
}
export type Product = {
  slug: string;
  name: string;
  category: string;
  primary?: boolean;
  packs: Pack[];
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
    name: 'BSFL Larvae',
    primary: true,
    packs: [
      {
        id: 'live-10kg',
        format: 'Live',
        weightKg: 10,
        priceUsd: 10,
        mockupViewBox: '1000 250 730 515',
      },
    ],
    category: 'Chicken & fish feed',
    summary: 'Live Black Soldier Fly larvae for chicken and fish feeding applications.',
    description:
      'Black Soldier Fly larvae are Elma’s primary product, produced in Lebanon for poultry and aquaculture feed applications. Our focus is on chicken farms, fish farms and feed manufacturers. Tell us about your animals, feeding approach and required quantities so we can discuss suitability and current specifications.',
    buyers: [
      'Chicken and poultry farms',
      'Fish farms and aquaculture businesses',
      'Feed manufacturers and distributors',
    ],
    applications: [
      'Discuss BSFL larvae for chicken and poultry feeding.',
      'Explore fish feeding and aquaculture feed applications.',
      'Confirm the feeding approach with your nutritionist and our team.',
    ],
    note: 'Larvae are not a complete feed. Suitability depends on the species, life stage, overall diet and applicable requirements. No universal inclusion rate or performance outcome is implied.',
    image: 'larvae',
    seoDescription:
      'Black Soldier Fly larvae from Elma’s in Lebanon for chicken and fish feed applications. Live 10 kg packs at US$10. Discuss suitability, availability and specifications.',
    inquiryDetails: [
      'Chicken or fish species, life stage and intended feeding approach',
      'Number of live 10 kg packs and order frequency',
      'Delivery location and any technical documentation you need',
    ],
    faq: [
      {
        question: 'Can BSFL larvae be used for chickens and fish?',
        answer:
          'BSFL larvae are used in poultry and aquaculture feeding applications. The suitable format and feeding approach depend on the species, life stage, overall diet and applicable requirements. Discuss your animals with our team and a qualified nutritionist; no universal feeding rate or performance result is promised.',
      },
      {
        question: 'What live larvae pack is offered?',
        answer:
          'Live BSFL larvae are offered in 10 kg packs at US$10 per pack. Confirm availability, delivery arrangements and any additional charges before committing to an order. Other formats are not confirmed.',
      },
    ],
    specifications: [
      { label: 'Product format', value: 'Live' },
      { label: 'Protein content', value: null },
      { label: 'Packaging', value: null },
    ],
  },
  {
    slug: 'bsfl-frass',
    name: 'BSFL Frass',
    packs: [
      { id: 'frass-5kg', weightKg: 5, priceUsd: 5, mockupViewBox: '20 190 445 570' },
      { id: 'frass-10kg', weightKg: 10, priceUsd: 9, mockupViewBox: '475 85 520 675' },
    ],
    category: 'Organic soil input',
    summary: 'A BSFL production byproduct for soil management. 5 kg: US$5; 10 kg: US$9.',
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
      'BSFL frass from Elma’s in Lebanon: 5 kg packs at US$5 and 10 kg packs at US$9. Request verified composition, treatment details and application guidance.',
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
    packs: [],
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
