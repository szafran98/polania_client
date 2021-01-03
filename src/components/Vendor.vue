<template>
    <div id="vendor-container" >
        <div id="vendor-window" class="card">
            <div id="close-vendor-button-container">
                <i class="fas fa-times-circle fa-1x" @click="closeVendorWindow"></i>
            </div>
            <div id="buy-items-container" v-if="isPlayerBuying">
                <div v-for="(item, index) in vendorItems" :key="index" class="vendor-row box">
                    <div @mouseenter="addItemHint(item, $event)" @mouseleave="removeItemHint(item, $event)">
                        <img class="item-image" :src="`http://localhost:8080/img/`+item.imageSrc" alt="">
                    </div>
                    <span>Cena: {{item.value}} <i class="fas fa-coins" style="color: gold"></i></span>
                    <input type="button" class="button" value="Kup" @click="buyItem(item)" style="margin: 10px">
                </div>
            </div>
            <div id="sell-items-container" v-if="!isPlayerBuying">
                <div id="selling-item-drop-container" @drop.prevent="drop" @dragenter.prevent="itemSellContainerDragEnter" @dragleave="itemSellContainerDragLeave">

                </div>

                <span class="is-size-3">Upuść przedmiot</span>
            </div>
            <div id="vendor-buttons-container" class="card">
                <input type="button" class="button" value="Zakupy" style="margin-right: 5px" @click="isPlayerBuying = true">
                <input type="button" class="button" value="Sprzedaż" style="margin-left: 5px" @click="isPlayerBuying = false">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {game} from "@/assets/js";
    import { IItem } from '@/assets/js/Interfaces';
    import {Getter, Mutation} from "vuex-class";
    import {Equipment} from "@/assets/js/core/characters/Equipment";

    @Component
    export default class Vendor extends Vue {
        @Getter('Root/items') items: any
        @Getter('Root/itemDragging') itemDragging: any
        @Mutation('Root/storeItems') storeItems: any
        @Mutation('Root/changeItemField') changeItemField: any
        @Mutation('Root/setItemDragging') setItemDragging: any



        get dressedItems(): Equipment {
            return game.player.statistics.equipment
        }


        isPlayerBuying = true

        get vendorItems() {
            return game.currentConversationWith?.offeringItems
        }

        mounted(){
            this.dragElement(document.getElementById('vendor-window'))
            //document.getElementById("selling-item-drop-container").on
        }

        buyItem(item: IItem) {
            game.socket.emit('buyItem', item)
        }

        closeVendorWindow() {
            this.$emit('closeVendorWindow')
        }

        removeItemHint(item: any, event: any) {
            event.target.removeChild(document.getElementById('item-hint'))
            //console.log(event.target.removeChild(document.getElementById('item-hint')))
        }

        addItemHint(item: IItem, event: any) {
            console.log(event.target)
            console.log(item)

            let itemParentElement: HTMLElement = event.target
            let itemHint: HTMLElement




            itemHint = document.createElement('div');
            itemHint.setAttribute('id', 'item-hint');
            itemHint.setAttribute('class', 'item-hint');
            itemHint.innerHTML = `<b style="color: gold">${item.name}</b><br>`;



            if (typeof item.statistics.attack === 'number') {
                itemHint.innerHTML += `<b>Atak ${item.statistics.attack}</b><br>`;
            } else if (Array.isArray(item.statistics.attack)) {
                // @ts-ignore
                itemHint.innerHTML += `<b>Atak ${item.statistics.attack[0]}-${item.statistics.attack[1]}</b><br>`;
            }
            if (item.statistics.strength) {
                itemHint.innerHTML += `<b>Siła +${item.statistics.strength}</b><br>`;
            }
            if (item.statistics.dexterity) {
                itemHint.innerHTML += `<b>Zręczność +${item.statistics.dexterity}</b><br>`;
            }
            if (item.statistics.intellect) {
                itemHint.innerHTML += `<b>Intelekt +${item.statistics.intellect}</b><br>`;
            }
            if (item.statistics.attackSpeed) {
                itemHint.innerHTML += `<b>Inicjatywa +${item.statistics.attackSpeed}</b><br>`;
            }
            if (item.statistics.criticalStrikeChance) {
                itemHint.innerHTML += `<b>Szansa CK +${item.statistics.criticalStrikeChance}</b><br>`;
            }
            if (item.statistics.criticalStrikePower) {
                itemHint.innerHTML += `<b>Moc CK +${item.statistics.criticalStrikePower}</b><br>`;
            }
            if (item.statistics.armor) {
                itemHint.innerHTML += `<b>Pancerz +${item.statistics.armor}</b><br>`;
            }
            if (item.statistics.fireResistance) {
                itemHint.innerHTML += `<b>Odporność <i class="fas fa-fire"></i> +${item.statistics.fireResistance}</b><br>`;
            }
            if (item.statistics.frostResistance) {
                itemHint.innerHTML += `<b>Odporność <i class="fas fa-snowflake"></i> +${item.statistics.frostResistance}</b><br>`;
            }
            if (item.statistics.lightningResistance) {
                itemHint.innerHTML += `<b>Odporność <i class="fas fa-bolt"></i> +${item.statistics.lightningResistance}</b><br>`;
            }
            if (item.statistics.poisonResistance) {
                itemHint.innerHTML += `<b>Odporność <i class="fas fa-skull-crossbones"></i> +${item.statistics.poisonResistance}</b><br>`;
            }
            if (item.statistics.dodge) {
                itemHint.innerHTML += `<b>Unik +${item.statistics.dodge}</b><br>`;
            }
            if (item.statistics.energy) {
                itemHint.innerHTML += `<b>Energia +${item.statistics.energy}</b><br>`;
            }
            if (item.statistics.mana) {
                itemHint.innerHTML += `<b>Mana +${item.statistics.mana}</b><br>`;
            }
            if (item.statistics.health) {
                itemHint.innerHTML += `<b>Życie +${item.statistics.health}</b><br>`;
            }



            itemHint.innerHTML += `<b>Wymagany poziom: ${item.requiredLevel}</b><br>`;
            itemHint.innerHTML += `<b>Klasa: ${item.class}</b><br>`;
            itemHint.innerHTML += `<b>Wartość: ${item.value}</b>`;


            itemHint.style.position = 'fixed';
            itemHint.style.zIndex = '10'
            itemHint.style.width = 'max-content';
            itemHint.style.backgroundColor = '#52231a';
            itemHint.style.borderColor = '#8f541f';
            itemHint.style.color = '#fff';
            itemHint.style.border = '3px double #a95';
            itemHint.style.padding = '3px';
            itemHint.style.fontSize = '11px';
            itemHint.style.transform = 'translateX(-30%)';


            itemParentElement.appendChild(itemHint);
            /*
            document
                .getElementById(<string>backpackFieldId)
                ?.addEventListener('dragstart', (event) => {
                    //console.log(event.target);
                    try {
                        document
                            .getElementById(<string>backpackFieldId)
                            ?.removeChild(itemHint);
                    } catch (e) {
                        //console.log(e);
                    }
                });



            document
                .getElementById(<string>backpackFieldId)
                ?.addEventListener('mouseleave', (event) => {
                    //console.log(event.target);
                    try {
                        document
                            .getElementById(<string>backpackFieldId)
                            ?.removeChild(itemHint);
                    } catch (e) {
                        //console.log(e);
                    }
                });
            */

        }

        dragElement(elmnt: any) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
                // if present, the header is where you move the DIV from:
                document.getElementById(elmnt.id + "header")!.onmousedown = dragMouseDown;
            } else {
                // otherwise, move the DIV from anywhere inside the DIV:
                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e: any) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e: any) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }

        itemSellContainerDragEnter(event: any) {
            event.target.style.boxShadow = 'inset 0 0 100px #8f541f';
                //box-shadow: inset 0 0 100px #8f541f;
        }

        itemSellContainerDragLeave(event: any) {
            document.getElementById('selling-item-drop-container')!.style.boxShadow = ''
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

            //let isFieldEmpty = event.target.childNodes.length === 0

            for (let item in this.dressedItems) {
                //if (item !== 'backpack') continue
                if (this.dressedItems[item] === null) continue

                //console.log(this.dressedItems)

                // PRZENIESIENIE POMIĘDZY FIELDAMI W PLECAKU
                if (imageParent.includes('field')) {
                    for (let itemInBackpack in this.dressedItems[item]) {
                        if (this.dressedItems[item][itemInBackpack].fieldInEquipment === imageParent) {

                            console.log(this.dressedItems[item][itemInBackpack])

                            // @ts-ignore
                            game.socket.emit('sellItem', this.dressedItems[item][itemInBackpack])

                            let itemInField = <HTMLElement>document.getElementById(`item-${this.dressedItems[item][itemInBackpack].id}`)
                            //let itemHint = <HTMLElement>document.getElementById('item-hint')
                            console.log(itemInField)
                            try {
                                let itemHint = <HTMLElement>document.getElementById('item-hint')
                                document.getElementById(<string>this.dressedItems[item][itemInBackpack].fieldInEquipment)!.removeChild(itemHint)
                            } finally {
                                document.getElementById(<string>this.dressedItems[item][itemInBackpack].fieldInEquipment)!.removeChild(itemInField)
                                this.itemSellContainerDragLeave(event)
                            }
                            /*
                            game.socket.emit('dragItem', {
                                actualField: this.dressedItems[item][itemInBackpack].fieldInEquipment,
                                destinationField: event.target.id,
                                item: this.dressedItems[item][itemInBackpack]
                            })
                            */
                        }
                    }
                }
                /*
                // PRZENIESIENIE Z EKWIPUNKU DO PLECAKA
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

                 */
            }

            //this.isItemDragging = false
            setTimeout(() => {
                this.setItemDragging(false)
            }, 200)
        }
    }
