<template>
  <v-toolbar pt-5>
    <v-text-field
      single-line
      hide-details
      placeholder="Search"
      append-icon="mdi-magnify"
      :value="search"
      @input="(value) => $emit('update:search', value)"
    />
    <v-btn icon @click="$emit('addClicked')">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['search'],
});
</script>
