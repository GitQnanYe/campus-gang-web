// 工具包
import axios from "axios"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Qs = require("querystring");

var instance = axios.create({
    // 默认路径
    // 服務器
    baseURL: 'https://api.campus.qnan.top',
    // 本地測試
    // baseURL: 'http://localhost:8080',
    // withCredentials: true,
    // 超时时间
    timeout: 20000
})
// instance.defaults.withCredentials=true
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    NProgress.start();//开启
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    NProgress.done();//关闭
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    NProgress.done();//关闭
    // 对响应数据做点什么
    return response;
}, function (error) {
    NProgress.done();//关闭
    // 对响应错误做点什么
    return Promise.reject(error);
});

let get = function (url, params) {
    return instance.get(url, {params});
}

let post = function (url, params) {
    return instance.post(url, Qs.stringify(params));
}

let put = function (url, params) {
    return instance.put(url, Qs.stringify(params));
}

let del = function (url, params) {
    return instance.delete(url, {params});
}
// 导出get和post方法
export {
    get, post, put, del
}