import Vue from 'vue';
import Vuex from 'vuex';

import VuexElectron from '@/store/plugins/vuex-electron';
import BufferedSocket from '@/structs/buffered-socket';
import { ChatMessage } from '@/structs/chat-message';
import projects from './modules/projects';

Vue.use(Vuex);

// TODO add to UML
export default new Vuex.Store({
  plugins: [VuexElectron()],
  modules: {
    projects,
  },
  state: {
    selectedSocket: null,
    forceRerender: null,
    darkTheme: true,
    loadingProjects: true,
    filePath: null,
  },
  mutations: {
    setActiveSocket(state: any, socket: BufferedSocket) {
      // reset missed messages
      socket.missedMessages = 0;
      state.selectedSocket = socket;
    },
    clearActiveChatMessages(state: any) {
      let msgs:ChatMessage[] = state.selectedSocket.getMessages();
      msgs.splice(0, msgs.length); // clearing this way is annoying, but necessary due to Vuex
    } 
  },
});
