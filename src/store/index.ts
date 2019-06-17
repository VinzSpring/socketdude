import Vue from 'vue';
import Vuex from 'vuex';

import BufferedSocket from '@/structs/buffered-socket'

import projects from './modules/projects'

Vue.use(Vuex);

//TODO add to UML

export default new Vuex.Store({
  modules: {
    projects,
  },
  state: {
    selectedSocket: null,
    forceRerender: null,
    darkTheme: true,
  },
  mutations: {
    setActiveSocket(state: any, socket: BufferedSocket) {
      state.selectedSocket = socket;
    }
  }
});
