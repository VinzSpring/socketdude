<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs3 mr-3>
      <v-text-field placeholder="Url" :disabled="!socketSettings" v-model="url" :rules=[rules.url]></v-text-field>
    </v-flex>
    <v-flex xs3 mr-3>
      <v-select placeholder="Protocol" :items="[]" multiple :disabled="!socketSettings"></v-select>
    </v-flex>
    <v-btn icon flat @click="connect()" :disabled="!socketSettings">
      <v-icon>cached</v-icon>
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import SocketSettings from '../structs/socket-settings';
export default Vue.extend({
  name: "Settings",
  data() {
    return {
      url: '',
      protocols: [],
      clrMsgLimit: '',
      rules: {
        url: value => {
          const pattern = /ws[s]?:\/\/[A-z0-9]+\.[A-z]+/
          return pattern.test(value) || 'invalid url.'
        }
      }
    };
  },
  watch: {
    socketSettings(settings) {
      this.url = settings.url;
      this.protocols = settings.protocols;
      this.clrMsgLimit = settings.clrMsgLimit;
    }
  },
  methods: {
    connect() {
      //TODO: validate url
      this.$store.state.selectedSocket.setSettings(new SocketSettings(this.url, this.protocls, this.clrMsgLimit));
      this.$store.state.selectedSocket.connect();
    }
  },
  computed: {
    socketSettings() {
      return this.$store.state.selectedSocket ? this.$store.state.selectedSocket.getSettings() : null;
    }
  }
});
</script>

<style scoped>
</style>


