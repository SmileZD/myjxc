import axios from "axios";
import Element from 'element-ui'
import router from "./router";

axios.defaults.baseURL = "https://test.weikeji.icu/api"
const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})
request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("zdjxctoken")
    return config
})
request.interceptors.response.use(response => {
        let res = response.data;
        console.log(res)
        if (res.code === 0) {
            return res.data
        } else if (res.code === 401) {
            //后端传code为401约定为token失效或过期 跳转登录页
            router.push("/login")
        } else {
            Element.Message.error(res.msg ? res.msg : '服务器连接失败', {duration: 3 * 1000})
            return Promise.reject(res.msg)
        }
    },
    error => {
        Element.Message.error('服务器连接失败', {duration: 3 * 1000})
        return Promise.reject(error)
    }
)
export default request