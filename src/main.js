import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import Swal from 'sweetalert2'
import { HasError, AlertError } from 'vform/src/components/bootstrap5'
import VueProgressBar from 'vue-progressbar'
import Loading from 'vue-loading-overlay';
import './assets/fontawesome-free-6.1.1-web/css/all.css'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuelidate);

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
Vue.prototype.$toast =Toast;
Vue.prototype.$swal =Swal;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.use(Loading,{color: '#bffaf3',});
Vue.use(VueProgressBar, options)
const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
      speed: '0.3s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'left',
    inverse: false
  }
  
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProductForm from './components/ProductForm';
const routes=[
  { path: '/', component: LoginForm },
  { path: '/register', 
        component: RegisterForm,
        
  },
  
  { path: '/product', 
      component: ProductForm,
     
  },
  
]
export const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
  linkExactActiveClass: "active"
});
export default router;

new Vue({
  render: h => h(App),
  router,
  
}).$mount('#app')
