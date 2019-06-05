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
    selectedSocket: null,
    forceRerender: null,
  },
  mutations: {
    setSocket(state: any, socket: BufferedSocket) {
      state.selectedSocket = socket;
      state.forceRerender = `force-${state.forceRerender + 1}`;
    }
  }
});
