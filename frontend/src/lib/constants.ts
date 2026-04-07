import { type NavItem } from "@/types";

export const SITE_CONFIG = {
  name: "Telal Development",
  nameAr: "تلال للتطوير العقاري",
  tagline: "Where Vision Meets Legacy",
  taglineAr: "حيث تلتقي الرؤية بالإرث",
  description: "Telal Development — Redefining Luxury Living in Saudi Arabia. Premium residential and commercial real estate developments.",
  descriptionAr: "تلال للتطوير العقاري — إعادة تعريف العيش الفاخر في المملكة العربية السعودية",
  url: "https://telaldevelopment.com",
  email: "info@telaldevelopment.com",
  phone: "+966 11 234 5678",
  whatsapp: "+966501234567",
  address: "King Fahd Road, Olaya District, Riyadh 12211, Saudi Arabia",
  addressAr: "طريق الملك فهد، حي العليا، الرياض 12211، المملكة العربية السعودية",
  social: {
    instagram: "https://instagram.com/telaldevelopment",
    linkedin: "https://linkedin.com/company/telaldevelopment",
    twitter: "https://twitter.com/telaldevelopment",
    youtube: "https://youtube.com/@telaldevelopment",
  },
  officeHours: "Sunday – Thursday: 9:00 AM – 6:00 PM",
  officeHoursAr: "الأحد – الخميس: 9:00 صباحاً – 6:00 مساءً",
  foundedYear: 2008,
} as const;

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Properties",
    labelAr: "العقارات",
    href: "/properties",
    children: [
      { label: "All Properties", labelAr: "جميع العقارات", href: "/properties" },
      { label: "Residential", labelAr: "سكني", href: "/properties?type=residential" },
      { label: "Commercial", labelAr: "تجاري", href: "/properties?type=commercial" },
      { label: "Off-Plan", labelAr: "على الخارطة", href: "/properties?type=off-plan" },
    ],
  },
  {
    label: "Projects",
    labelAr: "المشاريع",
    href: "/projects",
  },
  {
    label: "About",
    labelAr: "عن تلال",
    href: "/about",
    children: [
      { label: "Our Story", labelAr: "قصتنا", href: "/about" },
      { label: "Leadership", labelAr: "القيادة", href: "/team" },
      { label: "Awards", labelAr: "الجوائز", href: "/awards" },
      { label: "Sustainability", labelAr: "الاستدامة", href: "/sustainability" },
    ],
  },
  {
    label: "Services",
    labelAr: "الخدمات",
    href: "/services",
  },
  {
    label: "Insights",
    labelAr: "رؤى",
    href: "/insights",
  },
  {
    label: "Contact",
    labelAr: "تواصل معنا",
    href: "/contact",
  },
];

export const STATS = [
  { value: 47, suffix: "+", label: "Projects Completed", labelAr: "مشروع مكتمل" },
  { value: 1200, suffix: "+", label: "Units Delivered", labelAr: "وحدة تم تسليمها" },
  { value: 2.8, suffix: "B+", label: "SAR Portfolio Value", labelAr: "مليار ريال قيمة المحفظة" },
  { value: 16, suffix: "+", label: "Years of Excellence", labelAr: "سنة من التميز" },
];

export const SERVICE_CATEGORIES = [
  { slug: "residential", title: "Residential", titleAr: "سكني", icon: "Home" },
  { slug: "commercial", title: "Commercial", titleAr: "تجاري", icon: "Building2" },
  { slug: "mixed-use", title: "Mixed-Use", titleAr: "متعدد الاستخدامات", icon: "Layers" },
  { slug: "off-plan", title: "Off-Plan", titleAr: "على الخارطة", icon: "Map" },
  { slug: "retail", title: "Retail", titleAr: "تجزئة", icon: "Store" },
  { slug: "hospitality", title: "Hospitality", titleAr: "ضيافة", icon: "Hotel" },
];

export const FAQ_CATEGORIES = [
  "Buying Process",
  "Financing",
  "Legal",
  "Projects",
  "General",
  "Sustainability",
] as const;

export const CITIES = [
  { name: "Riyadh", nameAr: "الرياض", lat: 24.7136, lng: 46.6753 },
  { name: "Jeddah", nameAr: "جدة", lat: 21.4858, lng: 39.1925 },
  { name: "NEOM Belt", nameAr: "نيوم", lat: 27.9500, lng: 35.3000 },
  { name: "Eastern Province", nameAr: "المنطقة الشرقية", lat: 26.4207, lng: 50.0888 },
  { name: "Dubai", nameAr: "دبي", lat: 25.2048, lng: 55.2708 },
];

export const AMENITY_OPTIONS = [
  "Swimming Pool", "Gym", "Spa", "Parking", "Garden", "Security",
  "Concierge", "Rooftop", "Smart Home", "Balcony", "Maid Room",
  "Storage", "Children's Play Area", "BBQ Area", "Lobby", "Elevator",
] as const;
