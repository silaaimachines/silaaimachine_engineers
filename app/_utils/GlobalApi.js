const { default: axios } = require("axios");

const API_TOKEN =
  "b4bae534dac17db1617183682abaa13d01e0d1a3a6d9d444d050fd4048c6923b80f12272aedbbd710436fea8e1d71f8c7d4178fbb7a090e84be7d39b68dcfd8f50dfbabd84182d64bb8e9efa923d3e87e69478bd616803fceece209b60e88bfb5d588574d9aa7d4ee2c1f938afa370e0e65698b090547fb76b30885729afe573"; // Bearer token

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api`,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

const fetchAllPaginatedData = async (endpoint, filters = {}, pageSize = 25) => {
  try {
    // Build query parameters with filters and pagination
    const filterParams = Object.entries(filters)
      .map(([key, value]) => `filters[${key}][$eq]=${value}`)
      .join("&");

    const initialResponse = await axiosClient.get(
      `${endpoint}?populate=*&pagination[page]=1&pagination[pageSize]=${pageSize}&${filterParams}`
    );

    const totalPageCount = initialResponse.data.meta.pagination.pageCount;
    let allData = [...initialResponse.data.data];

    // Loop through pages if more than one page is needed
    for (let currentPage = 2; currentPage <= totalPageCount; currentPage++) {
      const response = await axiosClient.get(
        `${endpoint}?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&${filterParams}`
      );
      allData = [...allData, ...response.data.data];
    }

    return allData;
  } catch (error) {
    return [];
  }
};

// Existing methods
const getProducts = (page = 1, pageSize = 25) =>
  axiosClient.get(
    `/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

const getProductBySlug = (slug) =>
  axiosClient.get(`/products?filters[slug][$eq]=${slug}&populate=*`);

const getCategoryBySlug = (slug) =>
  axiosClient.get(`/categories?filters[slug][$eq]=${slug}&populate=*`);

const getBrandBySlug = (slug) =>
  axiosClient.get(`/brands?filters[slug][$eq]=${slug}&populate=*`);

const getTagsBySlug = (slug) =>
  axiosClient.get(`/tags?filters[slug][$eq]=${slug}&populate=*`);

const getCustomerTypeBySlug = (slug) =>
  axiosClient.get(`/customer-types?filters[slug][$eq]=${slug}&populate=*`);

const getProductsForCategories = (slug, page = 1, pageSize = 25) =>
  axiosClient.get(
    `/products?filters[category][slug][$eq]=${slug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

const getProductsForCustomerType = (slug, page = 1, pageSize = 25) =>
  axiosClient.get(
    `/products?filters[customer_type][slug][$eq]=${slug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

const getProductsForBrands = (slug, page = 1, pageSize = 25) =>
  axiosClient.get(
    `/products?filters[brand][slug][$eq]=${slug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
const getProductsForTags = (slug, page = 1, pageSize = 25) =>
  axiosClient.get(
    `/products?filters[tags][slug][$eq]=${slug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
const getBannerByName = (name, page = 1, pageSize = 25) =>
  axiosClient.get(
    `/banners?filters[Name][$eq]=${name}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

// New method for searching products
const searchProducts = (searchTerm, page = 1, pageSize = 25) =>
  axiosClient.get(
    `/products?filters[Name][$contains]=${searchTerm}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

const searchJobDetails = (searchType, searchTerm, page = 1, pageSize = 25) =>
  axiosClient.get(
    `/servicings?filters[${searchType}][$contains]=${searchTerm}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

const getAllCategories = () => fetchAllPaginatedData("/categories");
const getAllSliders = () => fetchAllPaginatedData("/sliders");
const getAllBrandSliders = () => fetchAllPaginatedData("/brands");
const getAllCustomerTypes = () => fetchAllPaginatedData("/customer-types");
const getAllFeaturedProducts = () =>
  fetchAllPaginatedData("/products", { Featured: true });
const getAllProducts = () => fetchAllPaginatedData("/products");

const getAllItems = () => fetchAllPaginatedData("/items");
const getAllTags = () => fetchAllPaginatedData("/tags");

const postSalesInvoiceData = (jsonData) =>
  axiosClient.post("/invoices", jsonData);

const postServiceRegistrationData = (jsonData) =>
  axiosClient.post("/servicings", jsonData);
const putServiceJobUpdateByJobNumber = (jsonData, JobId) =>
  axiosClient.put(`/servicings/${JobId}`, jsonData);

axiosClient.put;

const RegisterAccount = (username, email, password) =>
  axiosClient
    .post("/auth/local/register", {
      username,
      email,
      password,
    })
    .then((response) => response.data)
    .catch(() => null);

export default {
  getProducts,
  getProductBySlug,
  getCategoryBySlug,
  getAllFeaturedProducts,
  getAllCategories,
  getAllSliders,
  getAllBrandSliders,
  getAllCustomerTypes,
  getCustomerTypeBySlug,
  getProductsForCategories,
  getProductsForCustomerType,
  getProductsForBrands,
  RegisterAccount,
  searchProducts,
  getBrandBySlug,
  postServiceRegistrationData,
  searchJobDetails,
  getAllItems,
  putServiceJobUpdateByJobNumber,
  getAllProducts,
  postSalesInvoiceData,
  getProductsForTags,
  getTagsBySlug,
  getAllTags,
  getBannerByName,
};
