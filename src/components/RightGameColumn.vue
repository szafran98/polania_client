<template>
    <div id="right-column" v-if="isPlayerDataLoaded">
        <div id="name-div" class="is-size-5" style="color: black">
            <span>{{ gameInstance.player.name }}</span>
            <span class="is-size-7">Poziom {{ gameInstance.player.statistics._level }}</span>
        </div>
        <div class="heal-and-exp-bars" style="margin-bottom: 15px">
            <div id="health-bar-background" class="bar-background">
                <div id="health-bar-color" class="bar" ></div>
            </div>
            <div id="exp-bar-background" class="bar-background" style="">
                <div id="exp-bar-color" class="bar"></div>
            </div>
        </div>
        <PlayerStatistics v-show="!showEquipment" />
        <Equipment v-show="showEquipment" />
        <input type="button" class="button is-small" value="EQ" @click="showEquipment = !showEquipment">
        <Backpack v-if="gameInstance" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';
    import Game from '@/assets/js/core/Game';
    import PlayerStatistics from '@/components/PlayerStatistics.vue';
    import Backpack from '@/components/Backpack.vue';
    import Equipment from '@/components/Equipment.vue'
    import { game } from '@/assets/js';

    @Component({
        components: {
            PlayerStatistics,
            Backpack,
            Equipment
        }
    })
    export default class RightGameColumn extends Vue {
        //@Getter('Root/character') character: any
        @Prop() gameInstance!: Game

        showEquipment = true
        isPlayerDataLoaded = false

        mounted () {
            setInterval(() => {
                if (this.gameInstance.player) {
                    this.isPlayerDataLoaded = true
                }
                //this.gameInstance = game
                this.setHealthBar()
                this.setExpBar()
            }, 100)
        }

        setHealthBar () {
            let maxPlayerHealth = game.player.statistics.maxHealth
            let actualPlayerHealth = game.player.statistics.health
            let actualPercentOfMaxHealth = actualPlayerHealth / maxPlayerHealth * 100
            //console.log(game.player.statistics)
            setTimeout(() => {
                //console.log(this.gameInstance.player.statistics._health)
                document.getElementById('health-bar-color')!.style.width = `${actualPercentOfMaxHealth}%`
                document.getElementById('health-bar-background')!.setAttribute('data-tooltip', `${actualPlayerHealth} hp`)
            }, 50)
        }

        setExpBar () {
            let expToNextLevel = 20
            let actualPlayerExp = this.gameInstance.player.statistics._experience
            let actualPercentOfExp = actualPlayerExp / expToNextLevel * 100
            setTimeout(() => {
                document.getElementById('exp-bar-color')!.style.width = `${actualPercentOfExp}%`
                document.getElementById('exp-bar-background')!.setAttribute('data-tooltip', `${this.gameInstance.player.statistics._experience} / ${expToNextLevel}`)
            }, 50)
        }
    }
</script>

<style lang="scss" scoped>
    #right-column {
        height: 544px;
        width: 250px;
        background: #8f541f;

        #exp-bar-color {
            background: gold;

        }

        .bar-background {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 200px;
            height: 20px;
            padding: 5px;
            background: #ddd;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            position: relative;
            margin: auto;
            margin-top: 10px;

            .bar {
                background: #c54;
                //width: 100%;
                height: 10px;
                position: relative;

                transition: width .5s linear;
            }
        }


        #name-div {
            display: grid;
        }
    }
</style>