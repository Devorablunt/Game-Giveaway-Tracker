<template>
    <div id="parent" v-if="giveawayList && giveawayList.length">
        <div id="card-container" v-for="giveaway of giveawayList">
            <a :href="giveaway.open_giveaway_url" target="_blank" rel="noopener noreferrer"><img h id="thumbnail-item" :src="giveaway.thumbnail"></a>
            <p id="platform-item">{{giveaway.platforms}}</p> 
            <h2 id="title-item">{{giveaway.title}}</h2>
            <p id="date-item">{{formatDates(giveaway.published_date, giveaway.end_date)}}</p>
            <p id="desc-item">{{giveaway.description}}</p>
            <!-- <p>{{giveaway.instructions}}</p> -->
            <div id="bottom-wrapper">
                <p id="worth-item">{{giveaway.worth}}</p>
                <p id="type-item">{{giveaway.type}}</p>
            </div>
            <button id="button-item" v-on:click="createEvent(giveaway.title, giveaway.description, giveaway.published_date, giveaway.end_date)" type="button">ADD TO CALENDAR</button>
        </div>

        <!-- The Modal -->
        <div class="modal" v-if="showPopUp" >

            <!-- Modal content -->
            <div class="modal-content" >
                <h2>Select Calendar</h2>
                <span class="close" @click="closeModal">&times;</span>
                <p>Choose the calendar where the event should be created. Otherwise is your primary calendar selected by default!</p>
                <Dropdown inputType="Calendars" :optionArray="this.calendars" @onChange="getSelectedCalendarId($event)"/>
                <button class="button" @click="postCalendarEvent">CREATE EVENT</button>
            </div>

        </div>
    </div>
    <div v-else>
        <p id="giveaways-not-found">No giveaways found!</p>
    </div>
</template>

<script>
    import Dropdown from "./Dropdown.vue";
    export default {
    props: ["giveawayList"],
    data() {
        return {
            showPopUp: false, // Modal visibility
            calendars: [""],  // dropdown input only calendar titles(summary)
            calendarList: [], // result from API get call
            selectedCalendarId: "",
            event: [], // Event for post
            createdEventLink: "", // event HTML-Link from event post call
        };
    },
    created() {
      this.getData();
    },
    methods: {
        // Card Methods
        formatDates(startDate, endDate) {
            startDate = String(startDate).slice(0, 11);
            startDate = startDate.slice(8, 10) + "." + startDate.slice(5, 7) + "." + startDate.slice(0, 4);
            if (endDate != "N/A") {
                endDate = String(endDate).slice(0, 11);
                endDate = endDate.slice(8, 10) + "." + endDate.slice(5, 7) + "." + endDate.slice(0, 4);
            }
            else {
                endDate = "unkown";
            }
            return "From: " + startDate + " Until: " + endDate;
        },
        createEvent(title, description, startDate, endDate) {
            var startDateF = startDate.replace(" ", "T");
            // handle unassigned endDate
            if (endDate == "N/A") {
                var endDateF = startDateF;
            }
            else {
                var endDateF = endDate.replace(" ", "T");
            }
            this.event = {
                "summary": title,
                "description": description,
                "start": {
                    "dateTime": startDateF,
                    "timeZone": "America/Los_Angeles"
                },
                "end": {
                    "dateTime": endDateF,
                    "timeZone": "America/Los_Angeles"
                },
            };
            // make Modal visible
            this.showPopUp = true;
        },

        // Modal Methods
        closeModal() {
            this.showPopUp = false;
            this.event = [];
            this.selectedCalendarId = "";
        },
        async postCalendarEvent() {
            // if no calendar is selected insert event in primary calendar
            if(this.selectedCalendarId == "") {
                this.selectedCalendarId = "primary";
            }
            try { 
                let gapi = await this.$gapi.getGapiClient();
                let respone = await gapi.client.calendar.events.insert({
                    'calendarId': this.selectedCalendarId,
                    'resource': this.event
                });
                this.createdEventLink = respone.result.htmlLink;
            } catch (e) {
                console.error(e)
            }
            this.$emit("getEventLink", this.createdEventLink);
            this.closeModal();
        },

        // METHODS FROM Calendar.vue FIND BETTER SOLUTION!!


        async getData() {
            try {
                // get current gapi client
                var gapi = await this.$gapi.getGapiClient();
            } catch (e) {
                console.error(e)
            }
            try {
                // get all calendars
                let response1 = await gapi.client.calendar.calendarList.list({'minAccessRole': 'owner'});
                this.calendarList = response1.result.items;
                // get primary calendar
                let response2 = await gapi.client.calendar.calendars.get({'calendarId': 'primary'});
                this.primaryCalendar = response2.result.summary;
            } catch (e) {
                console.error(e)
            }
            // extract calendar titels (summary) from calendarList for dropdowninput
            this.calendars[0] = this.primaryCalendar; // primary calendar title first position
            var counter = 1;
            for(var i = 0; i <  this.calendarList.length; i++) {
                if(this.calendarList[i]["summary"] != this.primaryCalendar) {
                    this.calendars[counter] = this.calendarList[i]["summary"];
                    counter++;
                } 
            }
        },
        getSelectedCalendarId(dropdownOutput) {
            // find calendar by selected title(summary)
            var result = this.calendarList.filter((calendar) => {
                return calendar.summary == dropdownOutput[0];
            });
            this.selectedCalendarId = result[0].id;
        }
    },
    computed: {},
    components: { Dropdown }
}
</script>

