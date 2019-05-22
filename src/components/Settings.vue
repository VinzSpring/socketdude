<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs3 mr-3>
      <v-text-field label="Url"></v-text-field>
    </v-flex>
    <v-flex xs3 mr-3>
      <v-select label="Protocol" :items="protocols" multiple></v-select>
    </v-flex>
    <v-btn icon flat>
      <v-icon>cached</v-icon>
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Settings",
  data() {
    return {
      protocols: []
    };
  }
});
</script>

<style scoped>
</style>


