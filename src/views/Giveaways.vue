<template>
  <div id="giveaways">
    <div id="filter-wrapper">
      <div id="checkbox-item">
        <label id="checkbox-label" for="checkbox">Show all:</label>
        <input id="checkbox" :checked="showAll" @change="checkboxChange" type="checkbox">
      </div>
      <Dropdown v-if="!showAll" inputType="Platforms: " :optionArray="this.platforms" @onChange="getData($event)"/>
      <Dropdown v-if="!showAll" inputType="Types: " :optionArray="this.types" @onChange="getData($event)"/>
      <Dropdown v-if="!showAll" inputType="Sort-by: " :optionArray="this.sortTypes" @onChange="getData($event)"/>  
    </div>
    <GiveawayCard :giveawayList="this.giveawayList" @getEventLink="alertLink($event)"/>
  </div>
</template>

<script>
  import Dropdown from '../components/Dropdown.vue'
  import GiveawayCard from '../components/GiveawayCard.vue';

  export default {
    name: 'App',
    components: {
    Dropdown,
    GiveawayCard
},
    data() {
      return {
        showAll: true, // Show all giveaways + hide filters
        giveawayList: [],
        // filter option arrays
        platforms: ['pc', 'steam', 'epic-games-store', 'ubisoft', 'gog', 'itchio', 'ps4', 'ps5', 'xbox-one', 
                  'xbox-series-xs', 'switch', 'android', 'ios', 'vr', 'battlenet', 'origin', 'drm-free', 'xbox-360'],
        types: ['game', 'loot', 'beta'],
        sortTypes: ['date', 'value', 'popularity'],
        // Rapid-API config to prevent CORS-error
        options: {
          method: 'GET',
          url: 'https://gamerpower.p.rapidapi.com/api/giveaways',
          //default value has to be value of optionArray[0]
          params: {platform: 'pc', type: 'game', 'sort-by': 'date'},
          headers: {
            'x-rapidapi-host': 'gamerpower.p.rapidapi.com',
            'x-rapidapi-key': '8aee3b2d36msh0e8d86c1f843a6ep1705dejsncad8c62ee314'
          }
        },
      }
    },
    created() {
      this.getData();
    },
    methods: {
      checkboxChange() {
        this.showAll = !this.showAll;
        this.getData(undefined);
      },
      alertLink(link) {
        if (window.confirm('Click "ok" to open created event in new tab. Cancel to stay on this website')) 
        {
          window.open(link, '_blank');
        };
        // window.alert(link);
      },
      // Game-Giveaways API call
      async getData(dropdownOutput) {
        // check if all giveaways without filter should be loaded
        if(this.showAll == true) {
          delete this.options["params"];
        } else if (this.showAll == false) {
          // check if first load
          if (dropdownOutput == undefined) {
            this.options = {
              method: 'GET',
              url: 'https://gamerpower.p.rapidapi.com/api/giveaways',
              //default value has to be value of optionArray[0]
              params: {platform: 'pc', type: 'game', 'sort-by': 'date'},
              headers: {
                'x-rapidapi-host': 'gamerpower.p.rapidapi.com',
                'x-rapidapi-key': '8aee3b2d36msh0e8d86c1f843a6ep1705dejsncad8c62ee314'
              }
            }
          } else if (dropdownOutput != undefined) {
            // check which dropdown got changed
            switch(dropdownOutput[1]) {
              case "Platforms: ": 
                this.options["params"]["platform"] = dropdownOutput[0];
                break;
              case "Types: ": 
                this.options["params"]["type"] = dropdownOutput[0];
                break;
              case "Sort-by: ": 
                this.options["params"]["sort-by"] = dropdownOutput[0];
                break;
            }
          }
        }
      
        // get giveaways
        try {
          let response = await this.axios.request(this.options);
          this.giveawayList = response.data;
        } catch (e) {
          console.error(e);
        }
      },
    },
  }
</script>

<style>
  #filter-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  #giveaways {
    clear:both;
  }
  #checkbox-label  {
    color: white;
    width: auto;
    height: 30px;
    font-size: 20px;
  }
  #checkbox {
    cursor: pointer;
    -ms-transform: scale(2); /* IE */
    -moz-transform: scale(2); /* FF */
    -webkit-transform: scale(2); /* Safari and Chrome */
    -o-transform: scale(2); /* Opera */
    transform: scale(2);
    padding: 10px;
    margin-left: 20px;
  }
  #checkbox-item {
    margin-top: 40px;
  }
</style>