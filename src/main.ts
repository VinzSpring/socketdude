import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import store from './store/index';

import { app, remote, ipcRenderer } from 'electron';
import path from 'path';
import fs from 'fs';

// listen for save event trigged through electron menu
ipcRenderer.on('save', (event, filename) => {
  const userDataPath = (app || remote.app).getPath('userData');
  const filePath = path.join(userDataPath,  'projects.dude');

  fs.writeFileSync(filePath, JSON.stringify(store.state.projects));

  console.log('file saved');
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
