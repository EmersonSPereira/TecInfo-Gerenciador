import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'


Vue.use(Vuetify, Vuelidate,VueMask )
Vue.config.productionTip = false

let app = ''
var config = {
  apiKey: "AIzaSyB0nclVF8XyfQ1OyPnAxmcj-yZ6u2Cos38",
  authDomain: "tecinfor-gerenciador.firebaseapp.com",
  databaseURL: "https://tecinfor-gerenciador.firebaseio.com",
  projectId: "tecinfor-gerenciador",
  storageBucket: "tecinfor-gerenciador.appspot.com",
  messagingSenderId: "72368438805"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
    
  }
})