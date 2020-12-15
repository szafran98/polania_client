<template>
    <div id="trade-request-container">
        <div class="card" style="display: grid; padding: 20px; margin: auto; width: fit-content;">
            <span>{{requestByPlayerName}} chce się z tobą wymienić.</span>
            <div style="display: flex; width: max-content; margin: auto">
                <input type="button" class="button" value="Akceptuj" style="width: fit-content; margin: 20px" @click="acceptTrade">
                <input type="button" class="button" value="Odrzuć" style="width: fit-content; margin: 20px">
            </div>
            <span>{{secondsToAutomaticDenyTradeRequest}}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { game } from '@/assets/js';
    import { Emit, Prop, Watch } from 'vue-property-decorator';

    @Component
    export default class TradeRequest extends Vue {

        @Prop() secondsToAutomaticDenyTradeRequest: any

        @Emit('stopTradeRequestTimer')
        stopTradeRequestTimer() {
            return true
        }

        get requestByPlayerName() {
            return game.pendingTradeRequest.requestPlayerName
        }



        mounted() {

        }

        acceptTrade() {
            this.stopTradeRequestTimer()
            game.socket.emit('tradeRequestAccepted')
        }
    }
</script>

<style lang="scss" scoped>
    #trade-request-container {
        position: absolute;
        margin: auto;
        width: 544px;
    }
</style>