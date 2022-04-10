//mocking the axios Module 
import axios from 'axios';
import {gamerpowerAPI} from '../services/gamerpowerAPI';
jest.mock('axios');

test("Call gamerpowerAPI all giveaways", () => {

    //erzeugen der Asynchronität für den API-Call
    async () => {

        //Überprüfung ob die API gecallt wurde
        expect(gamerpowerAPI.getAllGiveaways()).toHaveBeenCalled();

        //Überprüfung ob die API richtig gecallt wurde
        expect(gamerpowerAPI.getAllGiveaways()).toHaveBeenCalledWith('https://gamerpower.p.rapidapi.com/api/giveaways');
    }
});

test("Call gamerpowerAPI giveaway info", () => {

    //erzeugen der Asynchronität für den API-Call
    async () => {

        //Überprüfung ob die API gecallt wurde
        expect(gamerpowerAPI.getGiveawayInfo()).toHaveBeenCalled();

        //Überprüfung ob die API richtig gecallt wurde
        expect(gamerpowerAPI.getGiveawayInfo()).toHaveBeenCalledWith('https://gamerpower.p.rapidapi.com/api/worth');
    }
});

test("Call gamerpowerAPI filtered giveaways", () => {

    //erzeugen der Asynchronität für den API-Call
    async () => {

        //Überprüfung ob die API gecallt wurde
        expect(gamerpowerAPI.getFilteredGiveaways()).toHaveBeenCalled();
    }
});