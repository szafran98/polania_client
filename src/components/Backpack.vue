<template>
    <div id="backpack-container">
        <div id="row1" class="row is-flex">
            <div id="field1" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field2" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field3" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field4" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field5" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field6" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field7" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
        </div>
        <div id="row2" class="is-flex">
            <div id="field8" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field9" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field10" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field11" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field12" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field13" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field14" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
        </div>
        <div id="row3" class="is-flex">
            <div id="field15" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field16" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field17" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field18" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field19" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field20" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field21" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
        </div>
        <div id="row4" class="is-flex">
            <div id="field22" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field23" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field24" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field25" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field26" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field27" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field28" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
        </div>
        <div id="row5" class="is-flex">
            <div id="field29" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field30" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field31" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field32" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field33" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field34" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field35" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
        </div>
        <div id="row6" class="is-flex">
            <div id="field36" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field37" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field38" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field39" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field40" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field41" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
            <div id="field42" class="col" @drop.prevent="drop" @dragover.prevent="">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { Getter, Mutation } from 'vuex-class';
    import { IOwnedItem } from '../../../Interfaces';
    import { game } from '@/assets/js';
    import { Prop, Watch } from 'vue-property-decorator';
    import { showEquipment } from '@/assets/js/ui/interfaceManipulation';
    import { Equipment } from '@/assets/js/core/characters/Equipment';

    @Component
    export default class Backpack extends Vue {

        @Getter('Root/items') items: any
        @Getter('Root/itemDragging') itemDragging: any
        @Mutation('Root/storeItems') storeItems: any
        @Mutation('Root/changeItemField') changeItemField: any
        @Mutation('Root/setItemDragging') setItemDragging: any


        get dressedItems(): Equipment {
            return game.player.statistics.equipment
        }

        mounted () {
            game.socket.on('pickedUpItem', (item: any) => {
                console.log('pickedUpItem')
                this.createAndAppendItemImageToBackpack(item)
                this.setItemDragging(false)
            })

            game.socket.on('tradeCompleted', () => {
                this.putItemsInBackpack()
            })


            setTimeout(() => {
                console.log(this.dressedItems)
                console.log('dressed items ^^^^^^')

                this.putItemsInBackpack()

                /*
                let itemsAndPositions = []
                for (let i in this.dressedItems) {
                    if (this.dressedItems[i] === null || !Array.isArray(this.dressedItems[i])) continue
                    //console.log(this.dressedItems[i])

                    for (let item in this.dressedItems[i]) {
                        //console.log(this.dressedItems[i][item])

                        if (this.dressedItems[i][item].itemData.imageSrc) {
                            //console.log(this.dressedItems[i][item])

                            this.createAndAppendItemImageToBackpack(this.dressedItems[i][item])

                            itemsAndPositions.push(this.dressedItems[i][item])
                            //console.log(this.backpack)
                        }
                    }

                }
                this.storeItems(itemsAndPositions)

                 */


                this.fieldsMouseEnterListeners()
            }, 501)
        }

        putItemsInBackpack() {
            let itemsAndPositions = []
            for (let i in this.dressedItems) {
                if (this.dressedItems[i] === null || !Array.isArray(this.dressedItems[i])) continue
                //console.log(this.dressedItems[i])

                for (let item in this.dressedItems[i]) {
                    //console.log(this.dressedItems[i][item])

                    if (this.dressedItems[i][item].itemData.imageSrc) {
                        //console.log(this.dressedItems[i][item])

                        this.createAndAppendItemImageToBackpack(this.dressedItems[i][item])

                        itemsAndPositions.push(this.dressedItems[i][item])
                        //console.log(this.backpack)
                    }
                }

            }
            this.storeItems(itemsAndPositions)
        }

        createAndAppendItemImageToBackpack(item: any) {
            let itemImage = new Image()
            itemImage.src = `http://159.65.115.115/img/${item.itemData.imageSrc}`
            itemImage.draggable = true
            itemImage.setAttribute('id', `item${item.itemData.type}`)
            itemImage.addEventListener('dragstart', (event) => this.drag(event), false)
            document.getElementById(<string>item.fieldInEquipment)!.appendChild(itemImage)
        }

        fieldsMouseEnterListeners () {

            let backpackFields = document.getElementsByClassName('col')
            //console.log(backpackFields)
            for (let i = 0; i < backpackFields.length; i++) {
                let backpackField = backpackFields[i]


                //console.log(this.dressedItems)
                backpackField.addEventListener('mouseenter', (event) => {

                    if (this.itemDragging) return
                    for (let item in this.dressedItems) {
                        if (item !== 'backpack') continue
                        for (let backpackItem in this.dressedItems[item]) {
                            if (this.dressedItems[item][backpackItem].fieldInEquipment === backpackField.id) {
                                if (!this.itemDragging) {
                                    showEquipment(this.dressedItems[item][backpackItem])
                                }
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

            console.log('drop in backpack')

            if (image.length === 0 || imageParent.length === 0) {
                //this.isItemDragging = false
                this.setItemDragging(false)
                return
            }

            let isFieldEmpty = event.target.childNodes.length === 0

            for (let item in this.dressedItems) {
                //if (item !== 'backpack') continue
                if (this.dressedItems[item] === null) continue

                console.log(this.dressedItems)

                // PRZENIESIENIE POMIĘDZY FIELDAMI W PLECAKU
                if (imageParent.includes('field') && isFieldEmpty) {
                    for (let itemInBackpack in this.dressedItems[item]) {
                        if (this.dressedItems[item][itemInBackpack].fieldInEquipment === imageParent) {

                            // @ts-ignore
                            game.socket.emit('dragItem', {
                                actualField: this.dressedItems[item][itemInBackpack].fieldInEquipment,
                                destinationField: event.target.id,
                                item: this.dressedItems[item][itemInBackpack]
                            })
                        }
                    }
                } // PRZENIESIENIE Z EKWIPUNKU DO PLECAKA
                else if (!imageParent.includes('field') && isFieldEmpty) {
                    console.log(this.dressedItems[item])

                    if (this.dressedItems[item].fieldInEquipment === imageParent) {
                        this.changeItemField({
                            // @ts-ignore
                            actual: this.dressedItems[item].fieldInEquipment,
                            destination: event.target.id
                        })
                        // @ts-ignore
                        game.socket.emit('dragItem', {
                            actualField: this.dressedItems[item].fieldInEquipment,
                            destinationField: event.target.id,
                            item: this.dressedItems[item]
                        })
                    }
                }}
            if (isFieldEmpty) {
                event.target.appendChild(document.getElementById(image))
            }
            //this.isItemDragging = false
            setTimeout(() => {
                this.setItemDragging(false)
            }, 200)
        }




    }
</script>

<style lang="scss">
    #backpack-container {
        margin: auto;
    }

    .col {
        width: 32px;
        height: 32px;
        border: 1px solid black;
    }
</style>