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
    images: data.thumbnails || data.images || [],
    rating: data.rating || 0,
    reviews: data.reviewsCount ? `(${data.reviewsCount})` : "(0)",
    badge: data.isFeatured ? "Featured" : (data.badge || null),
    age: data.ageGroup || "0-6 Months",
    gender: data.gender || "Unisex",
    description: data.description || "",
    shortDescription: data.shortDescription || "",
    ...data,
    colors: typeof data.colors === 'string' ? data.colors.split(',').map(c => c.trim()).filter(Boolean) : (Array.isArray(data.colors) ? data.colors : []),
    sizes: typeof data.sizes === 'string' ? data.sizes.split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(data.sizes) ? data.sizes : [])
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
