<template>
  <v-list-tile
    class="secondary"
    :class="{active: id == activeSocketId, connected: status == 1}"
    @click="$emit('clicked')"
  >
    <v-list-tile-content
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
      <v-list-tile-title v-else>{{name}}</v-list-tile-title>
    </v-list-tile-content>
     <v-list-tile-action v-if="id != activeSocketId && this.messageCount > 0">
       <v-chip color="red" text-color="white">
         {{messageCount}}
       </v-chip>
      </v-list-tile-action>
  </v-list-tile>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'SocketTile',
    props: ['id', 'activeId', 'activeSocketId', 'name', 'messageLength', 'status'],
    data() {
      return {
        messageCount: 0
      };
    },
    watch: {
      messageLength(newValue, oldValue) {
        if(this.id != this.activeSocketId) {
          if(newValue != oldValue) {
            this.messageCount = newValue;
          }
        }
      }
    },
})
</script>

<style lang="sass">
    .socket-item
        padding-left: 80px
    .active > a
        background: rgba(255,255,255,0.2);
    .connected > a
        border-right: 5px solid #4caf50;
</style>
