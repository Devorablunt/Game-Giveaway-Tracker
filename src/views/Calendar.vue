<template>
  <div class="calendar-wrapper">
    <div class="calendar-dropdown">
      <Dropdown inputType="Calendars" :optionArray="this.calendars" @onChange="createCalendarSRC($event)"/>
    </div>
    <iframe id="GoogleCalendar" :src="calendarSRC" style="border: 0" width="80%" height="600" frameborder="0" scrolling="no"></iframe>
  </div>
</template>

<script>
  import Dropdown from '../components/Dropdown.vue'
  export default {
    name: 'Calendar',
    components: {
      Dropdown
    },
    data() {
      return {
        selectedCalendarID: null,
        calendars: [""],  // only calendar titles(summary)
        calendarList: [], // result from API get call
        calendarSRC: "", // dynamic iframe src
        primaryCalendar: "",
      }
    },
    created() {
      this.getData();
    },
    methods: {
      async getData() {
        try {
          // get current gapi client
          var gapi = await this.$gapi.getGapiClient();
        } catch (e) {
          console.error(e)
        }
        try {
            // get all calendars
            let response1 = await gapi.client.calendar.calendarList.list({'minAccessRole': 'owner'}); // 'minAccessRole': 'owner' = only owned calenders with insert event rights
            this.calendarList = response1.result.items;
            console.log(this.calendarList);
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
        this.createCalendarSRC(this.calendars);
      },
      // create dynamic iframe src
      createCalendarSRC(dropdownOutput) {
        // find calendar by selected title(summary)
        var result = this.calendarList.filter((calendar) => {
          return calendar.summary == dropdownOutput[0];
        });
        // format calendarID to URI
        var encodedID = encodeURIComponent(result[0].id);
        // format timeZone to URi
        var encodedTimeZone = encodeURIComponent(result[0].timeZone)
        this.calendarSRC = "https://calendar.google.com/calendar/embed?src=" + encodedID + "&ctz=" + encodedTimeZone
      },
    },
  }  
</script>

<style>
  .calendar-wrapper {
    display: flex;
    flex-direction: column;
  }

  .calendar-dropdown {
    display: flex;
    align-self: center;
  }

  #GoogleCalendar {
    margin-top: 20px;
    display: flex;
    /* margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 80%; */
    align-self: center;
    box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.3), 0 7px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>