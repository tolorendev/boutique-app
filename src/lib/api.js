const TOKEN = "dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";
const FIREBASE_DOMAIN = "https://firebasestorage.googleapis.com";
const API_URLs = {
  getAllProducts: `${FIREBASE_DOMAIN}/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=${TOKEN}`,
};

//===============================================
// Get all products
//==============================================
export const getAllProducts = async () => {
  const response = await fetch(API_URLs.getAllProducts);
  if (!response.ok) {
    throw new Error(
      `Could not fetch products! . Status code: ${response.status}`
    );
  }
  const resData = await response.json();
  return resData;
};

//===============================================
// Get Single product and Related Products
//===============================================
export const getSingleProduct = async (productId) => {
  const response = await fetch(API_URLs.getAllProducts);
  if (!response.ok) {
    throw new Error(
      `Could not fetch product! . Status code: ${response.status}`
    );
  }
  const resData = await response.json();
  // Find product with id
  const product = resData.filter((prod) => prod._id.$oid === productId)[0];
  const productImages = [
    { url: product.img1, id: "img1" },
    { url: product.img2, id: "img2" },
    { url: product.img3, id: "img3" },
    { url: product.img4, id: "img4" },
  ];

  // Find Related Products
  const relatedProducts = resData.filter(
    (prod) =>
      prod.category === product.category && prod._id.$oid !== product._id.$oid
  );
  return { product, productImages, relatedProducts };
};
