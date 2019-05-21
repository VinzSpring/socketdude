<template>
  <v-app dark>
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
  }
}
</script>
