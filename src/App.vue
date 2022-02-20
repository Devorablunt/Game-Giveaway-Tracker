<script>
  import Home from './components/Home.vue'
  import Giveaways from './components/Giveaways.vue'
  import Calendar from  './components/Calendar.vue'
  import NotFound from './components/NotFound.vue'

  const routes = {
    '/': Home,
    '/giveaways': Giveaways,
    '/calendar': Calendar,  	
  }

  export default {
    data() {
      return {
        currentPath: window.location.hash
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

<template>
  <div id="navbar">
    <a href="#/">Home</a> 
    <a href="#/giveaways">Giveaways</a> 
    <a href="#/calendar">Calendar</a> 
    <component :is="currentView" />
  </div>
</template>

<style>
  @import './assets/base.css';
  #navbar a {
    display: inline-block;
    margin: 0;
    padding: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 23px;
    text-decoration: none;
    color: yellowgreen;
    text-align: center;
  }
  #navbar a:hover {
    background-color: black;
  }
</style>
