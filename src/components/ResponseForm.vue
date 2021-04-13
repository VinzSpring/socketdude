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
          <v-tabs-items v-model="activeMode">
            <!--ORDER OF TABS IS CRITICAL SINCE THE ACTIVE TAB'S INDEX GETS CAST TO AN ENUM VALUE-->
            <v-tab-item>
              <v-textarea height="50vh" filled v-model="txt"></v-textarea>
            </v-tab-item>

            <v-tab-item>
              <v-textarea :rules="[rules.isJson]" height="50vh" filled v-model="json"></v-textarea>
            </v-tab-item>

            <v-tab-item>
              <v-textarea height="50vh" filled v-model="js"></v-textarea>Access the received message throw variable "msg", do stuff and return your response!
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
/* tslint:disable:no-unused-expression */
import { Component, Prop, Vue } from 'vue-property-decorator';
import BufferedSocket from '@/structs/buffered-socket';
import { Activator } from '@/structs/response-handler';
import { isJson } from '@/util/pretty-json';

@Component({})
export default class ResponseForm extends Vue {
  @Prop({type: Activator, required: true}) readonly activator!: Activator
  tab = null
  data = {};
  rules = {
    required: (regex: string): boolean | string => !!regex || 'Required.',
    isRegEx: (regex: string): boolean | string | void => {
      try {
        new RegExp(regex);
        return true;
      } catch (_) {
        // failed
      }
      return 'Not a valid pattern.';
    },
    isJson: (s: string): boolean | string => {
      return isJson(s) ? true : 'Invalid Json!';
    },
  }

  // eslint-disable-next-line
  get state() {
    return this.$store.state;
  }

  get socket(): BufferedSocket | null {
    const socket: BufferedSocket = this.state.selectedSocket;
    if (socket) {
      return socket;
    } else { return null; }
  }

  get json(): string {
    return this.activator.handler.getJsonResponse();
  }

  set json(v: string) {
    this.activator.handler.setJsonResponse(v);
  }

  get txt(): string {
    return this.activator.handler.getTextResponse();
  }

  set txt(v: string) {
    this.activator.handler.setTextResponse(v);
  }

  get js(): string {
    return this.activator.handler.getJs();
  }

  set js(v: string) {
    this.activator.handler.setJs(v);
  }

  // get active automated response mode
  get activeMode(): number {
    return this.activator.handler.getMode();
  }

  set activeMode(v: number) {
    this.activator.handler.setMode(v);
  }

  // egex to use for activating this response handler
  get regex(): RegExp | string {
    return this.activator.regex ? this.activator.regex.source : '';
  }

  set regex(v: RegExp | string) {
    if (!v) {
      this.activator.regex = null;
      return;
    }
    try {
      this.activator.regex = new RegExp(v); // not calling rules.isRegex for performance
    } catch (_) {
      // failed
    }
  }
}
</script>
