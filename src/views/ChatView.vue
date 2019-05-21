<template>
    <v-container fill-height pa-0 grid-list-xs>
      <v-layout column>
        <v-flex xs11 class="scrollable">
          <ChatTile v-for="(message, i) in messages" :key="i" :message="message"/>
        </v-flex>
        <v-flex xs1 pa-3>
          <v-text-field hide-details outline label="Message"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import ChatTile from "@/components/ChatTile.vue";
import { ChatMessage } from "@/structs/chat-message";
export default Vue.extend({
  name: "ChatView",
  components: {
    ChatTile
  },
  props: {
    messages: Array
  },
  data() {
    return {};
  }
});
</script>


<style scoped>
.scrollable {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
