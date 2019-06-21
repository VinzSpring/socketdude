import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import store from './store/index';
import {ipcRenderer} from 'electron';
import ElectronStore from './util/electronStore';

const electronStore = new ElectronStore();

// listen for save event trigged through electron menu
ipcRenderer.on('save', (event, filename) => {
  electronStore.write(store.state.projects);
  console.log('file saved');
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
