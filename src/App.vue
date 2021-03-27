<template>
  <v-app :dark="darkTheme">
    <MainView/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import MainView from './views/MainView.vue';

export default Vue.extend({
  name: 'App',
  components: {
    MainView,
  },
  data: () => ({
    //
  }),
  computed: {
    darkTheme() {
      return this.$store.state.darkTheme;
    }
  },
});
</script>
