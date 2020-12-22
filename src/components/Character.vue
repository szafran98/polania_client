<template>
    <div class="card character-card">
        <div class="card-content">
            <p class="title">
                {{ character.name }}
            </p>
            <img :id="imageId" width="48" alt="">
            <p class="subtitle">
                Poziom {{ character.statistics.level }}
            </p>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">
                <button class="button" @click="logIntoGame">Wejdź do gry</button>
            </p>
        </footer>
    </div>

</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop} from 'vue-property-decorator';
    import { Mutation } from 'vuex-class';


    @Component
    export default class Character extends Vue {
        @Mutation('Root/storeSelectedCharacter') storeSelectedCharacter: any

        @Prop() readonly character!: any

        characterImage = new Image()
        imageId = 'image' + this.character.name


        mounted() {
            this.createCharacterImage()
        }

        createCharacterImage() {
            const start = () => {
                imageCanvas.width = 32
                imageCanvas.height = 48
                ctx!.drawImage(sourceImage, 0, 0, 32, 48, 0, 0, 32, 48)
                document.getElementById(this.imageId)!.setAttribute('src', imageCanvas.toDataURL())
            }

            let imageCanvas = document.createElement('canvas')
            let ctx = imageCanvas.getContext('2d')
            let sourceImage = new Image()
            sourceImage.crossOrigin = 'anonymous'
            sourceImage.onload = start
            sourceImage.src = `http://localhost:8080/img/${this.character.imageSrc}`
            //console.log(this.character.imageSrc)

        }

        logIntoGame () {
            this.storeSelectedCharacter(this.character)

            this.$router.push({ name: 'Game'})
        }
    }
</script>

<style lang="scss" scoped>
.character-card {
    //width: 10vw;
}

</style>