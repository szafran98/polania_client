<template>
    <div id="combat-timer-container">
        <div id="combat-timer" class="is-size-2 box"></div>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'

    @Component
    export default class CombatTimer extends Vue {


    }
</script>

<style lang="scss" scoped>
    #combat-timer-container {
        position: absolute;
        width: 544px;
        z-index: 10;

        #combat-timer {
            color: black;
            font-weight: bold;
            z-index: 10;
            background: #52231a;
        }
    }
</style>