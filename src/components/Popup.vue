<template>
    <div id="popup-box" v-if="showPopup.state" class="columns column is-centered">
        <div class="message">
            <div class="message-header">
                <p>Game info</p>
                <button class="delete" aria-label="delete" @click="changePopupState('')"></button>
            </div>
            <div class="message-body">
                {{ showPopup.content }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import  Component  from 'vue-class-component';
    import { Getter, Mutation } from 'vuex-class';

    @Component
    export default class Popup extends Vue {
        @Getter('Root/showPopup') showPopup!: any
        @Mutation('Root/changePopupState') changePopupState!: any

        mounted () {
            setTimeout(() => {
                if (this.showPopup.state) {
                    this.changePopupState('')
                }
            }, 4500)
        }
    }
</script>

<style lang="scss">
#popup-box {
    margin-top: 10vh;
}
</style>