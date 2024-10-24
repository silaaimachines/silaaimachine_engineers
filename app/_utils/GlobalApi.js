const { default: axios } = require("axios");

const axiosClient=axios.create({
    baseURL:'http://192.168.1.10:1337/api'
})

const getCategory=()=>axiosClient.get('/categories?populate=*');
const getSliders=()=>axiosClient.get('/sliders?populate=*');
const getBrandSliders=()=>axiosClient.get('/brands?populate=*');
const getProducts=()=>axiosClient.get('/products?populate=*');



export default{
    getCategory,
    getSliders,
    getBrandSliders,
    getProducts
}