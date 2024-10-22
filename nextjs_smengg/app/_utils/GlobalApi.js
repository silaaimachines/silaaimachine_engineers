const { default: axios } = require("axios");

const axiosClient=axios.create({
    baseURL:'http://localhost:1337/api'
})

const getCategory=()=>axiosClient.get('/categories?populate=*');
const getSliders=()=>axiosClient.get('/sliders?populate=*');
const getBrandSliders=()=>axiosClient.get('/brands?populate=*');


export default{
    getCategory,
    getSliders,
    getBrandSliders
}