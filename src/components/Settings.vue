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
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon flat @click="connect()" v-on="on" :disabled="!socketSettings">
          <v-icon>compare_arrows</v-icon>
        </v-btn>
      </template>
      <span>re/connect</span>
    </v-tooltip>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import SocketSettings from "../structs/socket-settings";
export default Vue.extend({
  name: "Settings",
  data() {
    return {
      url: "",
      protocols: [],
      clrMsgLimit: "",
      rules: {
        url: value => {
          const pattern = /ws[s]?:\/\/[A-z0-9]+\.[A-z]+/;
          return pattern.test(value) || "invalid url.";
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
    async connect() {
      this.$store.state.selectedSocket.setSettings(
        new SocketSettings(this.url, this.protocls, this.clrMsgLimit)
      );
      try {
        await this.$store.state.selectedSocket.connect();
        console.log('connect: success');
      } catch(e) {
        // failed to connect
        console.error(e);
      }
    }
  },
  computed: {
    socketSettings() {
      return this.$store.state.selectedSocket
        ? this.$store.state.selectedSocket.getSettings()
        : null;
    }
  }
});
</script>

<style scoped>
</style>


