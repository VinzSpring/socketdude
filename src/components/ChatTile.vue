<template>
  <v-container pa-0 mb-2 grid-list>
    <v-layout column justify-space-between>
      <v-layout row align-center>
        <v-flex xs5>
          <div class="dateContainer">{{time}}</div>
        </v-flex>

        <v-flex xs7>
          <v-layout justify-end>
            <v-chip v-for="(tag, i) in message.tags" :key="i" :color="tag.color">{{tag.text}}</v-chip>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-flex xs12>
        <v-card elevation=5>
          <v-card-text>
            <pre v-html="formattedMessage"></pre>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import { ChatMessage } from "@/structs/chat-message.ts";
import prettyJson from "@/util/pretty-json";

export default Vue.extend({
  name: "ChatTile",
  props: {
    message: ChatMessage
  },
  computed: {
    formattedMessage(): string {
      let formatted = prettyJson(this.message.text);
      return formatted;
    },
    time(): String {
      let date = this.message.dateSent;
      return (
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds() +
        ":" +
        date.getMilliseconds()
      );
    }
  }
});
</script>

<style scoped>
.dateContainer {
  padding: 5px;
  color: grey;
}
</style>
