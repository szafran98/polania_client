<template>
    <div id="vendor-container" >
        <div id="vendor-window" class="card" style="background: #8f541f; width: 300px; height: 350px; margin: auto">
            <i class="fas fa-times-circle fa-1x" @click="closeVendorWindow" style="z-index: 5; float: right"></i>
            <div v-for="(item, index) in vendorItems" :key="index" class="vendor-row is-uppercase box" style="display: inline-flex; align-items: center; background: rgb(82, 35, 26); clear: both">
                <div @mouseenter="addItemHint(item, $event)" @mouseleave="removeItemHint(item, $event)">
                    <img :src="`http://localhost:8080/img/`+item.imageSrc" alt="" style="width: 32px; height: 32px; margin: 10px">
                </div>
                <span style="margin: 10px; color: white">Cena: {{item.value}} <i class="fas fa-coins" style="color: gold"></i></span>
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
    import {game} from "@/assets/js";
    import { IItem } from '@/assets/js/Interfaces';

    @Component
    export default class Vendor extends Vue {

        get vendorItems() {
            return game.currentConversationWith?.offeringItems
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