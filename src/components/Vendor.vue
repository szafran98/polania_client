<template>
    <div id="vendor-container" >
        <div id="vendor-window" class="card" style="background: #8f541f; width: 300px; height: 350px; margin: auto">
            <i class="fas fa-times-circle fa-1x" @click="closeVendorWindow" style="z-index: 5; float: right"></i>
            <div class="vendor-row is-uppercase box" style="display: inline-flex; align-items: center; background: rgb(82, 35, 26); clear: both">
                <img src="http://localhost:8080/img/potion.png" alt="" style="width: 32px; height: 32px; margin: 10px">
                <span style="margin: 10px; color: white">Cena: 100 <i class="fas fa-coins" style="color: gold"></i></span>
                <input type="button" class="button" value="Kup" style="margin: 10px">
            </div>
            <div id="vendor-buttons-container" class="card" style="position: absolute; bottom: 0; width: inherit; background: rgb(82, 35, 26); padding: 10px">
                <input type="button" class="button" value="Zakupy" style="margin-right: 5px">
                <input type="button" class="button" value="Sprzedaż" style="margin-left: 5px">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";

    @Component
    export default class Vendor extends Vue {


        closeVendorWindow() {
            this.$emit('closeVendorWindow')
        }
    }
</script>

<style scoped lang="scss">
    #vendor-container {
        position: absolute;
        z-index: 4;
        width: 544px;

        #vendor-window > i {
            &:hover {
                color: #FF625A;
                cursor: pointer;
            }
        }

        .vendor-row {
            //margin-top: 1.5rem;
        }
    }
</style>