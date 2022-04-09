<template>
  <body>
    <header>
      <!-- <h1>TEST123</h1> -->
      <Navbar/>
    </header>
    <main>
      <component :is="currentView" />
    </main>
    <footer>
      <!-- <p>©2022 Tobias Vogt </p> -->
      <a href="#/dataProtection">Datenschutzerklärung</a>
      <a href="#">AGB</a>
    </footer>    
  </body>
</template>

<script>
  import Home from './views/Home.vue'
  import Giveaways from './views/Giveaways.vue'
  import Calendar from  './views/Calendar.vue'
  import NotFound from './views/NotFound.vue'
  import DataProtection from './views/DataProtection.vue'
  import LogIn from './components/LogIn.vue'
  import Navbar from './components/Navbar.vue'

  const routes = {
    '/': Home,
    '/giveaways': Giveaways,
    '/calendar': Calendar,  
    '/dataProtection': DataProtection,
  }

  export default {
    components: {
    LogIn,
    Navbar
},
    data() {
      return {
        currentPath: window.location.hash,
      }
    },
    computed: {
      currentView() {
        return routes[this.currentPath.slice(1) || '/'] || NotFound
      }
    },
    mounted() {
      window.addEventListener('hashchange', () => {
        this.currentPath = window.location.hash
      })
    }
  }
</script>

<style>
  /* @import './assets/base.css'; */
  body {
    min-height: 100vh; 
    margin: 0;
    padding: 0;
    display: grid;
    overflow-x: hidden;
    font-family: 'Roboto';
    background-color: #282828;
    /* background-image: url("./assets/carl-raw-m3hn2Kn5Bns-unsplash.jpg");
    background-repeat: no-repeat;
    background-position: center -30px;
    background-size: 100%; */
  }
  main {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  footer {
    background-color: #121212;
    margin-top: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  footer p {
    color: white;
    font-size: 15px;
    display: flex;
    align-self: flex-start;
    padding: 5px;
  }
  footer a {
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-decoration: none;
    color: white;
    text-align: center;
    padding: 20px;
  }
  footer a:hover {
    background-color: #007EA7;
  }

  .button {
    height: 40px;
    font-weight: bold;
    color: white;
    background-color: #003459;
    border: 0;
  }

  .button:hover {
    background-color: #007EA7;
  }
</style>