<style>
    #giveaways-not-found {
        text-align: center;
        color: white;
        font-size: 30px;
    }
    /* The Modal (background) */
    .modal {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.6); /* Black w/ opacity */
    }

    /* Modal Content/Box */
    .modal-content {
        background-color: #121212;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 3px solid #888;
        width: 40%; /* Could be more or less, depending on screen size */
        display: flex;
        flex-direction: column;
    }

    .modal-content p {
        color: white;
        margin-top: -5px;
        font-size: 17px;
        width: 70%; /* Could be more or less, depending on screen size */
    }
    .modal-content h2{
        margin-top: -5px;
        color: white;
        font-size: 20px;
        width: 70%; /* Could be more or less, depending on screen size */
    }
    /* The Close Button */
    .close {
        color: #aaa;
        align-self: flex-end;
        font-size: 28px;
        font-weight: bold;
        margin-top: -50px;
    }

    .close:hover,
    .close:focus {
        color: white;
        text-decoration: none;
        cursor: pointer;
    }

    /* 
    Raisin Black = #2C2C34 
    Dark Liver = #494850
    Turquoise Green = #A9D8B8
    Cambridge Blue = #A7C4B5
    Cadet Grey = #9AA0A8
    */
    #parent {
        display: grid;
        /* height: 100vh; */
        grid-gap: 3rem;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        padding: 50px;
        overflow: hidden;       
    }

    #card-container {
        display: grid;
        background: #181818;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.5), 0 8px 20px 0 rgba(0, 0, 0, 0.19);
        transition: transform .2s; /* Animation */
    }
    #card-container a {
        cursor: cell;
    }
    #card-container:hover {
        transform: scale(1.06); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
    }

    #thumbnail-item {
        width: 100%;
        height: 250px; 
        object-fit: cover;
    }

    #title-item {
        margin-left: 20px;
        margin-bottom: -15px;
        color: white;
    }

    #date-item {
        margin-left: 20px;
        margin-bottom: -3px;
        color: white;
    }

    #desc-item {
        margin-left: 20px;
        margin-bottom: -5px;
        font-size: 19px;
        color: white;
    }

    #bottom-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    #platform-item {
        margin-left: 20px;
        color: gainsboro;
        margin-bottom: -20px;
        margin-left: auto;
        margin-right: 20px;
    }

    #bottom-wrapper {
        color: gainsboro;
        margin-bottom: -10px;
    }

    #button-item {
        height: 40px;
        margin-top: auto;
        font-weight: bold;
        color: white;
        background-color: #003459;
        border: 0;
    }

    #button-item:hover {
        background-color: #007EA7;
    }
</style>