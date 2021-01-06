<template>
    <form id="character-creation-form" @submit.prevent="createCharacter" style="display: grid;">
        <div class="field">
            <input class="input" type="text" v-model="name" placeholder="Nazwa postaci">
        </div>
        <div class="select" style="width: inherit">
            <select v-model="selectedClass">
                <option disabled>Wybierz klasę</option>
                <option>{{availableClasses.WOJOWNIK}}</option>
                <option>{{availableClasses.MAG}}</option>
                <option>{{availableClasses.ŁOWCA}}</option>
            </select>
        </div>
        <button id="login-button" class="button is-hovered is-primary" type="submit">Stwórz postać</button>
    </form>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import axios from 'axios'
    import TokenDataService from '@/services/TokenDataService';
    import { Action, Getter, Mutation } from 'vuex-class';
    import { serverIp } from "@/assets/js";
    import {Class} from "@/assets/js/Enums";


    @Component
    export default class CharacterCreationForm extends Vue {
        @Mutation('Root/changePopupState') changePopupState!: any
        @Action('Root/getUserCharacters') getUserCharacters!: any

        name: string = ''
        selectedClass?: Class
        availableClasses = {
            "WOJOWNIK": Class.WARRIOR,
            "MAG": Class.MAGE,
            "ŁOWCA": Class.HUNTER,
        }

        async createCharacter () {
            await axios.post(`http://${serverIp}/character/create`, {
                name: this.name,
                class: this.selectedClass
            }, {
                headers: {
                    auth: TokenDataService.getAccessToken()
                }
            })
            .then(res => {
                this.changePopupState(res.data)
                this.getUserCharacters()
                this.$emit('closeCharacterCreationForm')
                //console.log(res)
            })
        }
    }
</script>

<style lang="scss" scoped>
    .select {
        margin-bottom: 0.75rem;
    }
    .select > select {
        width: 100%;
    }
</style>