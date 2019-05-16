<template>
  <v-container fluid pa-0 ma-0 grid-list fill-height>
    <v-layout column align>
      <v-flex>
        <v-card height="10vh" flat color="green">
          <v-flex align-center>
          </v-flex>
        </v-card>
      </v-flex>

      <v-layout row fill-height>
        <v-flex xs3>
          <v-card flat height="100%" color="red">dashdaszd</v-card>
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
import Vue from "vue";
export default Vue.extend({
  name: "MainView"
});
</script>

<style scoped>
</style>
