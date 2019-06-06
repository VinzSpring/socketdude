<template>
  <v-tabs v-if="socket" :key="tabsId">
    <v-tab
      v-for="activator in socket.getActivators()"
      :key="activator.getId()"
      ripple
      @contextmenu="(e) => openMenu(e, activator)"
    >{{activator.title}}</v-tab>
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
import Vue from "vue";
import { Activator, ResponseHandler } from "@/structs/response-handler.ts";
import ResponseForm from "@/components/ResponseForm.vue";
import BufferedSocket from "@/structs/buffered-socket";

export default Vue.extend({
  name: "ResponseComponent",
  components: {
    ResponseForm
  },
  props: {},
  data() {
    return {
      menu: {
        isShow: false,
        x: 0,
        y: 0,
      } as IMenu,
      selectedActivator: null
    };
  },
  mounted() {},
  methods: {
    addActivator() {
      //add Activator to active socket
      if (!this.socket) return;
      this.socket.addActivator(
        new Activator(
          this.socket.getActivators().length,
          new RegExp(".+"),
          new ResponseHandler()
        )
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
      }
    },
    renameItem() {
      //TODO rename
    }
  },
  watch: {
    active(index: number) {
      this.activeTabindex[this.socket.getId()] = index;
    },
    socket(s) {
      if (this.socket.getId() == s.getId()) return;
      else this.active = this.activeTabindex[s.getId()];
    }
  },
  computed: {
    state() {
      return this.$store.state;
    },
    socket() {
      let socket: BufferedSocket = this.state.selectedSocket;
      if (socket) {
        return socket;
      } else return null;
    },
    tabsId() {
      return `${this.socket.getId()}${this.socket.getActivators().length}`;
    }
  }
});
</script>


<style scoped>
</style>
