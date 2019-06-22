<template>
  <v-textarea :height="height" grow ripple v-model="text">

  </v-textarea>
</template>

<script lang="ts">
import Vue from 'vue';
import { syntaxHighlight } from '@/util/pretty-json';

export default Vue.extend({
    name: 'CodeBox',
    props: {
        height: String,
    },
    data() {
        return {
            text: '',
        };
    },
    watch: {
        text(val) {
            // highlight, format
        },
    },
});
</script>

<style scoped>
</style>
