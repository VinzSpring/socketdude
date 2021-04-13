import Vue from 'vue'
import Vuex from 'vuex'

import BufferedSocket from '@/structs/buffered-socket';
import { ChatMessage } from '@/structs/chat-message';
import projects from './modules/projects'
import VuexElectron from './plugins/vuex-electron'

Vue.use(Vuex)

interface State {
  selectedSocket: BufferedSocket | null
}

export default new Vuex.Store({
  state: {
    selectedSocket: null,
  } as State,
  mutations: {
    setActiveSocket(state, socket: BufferedSocket) {
      // reset missed messages
      socket.missedMessages = 0;
      state.selectedSocket = socket;
    },
    clearActiveChatMessages(state) {
      const msgs: ChatMessage[] | undefined = state.selectedSocket?.getMessages();
      msgs?.splice(0, msgs.length); // clearing this way is annoying, but necessary due to Vuex
    },
  },
  actions: {
  },
  modules: {
    projects,
  },
  plugins: [VuexElectron()],
})
