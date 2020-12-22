<template>
    <div id="qeuipment-container" class="box" style="margin-top: 20px; background: #52231a; color: white">
        <div id="eq-row-1" class="row is-flex is-align-content-center">
            <div id="helmet" class="col" @drop.prevent="drop" @dragover.prevent="" style="margin: auto;">

            </div>
        </div>

        <div id="eq-row-2" class="row is-flex" style="width: 64px; margin: auto">
            <div id="amulet" class="col" style="margin: auto;" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="gloves" class="col" style="margin: auto;" @drop.prevent="drop" @dragover.prevent="">

            </div>
        </div>
        <div id="eq-row-3" class="row is-flex" style="width: 96px; margin: auto">
            <div id="weapon" class="col" style="margin: auto;" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="armor" class="col" style="margin: auto;" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="ring" class="col" style="margin: auto;" @drop.prevent="drop" @dragover.prevent="">

            </div>
        </div>
        <div id="eq-row-4" class="row is-flex" style="margin: auto;">
            <div id="boots" class="col" style="margin: auto;" @drop.prevent="drop" @dragover.prevent="">

            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';
    import Item from '@/assets/js/core/Item';
    import { showEquipment } from '@/assets/js/ui/interfaceManipulation';
    import { Getter, Mutation } from 'vuex-class';
    import { IOwnedItem } from '../../../Interfaces';
    import { game } from '@/assets/js';

    @Component
    export default class Equipment extends Vue{
        //@Prop() dressedItems!: IOwnedItem[]

        @Getter('Root/items') items: any
        @Getter('Root/itemDragging') itemDragging: any
        @Mutation('Root/storeItems') storeItems: any
        @Mutation('Root/changeItemField') changeItemField: any
        @Mutation('Root/setItemDragging') setItemDragging: any

        //dressedItemsRepresentation: any[] = []
        //dressedItems = game.player.statistics.equipment

        //isItemDragging = false

        get dressedItems() {
            return game.player.statistics.equipment
        }

        created () {
            this.$root.$refs.A = this
        }

        mounted () {
            //this.storeItems(this.dressedItems)
            //console.log(this.dressedItems)

            setTimeout(() => {
                let itemsAndPositions = []
                for (let i in this.dressedItems) {
                    if (this.dressedItems[i] === null || Array.isArray(this.dressedItems[i])) continue
                    //console.log(this.dressedItems[i])

                    if (this.dressedItems[i].itemData.imageSrc && document.getElementById(<string>this.dressedItems[i].fieldInEquipment)!.childNodes.length === 0) {
                        //console.log(this.dressedItems[i].imageSrc)
                        let itemImage = new Image()
                        itemImage.src = `http://localhost:8080/img/${this.dressedItems[i].itemData.imageSrc}`
                        itemImage.draggable = true
                        itemImage.setAttribute('id', `item${i}`)
                        itemImage.addEventListener('dragstart', (event) => this.drag(event), false)
                        document.getElementById(<string>this.dressedItems[i].fieldInEquipment)!.appendChild(itemImage)
                        itemsAndPositions.push(this.dressedItems[i])
                        //console.log(this.backpack)
                    }
                }

                this.fieldsMouseEnterListeners()
            }, 500)
        }

        fieldsMouseEnterListeners () {
            let backpackFields = document.getElementsByClassName('col')
            //console.log(backpackFields)
            for (let i = 0; i < backpackFields.length; i++) {
                let backpackField = backpackFields[i]

                backpackField.addEventListener('mouseenter', (event) => {
                    //console.log(this.isItemDragging)

                    /*
                    try {
                        document.getElementById(event.target.id)!.removeChild(document.getElementById('item-hint')!)
                    } catch (e) {

                    }
                    */

                    for (let item in this.dressedItems) {
                        if (item === 'backpack' || this.dressedItems[item] === null) continue
                       // console.log(this.dressedItems)
                        if (this.dressedItems[item].fieldInEquipment === backpackField.id) {
                            if (!this.itemDragging) {
                                showEquipment(this.dressedItems[item]);
                            }
                        }
                    }
                })
            }
        }

        drag(event: any) {
            //this.isItemDragging = true
            this.setItemDragging(true)
            try {
                //document.getElementById(event.target.id)!.removeChild(document.getElementById('item-hint')!)
            } finally {
                event.dataTransfer.setData("image", event.target.id)
                event.dataTransfer.setData("imageParent", event.target.parentElement.id)
            }
            //this.isItemDragging = false
        }

        drop(event:any) {
            let image = event.dataTransfer.getData("image")
            let imageParent = event.dataTransfer.getData("imageParent")
            let isFieldAllowed = false

            console.log('drop in equipment')


            if (image.length === 0 || imageParent.length === 0) {
                //this.isItemDragging = false
                this.setItemDragging(false)
                return
            }

            let isFieldEmpty = event.target.childNodes.length === 0

            for (let item in this.dressedItems) {

                if (this.dressedItems[item] === null || !Array.isArray(this.dressedItems[item])) continue

                // PRZENIESIENIE Z PLECAKA DO EKWIPUNKU
                if (imageParent.includes('field') && isFieldEmpty) {
                    for (let itemInBackpack in this.dressedItems[item]) {

                        console.log(this.dressedItems[item])
                        // @ts-ignore
                        if (event.target.id.includes(this.dressedItems[item][itemInBackpack].itemData.type)) {

                            if (event.target.id === this.dressedItems[item][itemInBackpack].itemData.type) {
                                isFieldAllowed = true
                            }
                            // @ts-ignore
                            game.socket.emit('dragItem', {
                                // @ts-ignore
                                actualField: this.dressedItems[item][itemInBackpack].fieldInEquipment,
                                destinationField: event.target.id,
                                // @ts-ignore
                                item: this.dressedItems[item][itemInBackpack]
                            })
                        }
                    }
                }
            }
            if (isFieldEmpty && isFieldAllowed) {
                console.log(isFieldAllowed)
                event.target.appendChild(document.getElementById(image))
            }
            //this.isItemDragging = false
            setTimeout(() => {
                this.setItemDragging(false)
            }, 200)
            //console.log(this.dressedItems)
        }
    }
</script>

<style lang="scss" scoped>

</style>