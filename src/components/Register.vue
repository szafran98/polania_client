<template>
    <form id="register-form" @submit.prevent="register">
        <div class="field form-group" :class="{ 'form-group--error': $v.username.$error }">
            <input class="input" type="text" v-model.trim="$v.username.$model" placeholder="username">
        </div>
        <div class="error is-size-7" v-if="!$v.username.required">Musisz podać nazwę użytkownika</div>
        <div class="error is-size-7" v-if="!$v.username.minLength">Minimalna długość 5 znaków</div>
        <div class="error is-size-7" v-if="error.username">{{error.username}}</div>
        <div class="field">
            <input class="input" type="email" v-model="email" placeholder="email">
        </div>
        <div class="error is-size-7" v-if="!$v.email.required">Email wymagany do aktywacji</div>
        <div class="error is-size-7" v-if="!$v.email.email">Niepoprawny email</div>
        <div class="error is-size-7" v-if="error.email">{{error.email}}</div>
        <div class="field">
            <input class="input" type="password" v-model="password" placeholder="password">
        </div>
        <div class="error is-size-7" v-if="!$v.password.required">Wymagane hasło</div>
        <div class="error is-size-7" v-if="!$v.password.minLength">Minimalna długość 8 znaków</div>
        <div class="field">
            <input class="input" type="password" v-model="repeatPassword" placeholder="repeat password">
        </div>
        <div class="error is-size-7" v-if="!$v.repeatPassword.sameAsPassword">Hasła nie są takie same</div>
        <button :disabled="$v.$invalid" id="register-button" class="button is-hovered is-primary" type="submit">Zaloguj się</button>
    </form>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { required, minLength, email, sameAs} from 'vuelidate/lib/validators';
    import axios from 'axios'
    import { Mutation } from 'vuex-class';


    @Component
    export default class Register extends Vue{
        @Mutation('Root/changePopupState') changePopupState!: any

        username: string = ''
        email: string = ''
        password: string = ''
        repeatPassword: string = ''

        error: any = {
            username: null,
            email: null
        }

        async register() {
            //console.log(this.$v.$touch())
            await axios.post('http://localhost:2000/user', {
                username: this.username,
                email: this.email,
                password: this.password,
                role: 'USER'
            })
            .then(res => {
                if (res.status === 201) {
                    this.$emit('userRegistered')
                    this.changePopupState(res.data)
                }
            })
            .catch(err => {
                console.log(err.response)
                if (err.response.status === 409) {
                    this.error.username = err.response.data
                } else {
                    this.error.email = 'Adres email zajęty'
                }
            })
        }

        validations () {
            return {
                username: {
                    required,
                    minLength: minLength(5)
                },
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(8)
                },
                repeatPassword: {
                    sameAsPassword: sameAs('password')
                }

            }
        }
    }
</script>

<style lang="scss" scoped>

    #register-form {
        display: block;
        .field {
            margin-top: 0.75rem;
        }
        .button {
            margin-top: 0.75rem;
            &:hover {
                border: 1px solid white;
            }
        }
    }
</style>