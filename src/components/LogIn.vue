<template>
  <a id="Log-in-out" @click="login()" v-if="!isSignedIn">Login</a>
  <a id="Log-in-out" @click="logout()" v-if="isSignedIn">Logout</a>
</template>

<script>
import SlidePopUp from "./SlidePopUp.vue"
export default {
    data() {
        return {
            isSignedIn: null, // (1) Track authenticated state
        };
    },
    created() {
        // (2) Subscribe to authentication status changes
        this.$gapi.listenUserSignIn((isSignedIn) => {
            this.isSignedIn = isSignedIn;
        });
    },
    methods: {
        // (3) Expose $gapi methods
        login() {
            this.$gapi.login().then(({ currentUser, gapi, hasGrantedScopes }) => {
                // console.log({ currentUser, gapi, hasGrantedScopes });
            });
        },
        logout() {
            this.$gapi.logout();
        },
    },
    computed: {
        userName() {
            // (4) Display authenticated user name
            const user = this.$gapi.getUserData();
            if (user) {
                return user.firstName + " " + user.lastName;
            }
        },
    },
    components: { SlidePopUp }
}  
</script>

<style>
  #Log-in-out {
    background-color: #003459;
    padding: 7px 25px 7px 25px;
    border-radius: 25px;
  }
  #Log-in-out:hover {
    background-color: #007EA7;
    cursor: pointer;
  }
</style>