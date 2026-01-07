import { db } from "../config/firebase";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";

// Helper to transform Firestore document to our app's product shape
const transformProduct = (docSnapshot) => {
  const data = docSnapshot.data();
  const regularPrice = typeof data.regularPrice === 'number' ? data.regularPrice : parseFloat(data.regularPrice || 0);
  const salePrice = data.salePrice ? parseFloat(data.salePrice) : null;
  // Use salePrice if it exists, otherwise regularPrice. 
  // Map originalPrice only if there is a salePrice to show the strikethrough.
  const hasSale = salePrice !== null && !isNaN(salePrice);

  return {
    id: docSnapshot.id,
    name: data.title || data.name || "Untitled Product",
    category: data.category || "Uncategorized",
    subcategory: data.subcategory || "",
    price: hasSale ? salePrice : regularPrice,
    originalPrice: hasSale ? regularPrice : null,
    image: data.featuredImage || "https://via.placeholder.com/600",
    images: data.thumbnails || data.images || [], // Map thumbnails or images array
    rating: data.rating || 0, // Assuming rating might be added later or calculated
    reviews: data.reviewsCount ? `(${data.reviewsCount})` : "(0)", // Adapting to possible new field name or default
    badge: data.isFeatured ? "Featured" : (data.badge || null), // Map isFeatured to badge if needed, or use existing logic
    age: data.ageGroup || "0-6 Months", // Mapping likely field for "age"
    gender: data.gender || "Unisex",
    description: data.description || "",
    shortDescription: data.shortDescription || "",
    ...data // Spread rest of data just in case
  };
};

export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(transformProduct);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return transformProduct(docSnap);
    } else {
      console.error("No such product!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
