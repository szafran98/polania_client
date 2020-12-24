<template>
    <div class="statistics-container box has-text-weight-bold" style="margin-top: 20px; background: #52231a; color: white">
        <div class="statistics-card is-flex is-flex-direction-row is-align-items-flex-end">
            <div id="col1" class="is-size-7 is-flex is-flex-direction-column is-align-items-start" style="display: grid">
                <span v-if="Array.isArray(allStatistics.attack)">Atak: {{ `${allStatistics.attack[0]} - ${allStatistics.attack[1]}` }}</span>
                <span v-else>Atak: {{ `${allStatistics.attack}` }}</span>
                <span>Szansa na krytyk: {{ allStatistics.criticalStrikeChance+'%' }}</span>
                <span>Moc krytyka: {{ '+'+allStatistics.criticalStrikePower+'%' }}</span>
                <span>Inicjatywa: {{ allStatistics.attackSpeed }}</span>
            </div>
            <div id="col2" class="is-size-7 is-flex is-flex-direction-column is-align-items-flex-start" style="width: 40%; padding-left: 15px">
                <span>Pancerz: {{ allStatistics.armor }}</span>
                <span>Mana: {{ allStatistics.mana }}</span>
                <span>Energia: {{ allStatistics.energy }}</span>
                <span>Unik: {{ allStatistics.dodge+'%' }}</span>
            </div>
        </div>
        <div id="col3" class="is-size-7 is-flex is-justify-content-center" style="display: flex; margin: auto">
            <span style="padding: 10px">STR {{ allStatistics.strength }} </span>
            <span style="padding: 10px">DEX {{ allStatistics.dexterity }} </span>
            <span style="padding: 10px">INT {{ allStatistics.intellect }}</span>
        </div>
        <div id="col4" class="is-size-7 is-flex is-justify-content-center" style="display: flex; margin: auto">
            <span class="has-tooltip-bottom" style="padding: 10px; border: 0" :data-tooltip="allStatistics.fireResistance + ' %'"> <i class="fas fa-fire" style="color: #F77100"></i></span>
            <span class="has-tooltip-bottom" style="padding: 10px; border: 0" :data-tooltip="allStatistics.frostResistance + ' %'"> <i class="fas fa-snowflake" style="color: #2478B9"></i>  </span>
            <span class="has-tooltip-bottom" style="padding: 10px; border: 0" :data-tooltip="allStatistics.lightningResistance + ' %'"> <i class="fas fa-bolt" style="color: #F1C40F"></i> </span>
            <span class="has-tooltip-bottom" style="padding: 10px; border: 0" :data-tooltip="allStatistics.poisonResistance + ' %'"> <i class="fas fa-skull-crossbones" style="color: #63DC15"></i> </span>
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

        allStatistics = game.player.statistics.allStatistics

        mounted () {
            setInterval(() => {
                this.allStatistics = game.player.statistics.allStatistics
                //console.log(this.allStatistics)
            }, 1000)

        }

    }
</script>

<style lang="scss" scoped>
    .box {
        margin-bottom: 0 !important;
    }
</style>