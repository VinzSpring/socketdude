<template>
  <v-list-tile>
    <v-list-tile-avatar @contextmenu="$emit('rightClicked', $event)">
      <v-icon>folder</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content @contextmenu="$emit('rightClicked', $event)">
      <v-text-field
        v-if="id == activeId"
        placeholder="Project Name"
        autofocus
        :value="name"
        @input="(value) => $emit('update:name', value)"
        @blur="$emit('inputBlur')"
        @keyup.enter="$emit('inputUpEnter')"

      ></v-text-field>
      <v-list-tile-title v-else>{{name}}</v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn icon @click="$emit('addClicked')">
        <v-icon>add</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ['id', 'activeId', 'name'],
});
</script>

