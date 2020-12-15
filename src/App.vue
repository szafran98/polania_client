<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
    <Popup v-if="showPopup" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Watch } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';
  import {game} from '@/assets/js/index';
  import Popup from '@/components/Popup.vue';

  @Component({
    components: {
      Popup
    }
  })
  export default class App extends Vue {
    @Getter('Root/showPopup') showPopup!: symbol

    @Watch('$route')
    changeRoute(to:any, from:any) {
      if (from.name === 'Game') {
       // stopGameMain()
        //setTimeout(() => {
          game?.socket.disconnect()
        //}, 1000)
      } else if (to.name === 'Game') {
        if (game?.socket.connected) return
        // @ts-ignore
        game?.socket.connect()
        // @ts-ignore
        game.playersList = [];

        game.draw.margin.vertical = 0;
        game.draw.margin.horizontal = 0;

      }
    }
  }

  /*
  export default {
    name: 'App',
    mounted() {

    }
  }

   */
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
