import Vue from 'vue';
import Vuex from 'vuex';

import BufferedSocket from '@/structs/buffered-socket'

import projects from './modules/projects'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects,
  },
  state: {
    selectedSocket: null
  },
  mutations: {
    setSocketId(state: any, socket: BufferedSocket) {
      state.selectedSocket = socket;
    }
  }
});
