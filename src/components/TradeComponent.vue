<template>
    <div id="trade-container" style="">
        <div class="card" style="margin: auto; width: fit-content; padding: 2rem">
            <div class="columns" style="">
                <i class="fas fa-times-circle fa-2x" style="position: absolute; right: -5%; top: -5%; z-index: 10"></i>
                <div id="player1-column" class="column card-content">
                    <span style="margin: auto">{{tradeInstance.player1.instance.name}}</span>
                    <div id="player1-trade-field" class="col" style="margin: 30px" @drop.prevent="drop" @dragover.prevent="">
                        <img :src="player1ItemImageSrc" alt="">
                    </div>
                    <input type="button" class="button" value="Akceptuj" :disabled="tradeInstance.player1.instance.id !== gameInstance.player.id || tradeInstance.player1.isOfferAccepted" @click="acceptTradeOffer">
                </div>
                <div id="player2-column" class="column card-content">
                    <span style="margin: auto">{{tradeInstance.player2.instance.name}}</span>
                    <div id="player2-trade-field" class="col" style="margin: 30px" @drop.prevent="drop" @dragover.prevent="">
                        <img :src="player2ItemImageSrc" alt="">
                    </div>
                    <input type="button" class="button" value="Akceptuj" :disabled="tradeInstance.player2.instance.id !== gameInstance.player.id || tradeInstance.player2.isOfferAccepted" @click="acceptTradeOffer">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { Equipment } from '@/assets/js/core/characters/Equipment';
    import { game } from '@/assets/js';
    import { Getter, Mutation } from 'vuex-class';
    import { Watch } from 'vue-property-decorator';

    @Component
    export default class Trade extends Vue {

        @Getter('Root/itemDragging') itemDragging: any
        @Mutation('Root/setItemDragging') setItemDragging: any

        get gameInstance() {
            return game
        }


        get dressedItems(): Equipment {
            return game.player.statistics.equipment
        }

        get tradeInstance() {
            return game.currentTrade
        }

        get player1ItemImageSrc() {
            //if (this.tradeInstance!.player1.offer!.itemData.imageSrc) {

            try {
                return `http://localhost:8080/img/${this.tradeInstance!.player1.offer!.itemData.imageSrc}`
            } catch (e) {
                return ''
            }

            //}
        }

        get player2ItemImageSrc() {
            try {
                return `http://localhost:8080/img/${this.tradeInstance!.player2.offer!.itemData.imageSrc}`
            } catch (e) {
                return ''
            }
        }

        /*
        @Watch('tradeInstance')
        tradeInstanceChange(val: any, oldVal: any) {
            console.log(val, oldVal)
        }
        */

        mounted() {
            //setInterval(() => {
            //    console.log(this.tradeInstance)
            //})
        }

        acceptTradeOffer() {
            this.tradeInstance?.acceptTradeOffer()
        }

        drag(event: any) {
            //this.isItemDragging = true
            this.setItemDragging(true)
            try {
                document.getElementById(event.target.id)!.removeChild(document.getElementById('item-hint')!)
            } finally {
                event.dataTransfer.setData("image", event.target.id)
                event.dataTransfer.setData("imageParent", event.target.parentElement.id)
            }
        }

        drop(event:any) {

            let image = event.dataTransfer.getData("image")
            let imageParent = event.dataTransfer.getData("imageParent")
            //let isFieldAllowed = true

            console.log('drop in trade field')
            console.log(image)
            console.log(imageParent)
            console.log(event.target)

            if (image.length === 0 || imageParent.length === 0) {
                //this.isItemDragging = false
                this.setItemDragging(false)
                return
            }

            let isFieldEmpty = event.target.childNodes.length === 0


            if (this.tradeInstance?.player1.instance.id === this.gameInstance.player.id && event.target.id.includes('player1')) {


                for(let item in this.dressedItems) {
                    if (this.dressedItems[item] === null || !Array.isArray(this.dressedItems[item])) continue

                    for (let itemInBackpack in this.dressedItems[item]) {
                        if (this.dressedItems[item][itemInBackpack].fieldInEquipment === imageParent) {


                            document.getElementById(this.dressedItems[item][itemInBackpack].fieldInEquipment)!.removeChild(document.getElementById(this.dressedItems[item][itemInBackpack].fieldInEquipment)!.childNodes[0])

                            game.socket.emit('setOfferedItemInTrade', this.dressedItems[item][itemInBackpack])
                        }
                    }
                }
            } else if (this.tradeInstance?.player2.instance.id === this.gameInstance.player.id && event.target.id.includes('player2')) {
                for (let item in this.dressedItems) {
                    if (this.dressedItems[item] === null || !Array.isArray(this.dressedItems[item])) continue

                    for (let itemInBackpack in this.dressedItems[item]) {
                        if (this.dressedItems[item][itemInBackpack].fieldInEquipment === imageParent) {


                            document.getElementById(this.dressedItems[item][itemInBackpack].fieldInEquipment)!.removeChild(document.getElementById(this.dressedItems[item][itemInBackpack].fieldInEquipment)!.childNodes[0])

                            game.socket.emit('setOfferedItemInTrade', this.dressedItems[item][itemInBackpack])
                        }
                    }
                }
            }



            if (isFieldEmpty) {
                //console.log(event.target)
                //console.log(image)
                //event.target.appendChild(document.getElementById(image))
            }
            //this.isItemDragging = false
            setTimeout(() => {
                this.setItemDragging(false)
            }, 200)

        }

    }
</script>

<style lang="scss" scoped>
    #trade-container {
        position: absolute;
        margin: auto;
        width: 544px;
    }
</style>