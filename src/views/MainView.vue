<template>
  <v-container fluid pa-0 ma-0 grid-list>
    <v-layout column align>
      <v-flex>
        <v-card height="10vh" flat color="green">
          <v-flex align-center></v-flex>
        </v-card>
      </v-flex>

      <v-layout row fill-height>
        <v-flex xs3>
          <v-card flat height="90vh" color="red">          <SocketList/></v-card>
        </v-flex>
        <v-flex xs5>
          <v-card flat height="90vh" color="blue">dashdaszd</v-card>
        </v-flex>
        <v-flex xs4>
          <v-card flat height="90vh">
            <ChatView :messages="messages"/>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ChatView from "./ChatView.vue";
import Settings from '@/components/Settings';
import SocketList from '@/components/ProjectList';

import { ChatMessage, MessageTag } from "@/structs/chat-message";
import { colors } from "vuetify/lib";

export default Vue.extend({
  name: "MainView",
  components: {
    ChatView,
        Settings,
    SocketList,
  },
  data() {
    return {
      messages: [] as ChatMessage[]
    };
  },
  mounted() {
    this.messages = [
      new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "green")]
      ),
      new ChatMessage('{"result":true, "count":42}', new Date(), [
        new MessageTag("automated", "green")
      ]),
      new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "blue")]
      ),
      new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "green")]
      ),
      new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "green")]
      ),
      new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "green")]
      ),
      new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "green")]
      ),
      new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "green")]
      ),
      new ChatMessage(
        '{"widget": { "debug": "on", "window": { "title": "Sample Konfabulator Widget", "name": "main_window", "width": 500, "height": 500 }, "image": { "src": "Images/Sun.png", "name": "sun1", "hOffset": 250, "vOffset": 250, "alignment": "center" }, "text": { "data": "Click Here", "size": 36, "style": "bold", "name": "text1", "hOffset": 250, "vOffset": 100, "alignment": "center", "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;" } }}',
        new Date(),
        [new MessageTag("automated", "green")]
      ),
      new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "green")]
      ),
      new ChatMessage(
        '{"menu": { "id": 11111,"enabled": true, "value": "File", "popup": { "menuitem": [ {"value": "New", "onclick": "CreateNewDoc()"}, {"value": "Open", "onclick": "OpenDoc()"}, {"value": "Close", "onclick": "CloseDoc()"} ] } }}',
        new Date(),
        [new MessageTag("automated", "green")]
      )
    ];
  }
});
</script>

<style scoped>
</style>
