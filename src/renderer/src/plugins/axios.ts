import axios from 'axios';
import { ElLoading,ElMessage } from 'element-plus';

const http = axios.create({
    baseURL: import.meta.env.DEV?'http://localhost:3000':'http://localhost:3000',
    timeout: 10000,
    
});

http.interceptors.request.use(
    config => {
        // 请求拦截器
        ElLoading.service({fullscreen: true, text: 'Loading...'})
        return config;
    },
    error => {
        // 请求错误拦截
        return Promise.reject(error);
})

http.interceptors.response.use(
    response =>{
        // 响应拦截器
        return response;
    },
    error =>{
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 3000,
            center:false,
            grouping:true
        })
        return Promise.reject(error);
    }
)

export default http;