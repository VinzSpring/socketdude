import Vue from 'vue';
import Vuex from 'vuex';

import projects from './modules/projects'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects,
  },
  state: {
    selectedSocketId: null
  },
  mutations: {
    setSocketId(state: any, id: number) {
      state.selectedSocketId = id;
    }
  }
});
