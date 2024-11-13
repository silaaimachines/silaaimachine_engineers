import GlobalApi from "../_utils/GlobalApi";

export default async function productsSitemap() {
  const baseUrl = "https://silaaimachines.com";

  const allProducts = await GlobalApi.getAllProducts();

  const productUrls = allProducts.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
  }));

  return productUrls;
}
