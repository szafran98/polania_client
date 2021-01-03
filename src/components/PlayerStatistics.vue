<template>
    <div id="statistics-container" class="statistics-container box has-text-weight-bold">
        <span id="player-gold"><i class="fas fa-coins"></i> {{ playerGold }} </span>
        <div class="statistics-card is-flex is-flex-direction-row is-align-items-flex-end">
            <div id="col1" class="is-size-7 is-flex is-flex-direction-column is-align-items-start">
                <span v-if="Array.isArray(allStatistics.attack)"><span class="iconify" data-icon="jam:sword-f" data-inline="false"></span> {{ `${allStatistics.attack[0]} - ${allStatistics.attack[1]}` }}</span>
                <span v-else><span class="iconify" data-icon="jam:sword-f" data-inline="false"></span>: {{ `${allStatistics.attack}` }}</span>
                <span>Szansa CK: {{ allStatistics.criticalStrikeChance+'%' }}</span>
                <span>Moc CK: {{ '+'+allStatistics.criticalStrikePower+'%' }}</span>
                <span>Inicjatywa: {{ allStatistics.attackSpeed }}</span>
            </div>
            <div id="col2" class="is-size-7 is-flex is-flex-direction-column is-align-items-flex-start">
                <span><span class="iconify" data-icon="bi:shield-shaded" data-inline="false"></span> {{ allStatistics.armor }}</span>
                <span>Mana: {{ allStatistics.mana }}</span>
                <span>Energia: {{ allStatistics.energy }}</span>
                <span>Unik: {{ allStatistics.dodge+'%' }}</span>
            </div>
        </div>
        <div id="col3" class="is-size-7 is-flex is-justify-content-center">
            <span style="padding: 10px">STR {{ allStatistics.strength }} </span>
            <span style="padding: 10px;">DEX {{ allStatistics.dexterity }} </span>
            <span style="padding: 10px">INT {{ allStatistics.intellect }}</span>
        </div>
        <div id="col4" class="is-size-7 is-flex is-justify-content-center">
            <span class="has-tooltip-bottom"  :data-tooltip="allStatistics.fireResistance + ' %'"> <i class="fas fa-fire" style="color: #F77100"></i></span>
            <span class="has-tooltip-bottom"  :data-tooltip="allStatistics.frostResistance + ' %'"> <i class="fas fa-snowflake" style="color: #2478B9"></i>  </span>
            <span class="has-tooltip-bottom"  :data-tooltip="allStatistics.lightningResistance + ' %'"> <i class="fas fa-bolt" style="color: #F1C40F"></i> </span>
            <span class="has-tooltip-bottom"  :data-tooltip="allStatistics.poisonResistance + ' %'"> <i class="fas fa-skull-crossbones" style="color: #63DC15"></i> </span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';
    import { Statistics } from '@/assets/js/core/characters/Statistics';
    import { game } from '@/assets/js';

    @Component
    export default class PlayerStatistics extends Vue {
        //@Prop() readonly statistics!: Statistics

        /*
        get allStatistics() {
            return game.player.statistics.allStatistics
        }
        */

        allStatistics = game.player.statistics.allStatistics

        playerGold = game.player.gold

        mounted () {
            setInterval(() => {
                this.allStatistics = game.player.statistics.allStatistics
                this.playerGold = game.player.gold
                if (game.currentFight) {
                    //console.log(this.allStatistics)
                }
            }, 1000)

        }


    }
</script>

<style lang="scss" scoped>
    #statistics-container {
        background: #52231a; color: white;

        #player-gold {
            color: gold;
        }
    }

    .box {
        margin-bottom: 0 !important;
        border-radius: 0 !important;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        padding: 0;
        padding-bottom: 0;

        //margin: auto;

        .statistics-card {
            //margin-top: 20px;
        }


        #col1 {
            background: #8f541f;
            width: 50%;
            position: relative;
            display: grid;

            .iconify {
                vertical-align: middle;
                width: 15px;
                height: 15px;
            }

            span {
                border: 1px solid black;
                width: 100%;
                position: relative;
                padding: 2px;
            }
        }

        #col2 {
            background: #8f541f;
            width: 50%;
            position: relative;

            .iconify {
                vertical-align: middle;
                width: 20px;
                height: 15px;
            }

            span {
                border: 1px solid black;
                width: 100%;
                position: relative;
                padding: 2px;
            }
        }

        #col3 {
            border-bottom: 1px solid black;
            display: flex; margin: auto;
        }

        #col4 {
            display: flex; margin: auto;

            span {
                padding: 10px; border: 0;
            }
        }
    }
</style>