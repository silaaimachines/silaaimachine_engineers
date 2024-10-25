const { default: axios } = require("axios");

const axiosClient=axios.create({
    baseURL:'http://192.168.1.10:1337/api'
})

const getCategory=()=>axiosClient.get('/categories?populate=*');
const getSliders=()=>axiosClient.get('/sliders?populate=*');
const getBrandSliders=()=>axiosClient.get('/brands?populate=*');

const getCustomerType=()=>axiosClient.get('/customer-types?populate=*');
const getProducts = (page = 1, pageSize = 25) =>
    axiosClient.get(`/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
  





export default{
    getCategory,
    getSliders,
    getBrandSliders,
    getProducts,
    getCustomerType
}