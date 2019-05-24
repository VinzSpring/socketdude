<template>
  <v-tabs v-model="active">
    <v-tab v-for="activator in activators" :key="activator.title" ripple>{{activator.title}}</v-tab>
    <v-btn fab small ripple light @click="addActivator">
      <v-icon>add</v-icon>
    </v-btn>
    <v-tabs-items>
      <v-tab-item grow v-for="activator in activators" :key="activator.title">
        <ResponseForm/>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>


<script lang="ts">
import Vue from "vue";
import { Activator } from "@/structs/response-handler.ts";
import ResponseForm from "@/components/ResponseForm.vue";

export default Vue.extend({
  name: "ResponseView",
  components: {
    ResponseForm
  },
  props: {
    activators: Array
  },
  data() {
    return {
      active: null
    };
  },
  methods: {
    addActivator() {
      //add Activator to active socket
    }
  },
});
</script>


<style scoped>
</style>
