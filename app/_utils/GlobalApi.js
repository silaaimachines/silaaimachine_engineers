const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api'
});

const fetchAllPaginatedData = async (endpoint, filters = {}, pageSize = 25) => {
    try {
        // Build query parameters with filters and pagination
        const filterParams = Object.entries(filters).map(
            ([key, value]) => `filters[${key}][$eq]=${value}`
        ).join('&');

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

const getProducts = (page = 1, pageSize = 25) =>
    axiosClient.get(`/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);

const getProductBySlug = (slug) =>
    axiosClient.get(`/products?filters[slug][$eq]=${slug}&populate=*`);

const getCategoryBySlug = (slug) =>
    axiosClient.get(`/categories?filters[slug][$eq]=${slug}&populate=*`);

const getCustomerTypeBySlug = (slug) =>
    axiosClient.get(`/customer-types?filters[slug][$eq]=${slug}&populate=*`);

const getProductsForCategories = (slug, page = 1, pageSize = 25) =>
    axiosClient.get(`/products?filters[category][slug][$eq]=${slug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);

const getProductsForCustomerType = (slug, page = 1, pageSize = 25) =>
    axiosClient.get(`/products?filters[customer_type][slug][$eq]=${slug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);

const getAllCategories = () => fetchAllPaginatedData('/categories');
const getAllSliders = () => fetchAllPaginatedData('/sliders');
const getAllBrandSliders = () => fetchAllPaginatedData('/brands');
const getAllCustomerTypes = () => fetchAllPaginatedData('/customer-types');
const getAllFeaturedProducts = () => fetchAllPaginatedData('/products', { Featured: true });

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
    getProductsForCustomerType
};