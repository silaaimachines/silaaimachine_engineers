const { default: axios } = require("axios");

const API_TOKEN =
  "2c9f7d746f20fc218cba9cc814cda9c79e7514a1c05de5d6f02dbbab11300d35515453f569c45fc0b4da864fff3ccccb7e7bdd2433e8bc5474e6096882dd19f31573b5d9e5fac3349cfdcf0d627dd790ae71704e1edc6ffbc20c2ee468e1e4b596cef1e7daefbbb9f2f0a909618a48fa00610541145b7b39040cb421d10b588d"; // Bearer token

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api`,
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
    console.error(`Error fetching data from ${endpoint}:`, error);
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

// New method for searching products
const searchProducts = (searchTerm, page = 1, pageSize = 25) =>
  axiosClient.get(
    `/products?filters[Name][$contains]=${searchTerm}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

const searchJobDetails = (searchType, searchTerm, page = 1, pageSize = 25) =>
  axiosClient.get(
    `/servicings?filters[${searchType}][$contains]=${searchTerm}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );

const getAllCategories = () => fetchAllPaginatedData("/categories");
const getAllSliders = () => fetchAllPaginatedData("/sliders");
const getAllBrandSliders = () => fetchAllPaginatedData("/brands");
const getAllCustomerTypes = () => fetchAllPaginatedData("/customer-types");
const getAllFeaturedProducts = () =>
  fetchAllPaginatedData("/products", { Featured: true });
const getAllProducts = () => fetchAllPaginatedData("/products");

const getAllItems = () => fetchAllPaginatedData("/items");

const postSalesInvoiceData = (jsonData) =>
  axiosClient.post("/invoices", jsonData, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

const postServiceRegistrationData = (jsonData) =>
  axiosClient.post("/servicings", jsonData, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
const putServiceJobUpdateByJobNumber = (jsonData, JobId) =>
  axiosClient.put(`/servicings/${JobId}`, jsonData, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

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
};
