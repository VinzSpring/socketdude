<template>
  <v-container fill-height grid-list-xs>
    <v-layout column>
      <v-flex xs1>
        <v-text-field v-model="regex" :rules="[rules.required, rules.isRegEx]" outline label="activation RegEx"></v-text-field>
      </v-flex>
      <v-spacer/>
      <v-flex xs10>
        <v-tabs centered>
          <v-tab>JSON</v-tab>
          <v-tab>Text/Plain</v-tab>
          <v-tab>Javascipt</v-tab>
          <v-tabs-items>
            <v-tab-item>
              <v-textarea height="50vh" box></v-textarea>
            </v-tab-item>

            <v-tab-item>
              <v-textarea height="50vh" box></v-textarea>
            </v-tab-item>

            <v-tab-item>
              <v-textarea height="50vh" box></v-textarea>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ResponseForm",
  components: {},
  data() {
    return {
      regex: "",
      rules: {
        required: (regex: string) => !!regex || "Required.",
        isRegEx: (regex: string) => {
          try {
            new RegExp(regex);
            return true;
          } catch(_){}
          return "Not a valid pattern.";
        },
      }
    };
  }
});
</script>

<style scoped>
</style>
