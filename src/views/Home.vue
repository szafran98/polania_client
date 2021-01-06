<template>
    <div class="container" >
        <h1 id="game-title-header" class="is-centered is-size-2">Polania MMORPG</h1>
        <h1 v-if="userData.userId && !characters" id="character-info" class="is-centered is-size-2">Brak postaci</h1>
        <div v-if="userData.userId && (!characters || characters.length <= 3)" class="columns column is-centered">
            <div class="column is-2">
                <input type="button" class="button" value="Nowa postać"
                       @click="showCharacterCreationForm =! showCharacterCreationForm"
                />
            </div>
        </div>
        <div v-if="showCharacterCreationForm" class="columns column is-centered">
            <div class="column is-3">
                <CharacterCreationForm v-on:closeCharacterCreationForm="showCharacterCreationForm = false"/>
            </div>
        </div>
        <div v-if="!userData.userId" class="columns column is-centered">
            <div class="column is-2">
                <input type="button" class="button" value="Logowanie" @click="showForm('login')">
            </div>
            <div class="column is-2">
                <input type="button" class="button" value="Rejestracja" @click="showForm('register')">
            </div>
        </div>
        <div v-if="!userData.userId && showLoginForm" class="columns title is-ancestor">
            <div class="column is-4 is-offset-4 is-8-mobile is-offset-2-mobile box tile is-parent">
                <Login class="tile" />
            </div>
        </div>
        <div v-if="!userData.userId && showRegisterForm" class="columns title is-ancestor">
            <div class="column is-4 is-offset-4 is-8-mobile is-offset-2-mobile box tile is-parent">
                <Register class="tile" v-on:userRegistered="showForm('login')" />
            </div>
        </div>
        <div v-else class="columns is-centered">
            <div v-for="(character, index) in characters" :key="index" class="column is-3">
                <Character v-bind:character="character"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
//import axios from 'axios'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, namespace, State } from 'vuex-class';
import Login from '@/components/Login.vue';
import Character from '@/components/Character.vue';
import Register from '@/components/Register.vue';
import CharacterCreationForm from '@/components/CharacterCreationForm.vue';

const rootModule = namespace('Root')

@Component({
    components: {
        Register,
        Login,
        Character,
        CharacterCreationForm
    }
})
  export default class Home extends Vue {
    @Getter('Root/userData') userData: any
    @Getter('Root/characters') characters!: any[]

    showLoginForm: boolean = false
    showRegisterForm: boolean = false
    showCharacterCreationForm: boolean = false


    get columnsInRow() {
        if (this.characters.length === 1) {
            return 'is-3'
        } else if (this.characters.length === 2) {
            return 'is-3'
        }
    }

    showForm (form: string) {
        if (form === 'login') {
            this.showLoginForm = !this.showLoginForm
            this.showRegisterForm = false
        } else if (form === 'register') {
            this.showRegisterForm = !this.showRegisterForm
            this.showLoginForm = false
        }
    }


  }
</script>

<style lang="scss">
    body {
        background: url("https://64.media.tumblr.com/6c74253c6c4ed0e9038cc9e3e2bd446f/tumblr_p6eks2qvdY1tcvan1o1_1280.gifv");
        height: 100vh;
        background-repeat: round;
    }

    #game-title-header {
        color: black;
    }
</style>