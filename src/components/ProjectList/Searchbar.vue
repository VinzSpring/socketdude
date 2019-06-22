<template>
  <v-toolbar pt-5>
    <v-text-field placeholder="Search" append-icon="search" :value="search" @input="(value) => $emit('update:search', value)"></v-text-field>
    <v-btn icon @click="$emit('addClicked')">
      <v-icon>add</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['search'],
});
</script>


