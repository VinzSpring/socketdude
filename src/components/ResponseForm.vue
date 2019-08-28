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
          <v-tab>Text/Plain</v-tab>
          <v-tab>JSON</v-tab>
          <v-tab>Javascipt</v-tab>
          <v-tabs-items>
            <!--ORDER OF TABS IS CRITICAL SINCE THE ACTIVE TAB'S INDEX GETS CAST TO AN ENUM VALUE-->
            <v-tab-item>
              <v-textarea height="50vh" box v-model="txt"></v-textarea>
            </v-tab-item>

            <v-tab-item>
              <v-textarea :rules="[rules.isJson]" height="50vh" box v-model="json"></v-textarea>
            </v-tab-item>

            <v-tab-item>
              <v-textarea height="50vh" box v-model="js"></v-textarea>Access the received message thru variable "msg", do stuff and return your response!
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
/* tslint:disable:no-unused-expression */
import Vue from 'vue';
import BufferedSocket from '@/structs/buffered-socket';
import { Activator } from '@/structs/response-handler';
import { isJson } from '@/util/pretty-json';

export default Vue.extend({
  name: 'ResponseForm',
  components: {},
  props: {
    activator: { type: Object as () => Activator, required: true },
  },
  data() {
    return {
      data: {},
      rules: {
        required: (regex: string): any => !!regex || 'Required.',
        isRegEx: (regex: string): any => {
          try {
            new RegExp(regex);
            return true;
            } catch (_) {
            // failed
            }
          return 'Not a valid pattern.';
        },
        isJson: (s: string): any => {
          return isJson(s) ? true : 'Invalid Json!';
        },
      },
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
    socket() {
      const socket: BufferedSocket = this.state.selectedSocket;
      if (socket) {
        return socket;
      } else { return null; }
    },
    json: {
      get(): string {
        return this.activator.handler.getJsonResponse();
      },

      set(v: string) {
        this.activator.handler.setJsonResponse(v);
      },
    },
    txt: {
      get(): string {
        return this.activator.handler.getTextResponse();
      },

      set(v: string) {
        this.activator.handler.setTextResponse(v);
      },
    },
    js: {
      get(): string {
        return this.activator.handler.getJs();
      },

      set(v: string) {
        this.activator.handler.setJs(v);
      },
    },
    activeMode: { // get active automated response mode
      get(): number {
        return this.activator.handler.getMode();
      },
      set(v: number) {
        this.activator.handler.setMode(v);
      },
    },
    regex: { // regex to use for activating this response handler
      get(): RegExp {
        return this.activator.regex ? this.activator.regex.source : '';
      },
      set(v: string) {
        if (!v) {
          this.activator.regex = null;
          return;
        }
        try {
          this.activator.regex = new RegExp(v); // not calling rules.isRegex for performance
        } catch (_) {
        // failed
        }
      },
    },
  },
});
</script>

<style scoped>
</style>