</script>

<style scoped lang="scss">
    #vendor-container {
        position: absolute;
        z-index: 4;
        width: 544px;

        #vendor-window {
            border: 3px double white;
            background: url("https://brewminate.com/wp-content/uploads/2018/12/122318-12-History-Medieval-Middle-Ages-Commerce-Law-1024x774.jpg");
            background-size: cover;
            position: absolute;
            left: 25%;
            width: 300px; height: 350px; margin: auto;
            //background: #8f541f;

            #vendor-buttons-container {
                position: absolute; bottom: 0; width: inherit; background: rgb(82, 35, 26); padding: 10px; border-top: 1px solid black; border-radius: 0;
            }

            #buy-items-container {
                padding-top: 5px;

                span {
                    margin: 10px; color: white;
                }

                .vendor-row {
                    display: inline-flex; align-items: center; background: rgb(82, 35, 26); clear: both;
                }
            }

            #sell-items-container {
                padding-top: 5px;

                #selling-item-drop-container {
                    width: 200px; height: 200px; border: 3px dashed black; margin: auto;
                }
            }

            #sell-items-container > span {
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: white;
                color: black; font-weight: bold;
            }

            #selling-item-drop-container {
                &:hover {
                    //box-shadow: inset 0 0 100px #8f541f;
                }
            }

            #close-vendor-button-container {
                background: rgb(82, 35, 26);
                position: absolute;
                padding-bottom: 5px; padding-top: 5px; color: white; border-bottom: 1px solid black; position: relative; height: 35px;
                
                &:hover {
                    //background: #F77100;
                    opacity: 0.9;
                    cursor: move;
                }

                i {
                    z-index: 5; position: relative;
                    &:hover {
                        color: #FF625A;
                        cursor: pointer;
                    }
                }
            }
        }

        #vendor-window > i {
            //background: rgb(82, 35, 26);
        }

        .vendor-row {
            //margin-top: 1.5rem;
        }

        .item-image {
            width: 32px; height: 32px; margin: 10px;
        }

    }
</style>