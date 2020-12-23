<template>
    <div class="">
        <!--
        <div id="dev-logger" style="right: 20%; position: absolute">

        </div>
        -->
        <div id="scena" class="">
            <Chat v-if="gameInstance" v-bind:game-instance="gameInstance" class="" />
            <div class="canvas-div" @drop.prevent="drop" @dragover.prevent="" style="display: flex; flex-direction: column; justify-content: space-between">
                <TradeComponent v-if="isPlayerTrading" v-on:tradeAborted="isPlayerTrading = false"/>
                <TradeRequest v-if="isPendingTradeRequest" v-bind:secondsToAutomaticDenyTradeRequest="secondsToAutomaticDenyTradeRequest" v-on:stopTradeRequestTimer="stopTradeRequestTimer"/>
                <Conversation v-if="isPlayerDoingConversation" v-on:exitConversation="isPlayerDoingConversation = false" v-on:tradeWithNpc="showVendorWindow = true"/>
                <Vendor v-if="showVendorWindow" v-on:closeVendorWindow="showVendorWindow = false"/>
                <div id="ui" class="" style="z-index: -1; height: 150px; position: absolute">
                    <input id="attack-btn" style="    bottom: 125px;
    position: absolute;
    right: 50px;" type="button" value="Atak">
                    <input id="move-btn" style="    bottom: 75px;
    position: absolute;
    right: 50px;" type="button" value="Krok">
                    <input id="exitBtn" style="    bottom: 25px;
    position: absolute;
    right: 50px;" type="button" value="Koniec">
                    <div id="fight-log" style="width: 400px; height: 150px; overflow-y: scroll">

                    </div>
                </div>
                <div id="combat-timer" class="is-size-2" style="position: absolute; width: 544px; color: black; font-weight: bold"></div>
                <canvas id="ctx" width="544" height="544" style="border: 1px solid black"></canvas>
            </div>
            <RightGameColumn v-if="gameInstance" v-bind:gameInstance="gameInstance" />
        </div>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    import { Getter } from 'vuex-class';
    import TokenDataService from '@/services/TokenDataService';
    import { game } from '@/assets/js';
    import Game from '@/assets/js/core/Game';
    import Trade from '@/assets/js/core/characters/Trade';
    import { startGameMain } from '@/assets/js';
    import Chat from '@/components/Chat.vue';
    import RightGameColumn from '@/components/RightGameColumn.vue';
    import TradeComponent from '@/components/TradeComponent.vue';
    import TradeRequest from '@/components/TradeRequest.vue';
    import { Watch } from 'vue-property-decorator';
    import Player from '@/assets/js/core/characters/Player';
    import Conversation from "@/components/Conversation.vue";
    import Vendor from "@/components/Vendor.vue";
    import { serverIp } from "@/assets/js";

    // @ts-ignore
    export const playerSocket: SocketIO.Socket = io(`http://165.22.18.233/`)
    //export let game: any

    @Component({
        components: {
            RightGameColumn,
            Chat,
            TradeComponent,
            TradeRequest,
            Conversation,
            Vendor
        }
    })
    export default class GameComponent extends Vue{
        @Getter('Root/character') character: any


        gameInstance: Game | null = null

        isPendingTradeRequest = false
        secondsToAutomaticDenyTradeRequest = 0
        tradeRequestTimer: any = null

        isPlayerTrading = false
        isPlayerDoingConversation = false

        showVendorWindow = false

        @Watch('isPendingTradeRequest')
        test(value: any, oldValue: any) {
            //console.log(value, oldValue)
            if (value && !oldValue) {
                this.secondsToAutomaticDenyTradeRequest = 10
                this.tradeRequestTimer = setInterval(() => {
                    this.secondsToAutomaticDenyTradeRequest--

                    if (this.secondsToAutomaticDenyTradeRequest === 0) {
                        this.isPendingTradeRequest = false
                    }
                }, 1000)
            }
        }



        get dressedItems() {
            return game.player.statistics.equipment
        }

        get isPlayerTalkWithNpc() {
            let value
            try {
                value = game.isPlayerDoingConversation
            } finally {
                if (typeof value !== "undefined") {
                    return value
                } else {
                    return false
                }
            }
        }

        created () {

        }

        activated () {
            //playerSocket.connect()
            //console.log('activated')
        }

        deactivated () {
            console.log('deactivated')
        }

        mounted () {
            playerSocket.on('initializeTrade', (tradeData: any) => {
                let player1Instance = <Player>game.playersList.find(playerInstance => playerInstance.id === tradeData.player1.instance.id)
                let player2Instance = <Player>game.playersList.find(playerInstance => playerInstance.id === tradeData.player2.instance.id)
                game.currentTrade = new Trade(tradeData.id, player1Instance, player2Instance)
                this.isPlayerTrading = true
            })

            playerSocket.on('askPlayerForTrade', () => {
                this.isPendingTradeRequest = true
            })

            playerSocket.on('tradeCompleted', () => {
                this.isPlayerTrading = false
            })


            playerSocket.emit('loginOnCharacter', {
                character: this.character,
                token: TokenDataService.getAccessToken()
            })
            startGameMain().then(() => {
                this.gameInstance = game
                game.draw.setStartingCameraMargin();
            })

        }

        stopTradeRequestTimer() {
            clearInterval(this.tradeRequestTimer)
            this.tradeRequestTimer = null
            this.isPendingTradeRequest = false
            console.log(this.tradeRequestTimer)
        }

        drop(event: any) {
            let image = event.dataTransfer.getData("image")
            let imageParent = event.dataTransfer.getData("imageParent")


            console.log('drop in ctx')
            console.log(event.target.id)

            if (image.length === 0 || imageParent.length === 0 || !event.target.id.includes('ctx')) {
                //this.isItemDragging = false
                //this.setItemDragging(false)
                return
            }

            for(let item in this.dressedItems) {
                if (this.dressedItems[item] === null || !Array.isArray(this.dressedItems[item])) continue

                for (let itemInBackpack in this.dressedItems[item]) {
                    if (this.dressedItems[item][itemInBackpack].fieldInEquipment === imageParent) {


                        document.getElementById(this.dressedItems[item][itemInBackpack].fieldInEquipment)!.removeChild(document.getElementById(this.dressedItems[item][itemInBackpack].fieldInEquipment)!.childNodes[0])

                        game.socket.emit('dragItem', {
                            actualField: this.dressedItems[item][itemInBackpack].fieldInEquipment,
                            destinationField: event.target.id,
                            item: this.dressedItems[item][itemInBackpack]
                        })
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #scena {
        //width: 544px;
        height: 544px;
        //position: relative;
        //border: 2px solid black;
        display: flex;

        .canvas-div {
            //height: 544px;
        }


        #ui {
            width: 544px;
            text-align: center;
            position: relative;
            bottom: 23vh;
            //left: 50%;
            //display: inline-block;
            //transform: translateX(-50%);
        }
    }
    #ctx { z-index: 3; width: 544px; height: 544px;}
</style>