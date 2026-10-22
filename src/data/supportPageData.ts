export interface ContactInfoItem {
  type: string;
  label: string;
  value: string;
  subValue?: string;
  link?: string;
  iconType: "mail" | "phone" | "location";
}

export interface StudioLocation {
  id: "office" | "studio";
  name: string;
  addressLines: string[];
  lat: number;
  lng: number;
  mapEmbedUrl: string;
  directionsUrl: string;
}

export const CONTACT_DETAILS: ContactInfoItem[] = [
  {
    type: "email",
    label: "Mail",
    value: "info@makemyvid.io",
    link: "mailto:info@makemyvid.io?subject=Hello%20Make%20My%20Vid&body=Hi%20team,%20I%20am%20interested%20in...",
    iconType: "mail",
  },
  {
    type: "phone-india",
    label: "Phone (India)",
    value: "+91 79774 84292",
    link: "tel:+917977484292",
    iconType: "phone",
  },
  {
    type: "phone-uk",
    label: "For UK Enquiries",
    value: "+44 75425 50969",
    link: "tel:+447542550969",
    iconType: "phone",
  },
];

export const STUDIO_LOCATIONS: StudioLocation[] = [
  {
    id: "office",
    name: "Office Address",
    addressLines: [
      "11, Star Trade Centre, Chamunda Circle",
      "Sodawala Lane, Borivali West",
      "Mumbai, Maharashtra 400092",
    ],
    lat: 19.233379,
    lng: 72.855010,
    mapEmbedUrl: "https://www.google.com/maps?q=19.233379,72.855010&hl=es;z=17&output=embed",
    directionsUrl: "https://maps.google.com/?q=19.233379,72.855010",
  },
  {
    id: "studio",
    name: "Editing Studio Address",
    addressLines: [
      "Gala 6, Navratna Apartment",
      "Asara Colony Road, Dattapada, Borivali East",
      "Mumbai, Maharashtra 400066",
    ],
    lat: 19.223883,
    lng: 72.858639,
    mapEmbedUrl: "https://www.google.com/maps?q=19.223883,72.858639&hl=es;z=17&output=embed",
    directionsUrl: "https://maps.google.com/?q=19.223883,72.858639",
  },
];

export const SERVICE_OPTIONS = [
  "Photoshoot",
  "Videoshoot",
  "Social Media Content",
  "Corporate AV & Brand Film",
  "Remote Video Editing",
  "Trade Show & Event Coverage",
  "Live Telecast & Streaming",
];

export const TIMELINE_OPTIONS = [
  "Urgent (Within a week)",
  "2 - 4 Weeks",
  "1 - 3 Months",
  "Flexible / Exploring ideas",
];

export const REFERRAL_OPTIONS = [
  "Referral from a Client / Friend",
  "Google Search",
  "Social Media (Instagram / LinkedIn)",
  "BNI / Networking Event",
  "Other",
];

export const KEY_FACTORS = [
  "High-quality production & storytelling",
  "Fast turnaround time & prompt delivery",
  "Budget-friendly & transparent pricing",
  "Creative direction & complete scripting support",
];
