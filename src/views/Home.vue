<template>
  <div class="home-wrapper">
    <div class="filter">
      <div class="home-text">
        <h1>Welcome!</h1>
        <p class="home-text-item">..safe up to <span class="highlight-text">{{giveawayData.worth_estimation_usd}}$</span> with</p>
        <p id="button-margin" class="home-text-item"><span class="highlight-text">{{giveawayData.active_giveaways_number}} </span> active giveaways...</p>
        <a class="home-button-item" href="#/giveaways" type="button">Explore Giveaways</a>
      </div>
    </div>
  </div>
</template>

<script>
  import GiveawayCard from '../components/GiveawayCard.vue'
  import SlidePopUp from '../components/SlidePopUp.vue'
  export default {
    data() {
        return {
          giveawayData: [],
        };
    },
    created() {
      (async() => {
        this.giveawayData = await this.gamerpowerAPI.getGiveawayInfo(); 
      })()
    },
    methods: {
    },
    components: { GiveawayCard, SlidePopUp }
}
</script>

<style>
  #button-margin {
    margin-bottom: 0;
  }
  .home-wrapper {
    background: url("../assets/carl-raw-m3hn2Kn5Bns-unsplash.jpg") no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    padding: 0;
    margin: 0;
    overflow: hidden;
    height: 87vh;
  }
  .home-wrapper img{
    width: 100%;
    height: auto;
  }
  .filter {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    background: hsl(0 0% 0% / 0.6);
    backdrop-filter: blur(0.2rem);
  } 
  .home-text {
    flex: 0 1 40px;
    cursor: default;
    margin-top: 12%;
    margin-left: 15%;
    font-size: 50px;
    text-align: left;
    color: white;
  }
  .home-text-item {
    margin-top: -3.5%;
  }
  .highlight-text {
    font-size: 65px;
    font-weight: bold;
    color: rgba(252,70,107,1);
  }

  .home-button-item {
    text-decoration: none;
    border: 0;
    font-size: 25px;
    padding: 10px 40px 10px 40px;
    color: white;
    background-color: #003459;
    border-radius: 25px;
  }
  .home-button-item:hover {
    background-color: #007EA7;
  }
  @media (max-width: 50em) {
    .home-text {
      font-size: 25px;
    }
    .highlight-text {
      font-size: 40px;
    }
    .home-button-item {
      font-size: 20px;
    }
  }
</style>