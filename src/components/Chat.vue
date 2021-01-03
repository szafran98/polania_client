<template>
    <div id="chat-container">
        <div id="chat-text"></div>
        <form id="chat-form" @submit.prevent="sendMessage">
            <input type="text" id="chat-input" v-model="messageContent">
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
                document.getElementById('chat-text')!.innerHTML += `<div class="is-size-6" style="text-align: left; margin-left: 3px; font-family: fantasy">${data}</div>`;
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
        background: rgb(82, 35, 26);
        color: white;
        border-right: 1px double white;
        border-top: 2px double white;
        border-bottom: 2px double white;
        border-left: 2px double white;

        #chat-text {
            width: 250px;
            height: 520px;
            overflow-y: scroll
        }

        #chat-form {
            width: 250px;

            #chat-input {
                width: 250px;
            }
        }
    }
</style>