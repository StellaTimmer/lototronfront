import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import '@/assets/css/banner.css' // kui on oma style.css fail

// Font Awesome imports
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faR, fas, faUserSecret} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'

// Add the imported icons to the library
library.add(faUserSecret, fas, faR, far)

const app = createApp(App)

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')