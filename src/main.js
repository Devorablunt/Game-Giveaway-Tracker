import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGapi from 'vue-gapi'
import App from './App.vue'


const app = Vue.createApp(App);
// Axios for API methods
app.use(VueAxios, axios);
// GoogleAPI https://www.npmjs.com/package/vue-gapi
// Doku -> https://vue-gapi.github.io/vue-gapi/reference/GoogleAuthService/__index__.html
app.use(VueGapi, {
    apiKey: 'AIzaSyBrPiV3Rr0zfSSgr0rovdoqRVK51ei3ScQ',
    clientId: '835659979342-ogth10p0iq1ft54s4mj7oc639o3fsjnh.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scope: 'https://www.googleapis.com/auth/calendar',
})

app.mount('#app');