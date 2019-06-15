import Vue from 'vue'
import axios from 'axios'



Vue.use({
    install (Vue) {
        Vue.prototype.$http = axios.create({
            baseURL : 'https://tecinfor-gerenciador.firebaseio.com/',
            headers : {
                'authorization' : 'abcd123'
            }
        })
        
    }
})
Vue.prototype.$http.interceptors.request.use(config => {

    return config
}, error => Promise.reject(error))
