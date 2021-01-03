<template>
    <div id="ui" class="">
        <i class="fas fa-book is-size-2" @click="showSkillsBarMenu = !showSkillsBarMenu"></i>
        <div id="skills-bar" v-show="showSkillsBarMenu">
            <svg width="35" height="50">
                <polygon points="35,5 25,15 35,25"></polygon>
                <polygon points="35,25 25,35 35,45"></polygon>
            </svg>
            <div id="player-skills">
                <div id="skill-1-container" class="has-tooltip-top" :data-tooltip="'Zwykły atak. Po prostu mu przypierdol'" style="margin: 5px;">
                    <img src="http://localhost:8080/img/zwykly-atak.png" alt="" height="32" width="32" :data-tooltip="'Zwykły atak. Po prostu mu przypierdol'" style="height: 32px; vertical-align: middle" @click="selectSkill">
                </div>
                <img src="http://localhost:8080/img/zwykly-atak.png" alt="" height="32" width="32" style="height: 32px; margin: 5px">
            </div>
        </div>
        <div id="buttons-and-log-container">
            <div id="fight-log" class="is-size-7">
            </div>
            <div id="fight-buttons-container">
                <input id="attack-btn" class="button is-size-7" type="button" value="Atak">
                <input id="move-btn" class="button is-size-7"  type="button" value="Krok">
                <input id="exitBtn" class="button is-size-7" type="button" value="Wyjdź">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'

    @Component
    export default class FightBar extends Vue {
        showSkillsBarMenu = false

        showSkillsBar() {
            let skillsBarElement = document.getElementById('skills-bar');
            skillsBarElement!.style.width = '544px'
            skillsBarElement!.style.height = '50px'
            skillsBarElement!.style.position = 'absolute'
            skillsBarElement!.style.zIndex = '5'
            skillsBarElement!.style.backgroundColor = 'white'
            skillsBarElement!.style.top = '-50px'
        }

        selectSkill(event: any) {
            event.target.style.border = '2px outset white'
        }
    }
</script>

<style lang="scss" scoped>
    #ui {
        width: 544px;
        text-align: left;
        bottom: 85px;
        background: #8f541f;
        border-bottom: 1px solid black;
        border-top: 1px solid black;
        z-index: 5; height: 150px; position: absolute;

        #buttons-and-log-container {
            display: flex;
        }

        i {
            color: #2c3e50;
            position: absolute; left: 5px; top: -45px;; z-index: 6;

            &:hover {
                color: whitesmoke;
            }
        }

        #fight-buttons-container {
            display: grid; margin: auto;

            input {
                z-index: 7;
                margin: 5px;
            }
        }

        #fight-log {
            background: rgb(82, 35, 26);
            color: white;
            border-bottom: 1px solid black;
            border-left: 1px solid black;
            width: 400px; height: 150px; overflow-y: scroll;
        }

        #skills-bar {
            display: flex;
            width: 544px;
            height: 50px;
            position: absolute;
            z-index: 5;
            //background: white;
            top: -50px;
            transition: width .5s linear;
            background: #8f541f;
            border-bottom: 1px solid black;
            border-top: 1px solid black;
            border-left: 1px solid black;

            svg {
                margin-left: 25px;

                polygon {
                    fill: rgb(82, 35, 26);
                    stroke-width: 0;
                }
            }

            #player-skills {

                background: rgb(82, 35, 26);
                width: 500px; height: 38px; margin-top: 6px; margin-bottom: 6px; display: flex; align-items: center;

                img {
                    &:hover {
                        border: 1px double white;
                    }
                }
            }
        }
    }
</style>