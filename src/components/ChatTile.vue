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
        <v-card elevation="5" :color="messageColor">
          <v-card-text>
            <pre v-html="formattedMessage"></pre>
          </v-card-text>
          <v-card-actions>
            <v-btn flat icon @click="showRaw = !showRaw">
              <v-icon>tonality</v-icon>
            </v-btn>
          </v-card-actions>
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
import { escape } from "querystring";

export default Vue.extend({
  name: "ChatTile",
  props: {
    message: ChatMessage
  },
  data() {
    return {
      showRaw: false
    };
  },
  computed: {
    formattedMessage(): string { // format message text depending on content type
      let formatted: string = this.message.text;
      if (this.showRaw) { // show raw, escaped string
        formatted = JSON.stringify(formatted);
      } else {
        formatted = prettyJson(formatted); // format if text contains json
      }
      return formatted;
    },
    time(): String { // format time
      const date = this.message.dateSent;
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
    messageColor() { // determine message background-color
      switch (this.message.msgType) {
        case MESSAGE_TYPE.INCOMING:
          return SEMANTIC_COLORS.INCOMING;
        case MESSAGE_TYPE.OUTGOING:
          return SEMANTIC_COLORS.OUTGOING;
        case MESSAGE_TYPE.ERROR:
          return SEMANTIC_COLORS.ERROR;
        case MESSAGE_TYPE.SUCCESS:
          return SEMANTIC_COLORS.SUCCESS;
        default:
          break;
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

/*csstricks.com*/
/* Browser specific (not valid) styles to make preformatted text wrap */

pre {
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>
