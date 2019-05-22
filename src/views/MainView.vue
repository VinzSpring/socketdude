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
          <v-card flat height="90vh" color="red">
            <SocketList/>
          </v-card>
        </v-flex>
        <v-flex xs5>
          <v-card flat height="90vh">
            <ResponseView :activators="activators"/>
          </v-card>
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
import Settings from "@/components/Settings";
import SocketList from "@/components/ProjectList";
import ResponseView from "./ResponseView.vue";

import { MESSAGES, ACTIVATORS } from "@/util/test-data";

export default Vue.extend({
  name: "MainView",
  components: {
    ChatView,
    Settings,
    SocketList,
    ResponseView,
  },
  data() {
    return {
      messages: MESSAGES, //testing
      activators: ACTIVATORS, //testing
    };
  },
  mounted() {

  }
});
</script>

<style scoped>
</style>
