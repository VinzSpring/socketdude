<template>
  <v-app :dark="darkTheme">
    <MainView/>
  </v-app>
</template>

<script>
import MainView from './views/MainView'
export default {
  name: 'App',
  components: {
    MainView
  },
  data () {
    return {
      //
    }
  },
  computed: {
    darkTheme() {
      return this.$store.state.darkTheme;
    }
  }
}
</script>
