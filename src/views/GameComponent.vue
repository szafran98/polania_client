<template>
    <div class="">
        <!--
        <div id="dev-logger" style="right: 20%; position: absolute">

        </div>
        -->
        <div id="scena" class="">
            <Chat v-if="gameInstance" v-bind:game-instance="gameInstance" class="" />
            <div class="canvas-div" @drop.prevent="drop" @dragover.prevent="">
                <TradeComponent v-if="isPlayerTrading" v-on:tradeAborted="isPlayerTrading = false"/>
                <TradeRequest v-if="isPendingTradeRequest" v-bind:secondsToAutomaticDenyTradeRequest="secondsToAutomaticDenyTradeRequest" v-on:stopTradeRequestTimer="stopTradeRequestTimer"/>
                <Conversation v-if="isPlayerDoingConversation" v-on:exitConversation="isPlayerDoingConversation = false" v-on:tradeWithNpc="showVendorWindow = true"/>
                <Vendor v-if="showVendorWindow" v-on:closeVendorWindow="showVendorWindow = false"/>
                <FightBar v-show="showFightBar"/>
                <CombatTimer v-if="showFightBar"/>
                <canvas id="ctx" width="544" height="544" style=""></canvas>
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
    import FightBar from "@/components/FightBar.vue";
    import CombatTimer from '@/components/CombatTimer.vue'
    import { serverIp } from "@/assets/js";

    // @ts-ignore
    export const playerSocket: SocketIO.Socket = io(`http://165.22.18.233/`)
    //export const playerSocket: SocketIO.Socket = io(`http://localhost:2000/`)
    //export let game: any

    @Component({
        components: {
            RightGameColumn,
            Chat,
            TradeComponent,
            TradeRequest,
            Conversation,
            Vendor,
            FightBar,
            CombatTimer
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
        showFightBar = false

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

            playerSocket.on('beginCombat', () => {
                this.showFightBar = true
            })

            playerSocket.on('combatEnded', () => {
                this.showFightBar = false
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
        height: 544px;
        display: flex;

        .canvas-div {
            border-top: 2px double white;
            border-bottom: 2px double white;
            display: flex; flex-direction: column; justify-content: space-between;
        }


        #ui {
            width: 544px;
            text-align: center;
            position: relative;
            bottom: 85px;
        }
    }
    #ctx { z-index: 3; width: 544px; height: 544px;}
</style>