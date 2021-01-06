<template>
    <div id="right-column" v-if="isPlayerDataLoaded">
        <div id="name-div" class="is-size-5">
            <span id="player-name">{{ gameInstance.player.name }}</span>
            <span id="player-level" class="is-size-7">Poziom {{ playerLevel }} {{gameInstance.player.class[0]}}</span>
        </div>
        <div class="heal-and-exp-bars">
            <div id="health-bar-background" class="bar-background">
                <div id="health-bar-color" class="bar" ></div>
            </div>
            <div id="exp-bar-background" class="bar-background">
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

        playerLevel: number = 1

        mounted () {
            setInterval(() => {
                if (this.gameInstance.player) {
                    this.isPlayerDataLoaded = true
                }
                //this.gameInstance = game
                this.playerLevel = this.gameInstance.player.statistics._level
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
            //console.log(String(this.gameInstance.player.statistics._level))
            //@ts-ignore
            //console.log(game.expToLevelTable['default'])
            //@ts-ignore
            let expToNextLevel = game.expToLevelTable['default'][this.gameInstance.player.statistics._level + 1]
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
        border: 1px solid black;
        border-top: 2px double white;
        border-right: 2px double white;
        border-bottom: 2px double white;

        #name-div {
            background: rgb(82, 35, 26);
            color: white;
            display: grid;

            #player-level {
                border-bottom: 1px solid black;
            }
        }

        .heal-and-exp-bars {
            margin-bottom: 15px;
        }

        #health-bar-background {
            background: #ddd;
        }
        #exp-bar-color {
            background: gold;

        }

        .bar-background {
            height: 15px;
            width: 230px;
            background: #ddd;
            position: relative;
            margin: auto;
            margin-top: 10px;
            //padding: 5px;
            border: 1px solid black;
            box-sizing: border-box;
            box-shadow: 3px 3px #2c3e50;

            .bar {
                background: #c54;
                //width: 100%;
                height: 13px;
                position: relative;

                transition: width .5s linear;
            }
        }
    }


</style>