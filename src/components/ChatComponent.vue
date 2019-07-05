<template>
  <v-container v-if="socket" fill-height pa-0 grid-list-xs>
    <v-layout column>
      <v-flex xs1>
        <v-layout justify-end>
          <v-btn fab flat @click="clearMessages()">
            <v-icon>clear_all</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs10 class="scrollable" ref="chatList">
        <ChatTile v-for="(message, i) in messages" :key="i" :message="message" />
      </v-flex>
      <v-flex xs1 pa-3>
        <v-text-field
          hide-details
          outline
          label="Message"
          @keyup.enter.native="sendMessage"
          v-model="msgTxt"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ChatTile from "@/components/ChatTile.vue";
import { ChatMessage } from "@/structs/chat-message";
import BufferedSocket from "@/structs/buffered-socket";

export default Vue.extend({
  name: "ChatView",
  components: {
    ChatTile
  },
  props: {
    // messages: Array
  },
  data() {
    return {
      msgTxt: "" as string
    };
  },
  methods: {
    sendMessage() {
      if (!this.socket || !this.socket.isConnected() || !this.msgTxt) {
        return;
      }
      this.socket.sendMessage(this.msgTxt);
      this.msgTxt = "";
    },
    clearMessages() {
      this.$store.commit('clearActiveChatMessages');
    },
  },
  computed: {
    messages(): ChatMessage {
      return this.socket ? this.socket.getMessages() : [];
    },
    state() {
      return this.$store.state;
    },
    socket(): BufferedSocket {
      const socket: BufferedSocket = this.state.selectedSocket;
      if (socket) {
        return socket;
      } else {
        return null;
      }
    }
  },
  watch: {
    messages(val: ChatMessage[]) {
      // scroll to bottom
      const container = this.$refs.chatList;
      if (!container) {
        return;
      }
      this.$nextTick(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }
});
</script>


<style scoped>
.scrollable {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
