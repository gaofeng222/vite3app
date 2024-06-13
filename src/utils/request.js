// 封装axios
import axios from "axios";

// 创建axios实例
const instance = axios.create({
  baseURL: "http://localhost:3000", // 基础URL
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加token到headers
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么，比如根据状态码进行不同的处理
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject(
        new Error(`Error ${response.status}: ${response.statusText}`)
      );
    }
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
