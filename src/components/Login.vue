<template>
    <form id="login-form" @submit.prevent="login">
        <div class="field">
            <input class="input" type="text" v-model="username" placeholder="username">
        </div>
        <div class="field">
            <input class="input" type="password" v-model="password" placeholder="password">
        </div>
        <div class="error is-size-7" v-if="showError">Błędny login lub hasło</div>
        <button id="login-button" class="button is-hovered is-primary" type="submit">Zaloguj się</button>
    </form>
</template>

<script lang="ts">
    import axios from 'axios'
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import TokenDataService from '@/services/TokenDataService';
    import { Mutation, Action, namespace } from 'vuex-class';

    const rootModule = namespace('Root')

    @Component
    export default class Login extends Vue {
        //@rootModule.Action('getUserCharacters') getUserCharacters: any
        //@rootModule.Mutation('setLoggedUserData') setLoggedUserData: any
        @Action('Root/getUserCharacters') getUserCharacters: any
        @Mutation('Root/storeLoggedUserData') storeLoggedUserData: any

        username = ''
        password = ''
        showError = false

        login () {
            axios.post('http://localhost:2000/auth/login', {
                username: this.username,
                password: this.password,
            })
            .then(res => {
                TokenDataService.setToken(res.data)

                const splittedToken = res.data.split('.')
                const middlePayload = JSON.parse(
                    Buffer.from(splittedToken[1], 'base64').toString('ascii')
                );

                this.storeLoggedUserData({
                    userId: middlePayload.userId,
                    username: middlePayload.username
                })

                this.getUserCharacters()
            })
            .catch(err => {
                if (err.response.status === 401) {
                    this.showError = true
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    #login-form {
        display: block;
        .button {
            margin-top: 0.75rem;
            &:hover {
                border: 1px solid white;
            }
        }
    }


</style>