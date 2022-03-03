<template>
    <div id="dropdown">
        <label for="dropdown">{{inputType}}</label>
        <select id="dropdown" v-model="selectedValue" v-on:change="onChange" >
            <option 
            v-for="(option, o) in optionArray" 
            :key="o"
            >{{ option }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        props: ['inputType', 'optionArray'],
        data() {
            return {
                selectedValue: this.optionArray[0],
            }
        },
        methods: {
            onChange() {
                var returnValue = [this.selectedValue, this.inputType];
                this.$emit('onChange', returnValue);
            }
        }
    }
</script>

<style>
    #dropdown select {
        text-align: left;
        text-transform: capitalize;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 250px;
        height: 40px;
        font-size: 20px;
    }
    #dropdown label {
        display: block;
        text-align: left;
        text-transform: capitalize;
        color: white;
        margin-top: 10px;
        margin-bottom: -15px;
        width: auto;
        height: 30px;
        font-size: 20px;
    }
</style>