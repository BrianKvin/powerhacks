const axios = require("axios");
require("dotenv").config();

const MY_TOKEN = process.env.MY_TOKEN;

const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;

function getAxiosInstance() {
  return {
    get(method, params) {
      return axios.get(`/${method}`, {
        baseURL: BASE_URL,
        params,
      });
    },
    post(method, data) {
      return axios({
        method: "post",
        url: `/${method}`,
        baseURL: BASE_URL,
        data,
      });
    },
  };
}

module.exports = { axiosInstance: getAxiosInstance() };
