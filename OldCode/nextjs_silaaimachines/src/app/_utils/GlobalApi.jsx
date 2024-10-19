const { default: axios } = require("axios");

const axiosClient=axios.create({
    baseURL:"http://192.168.1.4:1337/api",
})

const getSliders=()=>axiosClient.get("sliders?populate=*").then(resp=>{
    return resp.data.data
})


export default {getSliders}