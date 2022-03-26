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
        showAll: true, // Show all giveaways + hide filter dopdowns
        giveawayList: [],
        // filter option arrays
        platforms: ['pc', 'steam', 'epic-games-store', 'ubisoft', 'gog', 'itchio', 'ps4', 'ps5', 'xbox-one', 
                  'xbox-series-xs', 'switch', 'android', 'ios', 'vr', 'battlenet', 'origin', 'drm-free', 'xbox-360'],
        types: ['game', 'loot', 'beta'],
        sortTypes: ['date', 'value', 'popularity'],
        params: {platform: 'pc', type: 'game', 'sort-by': 'date'},
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
      },
      // Game-Giveaways API call
      async getData(filterValueType) {
        if (this.showAll == true) {
          (async() => {
            this.giveawayList = await this.gamerpowerAPI.getAllGiveaways(); 
          })()
        } else if (this.showAll == false) {
            if (filterValueType == undefined) {
              this.params = {platform: 'pc', type: 'game', 'sort-by': 'date'};
            } else if (filterValueType != undefined) {
              // check which dropdown got changed
              switch(filterValueType[1]) {
                case "Platforms: ": 
                  this.params["platform"] = filterValueType[0];
                  break;
                case "Types: ": 
                  this.params["type"] = filterValueType[0];
                  break;
                case "Sort-by: ": 
                  this.params["sort-by"] = filterValueType[0];
                  break;
              }
            }   
          (async() => {
            this.giveawayList = await this.gamerpowerAPI.getFilteredGiveaways(this.params); 
          })()       
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