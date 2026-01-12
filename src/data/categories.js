import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

// Fallback hardcoded categories
export const categories = [
  {
    name: "Newborn Essentials",
    slug: "newborn-essentials",
    image: "/cat_images/newborn_essentials.png",
    subcategories: [
      { name: "Bodysuits", slug: "bodysuits" },
      { name: "Swaddles", slug: "swaddles" },
      { name: "Diapering", slug: "diapering" },
      { name: "Bath Time", slug: "bath-time" },
      { name: "Grooming", slug: "grooming" },
    ],
  },
  {
    name: "Clothing",
    slug: "clothing",
    image: "/cat_images/baby_clothing.jpeg",
    subcategories: [
      { name: "Bodysuits", slug: "bodysuits" },
      { name: "Rompers & Jumpsuits", slug: "rompers-jumpsuits" },
      { name: "Sleepwear", slug: "sleepwear" },
      { name: "Dresses", slug: "dresses" },
      { name: "Tops & Tees", slug: "tops-tees" },
      { name: "Bottoms", slug: "bottoms" },
      { name: "Outerwear", slug: "outerwear" },
    ],
  },
  {
    name: "Toys",
    slug: "toys",
    image: "/cat_images/toys_and_play.png",
    subcategories: [
      { name: "Soft Plush Toys", slug: "soft-plush-toys" },
      { name: "Wooden Toys", slug: "wooden-toys" },
      { name: "Educational & STEM", slug: "educational-stem" },
      { name: "Rattles & Teethers", slug: "rattles-teethers" },
      { name: "Activity Gyms", slug: "activity-gyms" },
      { name: "Dolls & Action Figures", slug: "dolls-action-figures" },
    ],
  },
  {
    name: "Nursery",
    slug: "nursery",
    image: "/cat_images/nursery_decor.png",
    subcategories: [
      { name: "Cribs & Bassinets", slug: "cribs-bassinets" },
      { name: "Bedding Sets", slug: "bedding-sets" },
      { name: "Decor & Wall Art", slug: "decor-wall-art" },
      { name: "Storage & Organization", slug: "storage-organization" },
      { name: "Lighting", slug: "lighting" },
      { name: "Nursing Chairs", slug: "nursing-chairs" },
    ],
  },
  {
    name: "Feeding",
    slug: "feeding",
    image: "/cat_images/feeding_and_care.png",
    subcategories: [
      { name: "Bottles & Nipples", slug: "bottles-nipples" },
      { name: "High Chairs", slug: "high-chairs" },
      { name: "Bibs & Burp Cloths", slug: "bibs-burp-cloths" },
      { name: "Breastfeeding", slug: "breastfeeding" },
      { name: "Toddler Utensils", slug: "toddler-utensils" },
      { name: "Food Processors", slug: "food-processors" },
    ],
  },
  {
    name: "Bath & Skincare",
    slug: "bath-skincare",
    image: "/cat_images/bath_and_skincare.png",
    subcategories: [
      { name: "Lotions", slug: "lotions" },
      { name: "Shampoos", slug: "shampoos" },
      { name: "Bath Toys", slug: "bath-toys" },
      { name: "Towels", slug: "towels" },
    ],
  },
  {
    name: "Maternity Wear",
    slug: "maternity-wear",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600",
    subcategories: [
      { name: "Dresses", slug: "dresses" },
      { name: "Tops", slug: "tops" },
      { name: "Leggings", slug: "leggings" },
      { name: "Nursing Bras", slug: "nursing-bras" },
      { name: "Loungewear", slug: "loungewear" },
      { name: "Postpartum Care", slug: "postpartum-care" },
    ],
  },
];

/**
 * Fetch categories from Firestore
 * Falls back to hardcoded categories if fetch fails
 */
export const fetchCategories = async () => {
  try {
    const categoriesRef = collection(db, "categories");
    const querySnapshot = await getDocs(categoriesRef);

    if (querySnapshot.empty) {
      console.log("No categories found in database, using fallback");
      return categories;
    }

    const fetchedCategories = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Unnamed Category",
        slug: data.slug || doc.id,
        image: data.image || "/cat_images/newborn_essentials.png",
        description: data.description || "",
        subcategories: Array.isArray(data.subcategories)
          ? data.subcategories.map(sub => ({
            name: sub.name || "Unnamed",
            slug: sub.slug || sub.name?.toLowerCase().replace(/ /g, "-") || "unnamed"
          }))
          : []
      };
    });

    return fetchedCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return fallback categories on error
    return categories;
  }
};

