<template>
  <v-tabs v-if="socket" v-model="socket.activeActivatorIndex">
    <v-tab
      v-for="activator in socket.getActivators()"
      :key="activator.getId()"
      ripple
    >{{activator.title}}</v-tab>
    <v-btn fab small ripple light @click="addActivator">
      <v-icon>add</v-icon>
    </v-btn>
    <v-tabs-items>
      <v-tab-item
        grow
        v-for="activator in socket.getActivators()"
        :key="activator.getId()"
      >
        <ResponseForm/>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>


<script lang="ts">
import Vue from "vue";
import { Activator, ResponseHandler } from "@/structs/response-handler.ts";
import ResponseForm from "@/components/ResponseForm.vue";
import BufferedSocket from "@/structs/buffered-socket";

export default Vue.extend({
  name: "ResponseView",
  components: {
    ResponseForm
  },
  props: {
    //activators: Array
  },
  mounted() {},
  data() {
    return {
      //active: null,
    };
  },
  methods: {
    addActivator() {
      //add Activator to active socket
      if (!this.socket) return;
      this.socket.addActivator(
        new Activator("new", new RegExp(""), new ResponseHandler())
      );
    }
  },
  watch: {
    active(index: number) {
      this.activeTabindex[this.socket.getId()] = index;
    },
    socket(s) {
      if(this.socket.getId() == s.getId())
        return;
      else
        this.active = this.activeTabindex[s.getId()];
    }
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
    }
  }
});
</script>


<style scoped>
</style>
