<template>
  <div>
    <h1>Giveaways</h1>
    <ul v-if="items && items.length">
      <li v-for="item of items">
        <h2><strong>{{item.title}}</strong></h2>
        <img :src="item.thumbnail">
        <p>{{item.description}}</p>
        <p>{{item.worth}}</p>
        <p>{{item.instructions}}</p>
        <p>{{item.type}}</p>
        <p>{{item.platforms}}</p>
      </li>
    </ul>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        items: [],
        errors: [],
        // Rapid-API config to prevent CORS-error
        options: {
          method: 'GET',
          // API-URL
          url: 'https://gamerpower.p.rapidapi.com/api/giveaways',
          headers: {
            'x-rapidapi-host': 'gamerpower.p.rapidapi.com',
            'x-rapidapi-key': '8aee3b2d36msh0e8d86c1f843a6ep1705dejsncad8c62ee314'
          }
        }
      }
    },
    methods: {
      async loadData() {
        try {
          let response = await this.axios.request(this.options);
          this.items = response.data;
          // console.log(response);
        } catch (e) {
          console.error(e);
        }
      },
    },
    created() {
      this.loadData();
    }
  }
</script>

<style>
  h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 23px;
    text-decoration: none;
    color: yellowgreen;
  }
  p {
    text-align: left;
  }
  ul {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    list-style-type: none;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }
</style>