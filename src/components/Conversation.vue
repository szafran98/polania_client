<template>
    <div id="conversation-container" class="is-size-5" style="margin-top: 344px; position: absolute; z-index: 4;background: rgb(82, 35, 26); color: white">
        <div id="npc-text" style="height: 100px; background: #D6CCA9; color: black; overflow: scroll" v-if="actualNpcAnswer !== null">
            {{ actualNpcAnswer }}
        </div>
        <div class="conversation-option" @click="select($event)" v-for="(option, index) in currentConversation.conversationOptions" :key="index">
            <span :id="'option'+index" class="is-size-7">{{ index }}. {{ option.question }}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {game} from "@/assets/js";

    @Component
    export default class Conversation extends Vue {
        choosedConversationOption: string | null = null
        actualNpcAnswer: string | null = null

        conversationMethods = {
            exitConversation: () => {
                game.isPlayerDoingConversation = false
                game.currentConversationWith = null
                this.$emit('exitConversation')
                //alert('run method')
            },
            tradeWithNpc: () => {
                alert('trade with npc')
                this.$emit('tradeWithNpc')
            }
        }

        get currentConversation() {
            return game.currentConversationWith
        }

        select(event: any) {
            console.log(event.target)
            let conversationOptions = this.currentConversation?.conversationOptions
            let selectedOptionId: string = event.target.id.charAt(event.target.id.length - 1)
            //console.log(selectedOptionId)
            console.log(conversationOptions[selectedOptionId])
            console.log(this.currentConversation?.conversationOptionsTree)
            this.choosedConversationOption = selectedOptionId
            this.actualNpcAnswer = conversationOptions[selectedOptionId].answer
            if (conversationOptions[selectedOptionId].evaluateMethod) {
                this.conversationMethods[conversationOptions[selectedOptionId].evaluateMethod]()
            }
        }

        initializeListenersForConversationOptions() {

        }

    }
</script>

<style scoped lang="scss">
    #conversation-container {
        width: 544px;
        height: 200px;
        background: white;
        font-weight: bold;

        #npc-text {
            font-family: 'MedievalSharp', cursive;
            border-bottom: 1px solid #8f541f;
        }

        .conversation-option {
            cursor: pointer;
            transition: 0.3s;

            &:hover {
                background: #F77100;
            }
        }
    }
</style>