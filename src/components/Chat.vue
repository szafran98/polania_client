<template>
    <div id="chat-container">
        <div id="chat-text" style="width: 250px; height: 520px; overflow-y: scroll"></div>
        <form id="chat-form" style="width: 250px;" @submit.prevent="sendMessage">
            <input type="text" id="chat-input" style="width: 250px" v-model="messageContent">
        </form>
    </div>

</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';
    import Game from '@/assets/js/core/Game';

    @Component
    export default class Chat extends Vue {
        @Prop() gameInstance!: Game

        messageContent = ''

        mounted () {
            this.gameInstance.socket.on('addToChat', data => {
                console.log(data)
                document.getElementById('chat-text')!.innerHTML += `<div>${data}</div>`;
            })
        }

        sendMessage() {
            try {
                this.gameInstance.socket.emit('sendMsgToServer', `${this.gameInstance.player.name}: ${this.messageContent}`)
                if (this.messageContent === '/showColliders') {
                    this.gameInstance.draw.drawCollidersDEV = !this.gameInstance.draw.drawCollidersDEV;
                }
                this.messageContent = ''
            } catch (e) {
                console.log(e)
            }
        }
    }
</script>

<style lang="scss" scoped>
    #chat-container {
        //position: absolute;
        width: fit-content;
        display: block;
        background: white;
    }
</style>