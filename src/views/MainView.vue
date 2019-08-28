<template>
  <v-container fluid pa-0 ma-0 grid-list>
    <v-dialog v-model="showSplashScreen" width="50%" height="50%">
      <SplashScreen></SplashScreen>
    </v-dialog>
    <v-layout column align>
      <v-flex align-center>
        <v-card height="10vh" flat>
          <Settings />
        </v-card>
      </v-flex>

      <v-layout row fill-height>
        <v-flex xs3>
          <v-card flat class="projectListContainer" height="90vh">
            <ProjectList />
          </v-card>
        </v-flex>
        <v-flex xs5>
          <v-card flat height="90vh">
            <ResponseComponent />
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card flat height="90vh">
            <ChatComponent />
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import ChatComponent from '@/components/ChatComponent.vue';
import Settings from '@/components/Settings.vue';
import ProjectList from '@/components/ProjectList';
import ResponseComponent from '@/components/ResponseComponent.vue';
import SplashScreen from '@/components/SplashScreen.vue';

export default Vue.extend({
  name: 'MainView',
  components: {
    ChatComponent,
    Settings,
    ProjectList,
    ResponseComponent,
    SplashScreen,
  },
  mounted() {
    this.showSplashScreen = true;
    window.setTimeout(() => {
      this.showSplashScreen = false;
    }, 3500);
  },
  data() {
    return {
      showSplashScreen: false,
    };
  },
});
</script>

<style scoped>
.projectListContainer {
  border-right: 1px dotted;
}
</style>
