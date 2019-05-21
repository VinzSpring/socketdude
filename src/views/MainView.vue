<template>
  <v-container fluid pa-0 ma-0 grid-list fill-height>
    <v-layout column align>
      <Settings/>
      <v-layout row fill-height>
        <v-flex xs3>
          <SocketList/>
        </v-flex>
        <v-flex xs5>
          <v-card flat height="100%" color="blue">dashdaszd</v-card>
        </v-flex>
        <v-flex xs4>
          <v-card flat height="100%" color="light-blue">dashdaszd</v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Settings from '../components/Settings';
import SocketList from '../components/ProjectList';

export default Vue.extend({
  name: 'MainView',
  components: {
    Settings,
    SocketList,
  },
});
</script>

<style scoped>
</style>
