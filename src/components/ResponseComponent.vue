<template>
  <v-tabs v-if="socket" :key="tabsId">
    <v-tab
      v-for="activator in socket.getActivators()"
      :key="activator.getId()"
      ripple
      @contextmenu="(e) => openMenu(e, activator)"
    >
      <v-text-field
        v-if="rename && selectedActivator && selectedActivator.getId() == activator.getId()"
        v-model="activator.title"
        flat
        autofocus
        @blur="() => {rename = false; selectedActivator = null}"
      ></v-text-field>
      <div v-else>{{activator.title}}</div>
    </v-tab>
    <v-btn fab small ripple light @click="addActivator">
      <v-icon>add</v-icon>
    </v-btn>
    <v-tabs-items>
      <v-tab-item grow v-for="activator in socket.getActivators()" :key="activator.getId()">
        <ResponseForm :activator="activator"/>
      </v-tab-item>
    </v-tabs-items>
    <v-menu v-model="menu.isShow" :position-x="menu.x" :position-y="menu.y" absolute offset-y>
      <v-list>
        <v-list-tile @click="deleteItem">
          <v-list-tile-title>Delete</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="renameItem">
          <v-list-tile-title>Rename</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-tabs>
</template>


<script lang="ts">
import Vue from 'vue';
import { Activator, ResponseHandler } from '@/structs/response-handler.ts';
import ResponseForm from '@/components/ResponseForm.vue';
import BufferedSocket from '@/structs/buffered-socket';
import Menu from '@/structs/menu';

export default Vue.extend({
  name: 'ResponseComponent',
  components: {
    ResponseForm,
  },
  props: {},
  data() {
    return {
      menu: new Menu(),
      selectedActivator: null,
      rename: false,
    };
  },
  mounted() {},
  methods: {
    addActivator() {
      // add Activator to active socket
      if (!this.socket) { return; }
      this.socket.addActivator(
        new Activator(
          this.socket.getActivators().length,
          null,
          new ResponseHandler(),
        ),
      );
    },
    openMenu(e: MouseEvent, activator: Activator) {
      e.preventDefault();
      this.menu.isShow = false;
      this.menu.x = e.clientX;
      this.menu.y = e.clientY;
      this.selectedActivator = activator;
      this.$nextTick(() => {
        this.menu.isShow = true;
      });
    },
    deleteItem() {
      if (this.selectedActivator) {
        this.socket.removeActivator(this.selectedActivator);
        this.menu.isShow = false;
      }
    },
    renameItem() {
      if (this.selectedActivator) {
        this.rename = true;
      }
    },
  },
  watch: {
    active(index: number) {
      this.activeTabindex[this.socket.getId()] = index;
    },
    socket(s) {
      if (this.socket.getId() == s.getId()) { return; }
      else { this.active = this.activeTabindex[s.getId()]; }
    },
  },
  computed: {
    state() {
      return this.$store.state;
    },
    socket() {
      const socket: BufferedSocket = this.state.selectedSocket;
      if (socket) {
        return socket;
      } else { return null; }
    },
    tabsId() {
      return `${this.socket.getId()}${this.socket.getActivators().length}`;
    },
  },
});
</script>


<style scoped>
</style>
