// operation to fetch product list from product API (http://hackathon.dev.api.kemppi.com/?apiKey=d2c3af70cacb19c0)
const axios = require('axios');

const url = 'http://hackathon.dev.api.kemppi.com/?apiKey=d2c3af70cacb19c0';

function fetchProductList(){
    return axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
    });
}

module.exports = fetchProductList