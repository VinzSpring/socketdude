<template>
  <v-list-item
    class="secondary"
    :class="{active: id == activeSocketId, connected: status == 1}"
    @click="$emit('clicked')"
  >
    <v-list-item-content
      class="socket-item"
      @contextmenu="$emit('rightClicked', $event)"
    >
      <v-text-field
        v-if="id == activeId"
        placeholder="Socket Name"
        :value="name"
        @input="(value) => $emit('update:name', value)"
        autofocus
        @blur="$emit('inputBlur')"
        @keyup.enter="$emit('inputUpEnter')"
      ></v-text-field>
      <v-list-item-title v-else>{{name}}</v-list-item-title>
    </v-list-item-content>
     <v-list-item-action v-if="missedMessages > 0">
       <v-chip color="red" text-color="white">
         {{missedMessages}}
       </v-chip>
      </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'SocketTile',
    props: ['id', 'missedMessages', 'activeId', 'activeSocketId', 'name', 'messageLength', 'status'],
});
</script>

<style lang="sass">
    .socket-item
        padding-left: 80px
    .active > a
        background: rgba(255,255,255,0.2)
    .connected > a
        border-right: 5px solid #4caf50
</style>
