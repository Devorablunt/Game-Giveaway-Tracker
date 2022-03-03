<template>
    <div v-if="trigger" class="popup">
        <div class="popup-content">
            <span id="close-icon" @click="closePopUp">&times;</span>
            <h1>{{title}}</h1>
            <p>{{msg}}</p>
            <a :href="link"></a>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["trigger", "title", "msg", "link"],
        data() {
            return {
                isVisible: true,
            };
        },
        methods: {
            closePopUp() {
                this.isVisible = false;
            }
        },
    }
</script>

<style>
    .popup-content {
        color: black;
        margin: 10px;
    }
    .popup {
        position: fixed; 
        z-index: 9999; 
        right: 0;
        top:20;
        width: 40%; 
        height: 20%; 
        overflow: auto;
        background: hsl(0 0% 0% / 0.8);
        backdrop-filter: blur(0.2rem);
        /* transform: translateX(100%);
        transition: transform 350ms ease-out; */
    }
    /* .popup[v-if = false] {
        transform: translateX(0%);
    } */
    #close-icon {
        cursor: pointer;
        margin-top: -3%;
        color: black;
        float: right;
        font-size: 35px;
        font-weight: bold;
    }
</style>