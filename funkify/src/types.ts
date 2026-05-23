export interface ProductReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  color: string;
  colorBgHex: string;
  price: number;
  originalPrice?: number;
  image: string;
  imagesList: string[];
  description: string;
  category: string; // T-Shirts, Hoodies, Sweatshirts, Accessories
  rating: number; // e.g. 4.8
  reviewsCount: number;
  sizes: string[];
  colorsHex: string[];
  style: string; // Streetwear, Minimalist, Jaipur Heritage, Cyberpunk
  frontPrintDesc?: string;
  backPrintDesc?: string;
  instaStory: string;
  moodEmoji: string;
  moodName: string;
  bullets: string[];
  reviewsList: ProductReview[];
}

export interface CartItem {
  product: Product;
  size: string;
  colorHex: string;
  colorName: string;
  quantity: number;
}

export const INSTAGRAM_HANDLE = "https://www.instagram.com/funkify.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

export const FUNKIFY_LOGO_PATH = "/assets/images/funkify_logo_1779546933641.png";

export const PRODUCTS_DATA: Product[] = [
  {
    id: "overthinking-tee",
    name: "The Overthinking Tee",
    tagline: "The art of creating problems that weren't there.",
    color: "Midnight Black",
    colorBgHex: "#000000",
    price: 999,
    originalPrice: 1499,
    image: "/assets/images/tee_overthinking_1779546951749.png",
    imagesList: [
      "/assets/images/tee_overthinking_1779546951749.png"
    ],
    description: "Heavy minds. Soft comfort. A visual tribute to 3 AM sessions replay conversations from 2019, creating fake scenarios, and still somehow looking aesthetically put together.",
    category: "T-Shirts",
    rating: 4.8,
    reviewsCount: 124,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colorsHex: ["#000000", "#1E3E2F", "#5C5645"],
    style: "Streetwear",
    frontPrintDesc: "Minimal Funkify brand sigils",
    backPrintDesc: "Premium skeleton under a full glowing moon, surrounded by gothic details.",
    instaStory: "3AM thoughts. Heavy minds. Soft oversized comfort. Created for the people who overthink everything but still romanticize life.",
    moodEmoji: "🧠",
    moodName: "Overthinking",
    bullets: [
      "100% Premium Heavyweight Cotton (240 GSM)",
      "Unisex Relaxed Streetwear Oversized Fit",
      "High-density ink puffed graphics",
      "Breathable, durable, and fade-resistant print"
    ],
    reviewsList: [
      {
        id: "rev-1",
        name: "Unnati Gupta",
        rating: 5,
        comment: "Skeleton under the moon graphic is insane detail. I overthink things, so wearing my personality is therapeutic lol.",
        date: "May 12, 2026",
        verified: true
      },
      {
        id: "rev-2",
        name: "Rohit S.",
        rating: 5,
        comment: "Super premium fabric. Truly 240 GSM, perfectly oversized. Fits like a dream.",
        date: "May 18, 2026",
        verified: true
      },
      {
        id: "rev-3",
        name: "Karan Johar",
        rating: 4,
        comment: "Very bold print and nice fit. Recommending to my fellow creative overthinkers.",
        date: "April 29, 2026",
        verified: true
      }
    ]
  },
  {
    id: "emotionally-expired-tee",
    name: "Emotionally Expired Tee",
    tagline: "Too emotionally expired to dress badly.",
    color: "Goth Forest Green",
    colorBgHex: "#1B3E2F",
    price: 999,
    originalPrice: 1299,
    image: "/assets/images/tee_expired_1779546971040.png",
    imagesList: [
      "/assets/images/tee_expired_1779546971040.png"
    ],
    description: "For the duo that sends each other reels instead of talking about feelings. Complete with a cheerful retro watercolor-style watermelon cartoon carrying attitude.",
    category: "T-Shirts",
    rating: 4.6,
    reviewsCount: 88,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorsHex: ["#1B3E2F", "#000000", "#F3EFE4"],
    style: "Minimalist",
    frontPrintDesc: "Retro bubbly text 'Emotionally Expired.' featuring custom watermelon design",
    backPrintDesc: "Slogan print 'Emotionally expired... but drip still active'",
    instaStory: "Current mood: Emotionally Expired... but the design matches your vibe exactly.",
    moodEmoji: "🥱",
    moodName: "Emotionally Expired",
    bullets: [
      "100% Premium Heavyweight Cotton (240 GSM)",
      "Rich deep Forest Green custom dye",
      "Durable DTF screen-printed graphics",
      "Pre-shrunk and double-needle stitched cuffs"
    ],
    reviewsList: [
      {
        id: "rev-4",
        name: "Anuya Chauhan",
        rating: 5,
        comment: "I need this one so bad! The dark green watermelon design is literally me on a daily basis.",
        date: "May 20, 2026",
        verified: true
      },
      {
        id: "rev-5",
        name: "Sneha Patel",
        rating: 4,
        comment: "The graphic print feels high-density and doesn't fade. Love wearing this daily.",
        date: "May 03, 2026",
        verified: true
      }
    ]
  },
  {
    id: "fucktus-tee",
    name: "The Fucktus Tee",
    tagline: "For people running on caffeine and one remaining nerve.",
    color: "Warm Oat Beige",
    colorBgHex: "#EAE2B7",
    price: 899,
    originalPrice: 1199,
    image: "/assets/images/tee_fucktus_1779547012822.png",
    imagesList: [
      "/assets/images/tee_fucktus_1779547012822.png"
    ],
    description: "Minimalist. Bold. Features a 3D-styled green saguaro cactus with its arms folded precisely to speak the words you're too polite to say.",
    category: "T-Shirts",
    rating: 4.7,
    reviewsCount: 94,
    sizes: ["S", "M", "L", "XL"],
    colorsHex: ["#EAE2B7", "#000000"],
    style: "Jaipur Heritage",
    frontPrintDesc: "Clean middle-finger cactus artwork with serif 'FUCKTUS' caption",
    backPrintDesc: "Clean blank minimal look",
    instaStory: "For when you are running on warm vibes, good music, but absolutely zero space for nonsense.",
    moodEmoji: "🌵",
    moodName: "Fucktus State",
    bullets: [
      "240 GSM Elite Organic Cotton Loopback",
      "Buttery-soft organic Warm Oat dye",
      "Exquisite clean embroidery-feel screen print",
      "Drop-shoulder premium comfort silhouette"
    ],
    reviewsList: [
      {
        id: "rev-6",
        name: "Arjun Verma",
        rating: 5,
        comment: "The middle finger cactus layout on Warm Oat is top-tier aesthetic. Wore it to college and got so many laughs and compliments.",
        date: "May 22, 2026",
        verified: true
      }
    ]
  },
  {
    id: "its-okay-tee",
    name: "It's Okay to Not Be Okay Tee",
    tagline: "Healing slowly. Go grab your mood tee now.",
    color: "Healing Lavender",
    colorBgHex: "#8C76AD",
    price: 999,
    originalPrice: 1599,
    image: "/assets/images/tee_its_okay_1779546987545.png",
    imagesList: [
      "/assets/images/tee_its_okay_1779546987545.png"
    ],
    description: "A gorgeous collage of late night thoughts, healing playlists, coffee stains, overthinking, hope, and reminders to keep going. A warm hug in fabric form.",
    category: "T-Shirts",
    rating: 4.9,
    reviewsCount: 152,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colorsHex: ["#8C76AD", "#000000", "#F3EFE4"],
    style: "Streetwear",
    frontPrintDesc: "Mini chest jar labeled 'Emotional Support Glitter'",
    backPrintDesc: "Nostalgic multi-color scrapbook collage displaying 'IT'S OKAY TO NOT BE OKAY'",
    instaStory: "On some days you’re healing loudly. On some days you’re just surviving quietly.",
    moodEmoji: "💜",
    moodName: "Healing Vibe",
    bullets: [
      "Ultra-soft premium combed cotton blend (240 GSM)",
      "Pastel Lilac tone-on-tone dyed-to-match rib",
      "Highly breathable eco-friendly water-based soft ink collage",
      "Reinforced cover-seamed neck band for perfect fit"
    ],
    reviewsList: [
      {
        id: "rev-7",
        name: "Shubhangi Sharma",
        rating: 5,
        comment: "Saw this on insta and DM'd instantly. Material is super thick and oversized, perfect for Jaipur weather.",
        date: "May 21, 2026",
        verified: true
      }
    ]
  }
];
