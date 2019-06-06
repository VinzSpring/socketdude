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
        <v-card elevation=5 :color="messageColor">
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
import { ChatMessage, MESSAGE_TYPE } from "@/structs/chat-message.ts";
import prettyJson from "@/util/pretty-json";
import SEMANTIC_COLORS from "@/util/semantic-colors";

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
    },
    messageColor() {
      switch(this.message.msgType) {
        case MESSAGE_TYPE.INCOMING: return SEMANTIC_COLORS.INCOMING;
        case MESSAGE_TYPE.OUTGOING: return SEMANTIC_COLORS.OUTGOING;
        case MESSAGE_TYPE.ERROR: return SEMANTIC_COLORS.ERROR;
        case MESSAGE_TYPE.SUCCESS: return SEMANTIC_COLORS.SUCCESS;
        default: break;
      }
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
