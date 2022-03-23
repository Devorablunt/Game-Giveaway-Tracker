import axios from 'axios';

const giveawayInfoUrl = 'https://gamerpower.p.rapidapi.com/api/worth';
const allGiveawaysUrl = 'https://gamerpower.p.rapidapi.com/api/giveaways';
// Rapid-API config to prevent CORS-error
const headers = {
  'x-rapidapi-host': 'gamerpower.p.rapidapi.com',
  'x-rapidapi-key': '8aee3b2d36msh0e8d86c1f843a6ep1705dejsncad8c62ee314'
};

export const gamerpowerAPI = {
  getGiveawayInfo: async () => {
    let options = {
      method: 'GET',
      url: giveawayInfoUrl,
      headers: headers
    }
    try {
      let response = await axios.request(options);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
  
  getAllGiveaways: async () => {
    let options = {
      method: 'GET',
      url: allGiveawaysUrl,
      headers: headers
    }
    try {
      let response = await axios.request(options);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
  
  getFilteredGiveaways: async (filterParams) => {
    let options = {
      method: 'GET',
      url: allGiveawaysUrl,
      params: filterParams,
      headers: headers
    }
    try {
      let response = await axios.request(options);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
}