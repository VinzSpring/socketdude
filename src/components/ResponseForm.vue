<template>
  <v-container fill-height grid-list-xs>
    <v-layout column>
      <v-flex xs1>
        <v-text-field
          v-model="regex"
          :rules="[rules.required, rules.isRegEx]"
          outline
          label="activation RegEx"
          hint="single group regex. If match the active text box's content/result will be returned."
        ></v-text-field>
      </v-flex>
      <v-spacer/>
      <v-flex xs10>
        <v-tabs v-model="activeMode" centered>
          <v-tab>JSON</v-tab>
          <v-tab>Text/Plain</v-tab>
          <v-tab>Javascipt</v-tab>
          <v-tabs-items>
            <!--ORDER OF TABS IS CRITICAL SINCE THE ACTIVE TAB'S INDEX GETS CAST TO AN ENUM VALUE-->
            <v-tab-item>
              <v-textarea height="50vh" box v-model="txt"></v-textarea>
            </v-tab-item>

            <v-tab-item>
              <v-textarea height="50vh" box v-model="json"></v-textarea>
            </v-tab-item>

            <v-tab-item>
              <v-textarea height="50vh" box v-model="js"></v-textarea>
              Access the received message thru variable "msg", do stuff and return your response!
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import BufferedSocket from "@/structs/buffered-socket";
import { Activator } from "@/structs/response-handler";

export default Vue.extend({
  name: "ResponseForm",
  components: {},
  props: {
    activator: { type: Object as () => Activator, required: true }
  },
  data() {
    return {
      data: {},
      rules: {
        required: (regex: string) => !!regex || "Required.",
        isRegEx: (regex: string) => {
          try {
            new RegExp(regex);
            return true;
          } catch (_) {}
          return "Not a valid pattern.";
        }
      }
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
    socket() {
      let socket: BufferedSocket = this.state.selectedSocket;
      if (socket) {
        return socket;
      } else return null;
    },
    json: {
      //TODO validate
      get(): string {
        return this.activator.handler.getJsonResponse();
      },

      set(v: string) {
        this.activator.handler.setJsonResponse(v);
      }
    },
    txt: {
      //TODO validate
      get(): string {
        return this.activator.handler.getTextResponse();
      },

      set(v: string) {
        this.activator.handler.setTextResponse(v);
      }
    },
    js: {
      //TODO validate
      get(): string {
        return this.activator.handler.getJs();
      },

      set(v: string) {
        this.activator.handler.setJs(v);
      }
    },
    activeMode: {
      get(): number {
        return this.activator.handler.getMode();
      },
      set(v: number) {
        this.activator.handler.setMode(v);
      }
    },
    regex: {
      get(): RegExp {
        return this.activator.regex ? this.activator.regex.source : "";
      },
      set(v: string) {
        try {
          this.activator.regex = new RegExp(v); // not calling rules.isRegex for performance
        } catch (_) {}
      }
    }
  }
});
</script>

<style scoped>
</style>
