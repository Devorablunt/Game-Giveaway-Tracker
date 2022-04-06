//mocking the axios Module 
import axios from 'axios';
import gamerpowerAPI from '../services/gamerpowerAPI';
jest.mock('axios');


test("Call gamerpowerAPI all giveaways", () => {

    //erzeugen der Asynchronität für den API-Call
    async () => {

    //Aufruf der API
    axios.get(gamerpowerAPI.getAllGiveaways());
    
    //Überprüfung ob die API gecallt wurde
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith('https://gamerpower.p.rapidapi.com/api/giveaways');
    }
});

test("Call gamerpowerAPI giveaway info", () => {

    //erzeugen der Asynchronität für den API-Call
    async () => {

    //Aufruf der API
    axios.get(gamerpowerAPI.getGiveawayInfo());
    
    //Überprüfung ob die API gecallt wurde
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith('https://gamerpower.p.rapidapi.com/api/worth');
    }
});

test("Call gamerpowerAPI filtered giveaways", () => {

    //erzeugen der Asynchronität für den API-Call
    async () => {

    //Aufruf der API
    axios.get(gamerpowerAPI.getFilteredGiveaways());
    
    //Überprüfung ob die API gecallt wurde
    expect(axios.get).toHaveBeenCalled();
    }
});