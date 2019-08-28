import Vue from 'vue';
import Vuex from 'vuex';

import VuexElectron from '@/store/plugins/vuex-electron';
import BufferedSocket from '@/structs/buffered-socket';
import { ChatMessage } from '@/structs/chat-message';
import projects from './modules/projects';

Vue.use(Vuex);

// TODO add this to UML?! (how?????
export default new Vuex.Store({
  plugins: [VuexElectron()] as any[],
  modules: {
    projects,
  },
  state: {
    selectedSocket: null as BufferedSocket,
    forceRerender: null as boolean,
    darkTheme: true as boolean,
    loadingProjects: true as boolean,
    filePath: null as string,
  },
  mutations: {
    setActiveSocket(state: any, socket: BufferedSocket) {
      // reset missed messages
      socket.missedMessages = 0;
      state.selectedSocket = socket;
    },
    clearActiveChatMessages(state: any) {
      const msgs: ChatMessage[] = state.selectedSocket.getMessages();
      msgs.splice(0, msgs.length); // clearing this way is annoying, but necessary due to Vuex
    },
  },
});
