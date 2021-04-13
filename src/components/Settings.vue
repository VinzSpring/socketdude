<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs3 mr-3>
      <v-text-field
        placeholder="Url"
        :disabled="!socketSettings"
        v-model="url"
        :rules="[rules.url]"
      ></v-text-field>
    </v-flex>
    <v-flex xs3 mr-3>
      <v-select placeholder="Protocol" :items="[]" multiple :disabled="!socketSettings"></v-select>
    </v-flex>
    <v-flex xs1>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon text @click="connect()" v-on="on" :disabled="!socketSettings">
            <v-icon>mdi-compare-horizontal</v-icon>
          </v-btn>
        </template>
        <span>re/connect</span>
      </v-tooltip>
    </v-flex>
    <v-flex xs1>
      <v-switch v-model="$vuetify.theme.dark" :label="themeIcon"></v-switch>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import SocketSettings from '../structs/socket-settings';
import {isValidWebsocketUrl} from '@/util/url-tools'

export default Vue.extend({
  name: 'Settings',
  data() {
    return {
      url: '' as string,
      protocols: [] as string[],
      clrMsgLimit: Number.MAX_VALUE, // count of messages to keep/display in scrollview, currently not used
      rules: { // validation rules for url
        url: isValidWebsocketUrl,
      },
    };
  },
  watch: {
    socketSettings(settings) {
      this.url = settings.url;
      this.protocols = settings.protocols;
      this.clrMsgLimit = settings.clrMsgLimit;
    },
  },
  methods: {
    async connect() {
      this.$store.state.selectedSocket.setSettings(
        new SocketSettings(this.url, this.protocols, this.clrMsgLimit),
      );
      try {
        await this.$store.state.selectedSocket.connect();
      } catch (e) {
        // failed to connect
      }
    },
  },
  computed: {
    themeIcon() {
      return this.$vuetify.theme.dark ? '🌘' : '🌞';
    },
    socketSettings() {
      return this.$store.state.selectedSocket
        ? this.$store.state.selectedSocket.getSettings()
        : null;
    },
  },
});
</script>
