<template>
  <v-list-item>
    <v-list-item-avatar @contextmenu="$emit('rightClicked', $event)">
      <v-icon>mdi-folder</v-icon>
    </v-list-item-avatar>
    <v-list-item-content @contextmenu="$emit('rightClicked', $event)">
      <v-text-field
        v-if="id == activeId"
        placeholder="Project Name"
        autofocus
        :value="name"
        @input="(value) => $emit('update:name', value)"
        @blur="$emit('inputBlur')"
        @keyup.enter="$emit('inputUpEnter')"

      ></v-text-field>
      <v-list-item-title v-else>{{name}}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click="$emit('addClicked')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    props: ['id', 'activeId', 'name'],
});
</script>
