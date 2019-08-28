<template>
  <v-card class="mx-auto pa-2">
    <v-card-title><b>SocketDude v0.1</b></v-card-title>
    <v-img :src="logo_image"></v-img>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'SplashScreen',
  data() {
    return {
      logo_image: require('../assets/socket_dude_logo.png'),
    };
  },
});
</script>