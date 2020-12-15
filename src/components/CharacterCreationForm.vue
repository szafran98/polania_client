<template>
    <form id="character-creation-form" @submit.prevent="createCharacter">
        <div class="field">
            <input class="input" type="text" v-model="name" placeholder="Nazwa postaci">
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


    @Component
    export default class CharacterCreationForm extends Vue {
        @Mutation('Root/changePopupState') changePopupState!: any
        @Action('Root/getUserCharacters') getUserCharacters!: any

        name: string = ''

        async createCharacter () {
            await axios.post('http://localhost:2000/character/create', {
                name: this.name
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

</style>