<template>
  <v-layout fill-height column>
    <v-flex>
      <v-toolbar pt-5>
        <v-text-field placeholder="Search" append-icon="search" v-model="search"></v-text-field>
        <v-btn icon @click="addProject">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>
    <v-flex xs12 class="scroll-y">
      <v-list>
        <template v-for="(project, projectIndex) in projects">
          <v-list-tile :key="`project-${projectIndex}`">
            <v-list-tile-avatar>
              <v-icon>folder</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content @contextmenu="openMenu($event, 0, projectIndex)">
              <v-text-field
                v-if="project.rename"
                placeholder="Project Name"
                :disabled="!project.rename"
                autofocus
                v-model="project.name"
                @blur="renameProject(projectIndex)"
                @keyup.enter="renameProject(projectIndex)"
              ></v-text-field>
              <v-list-tile-title v-if="!project.rename">{{project.name}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="addSocket(projectIndex)">
                <v-icon>add</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <template v-for="(socket, socketIndex) in project.sockets">
            <v-list-tile class="secondary" :key="`socket${projectIndex}-${socketIndex}`" @click="setSocketId(socket.bufferedSocket)">
              <v-list-tile-content
                class="socket-item"
                @contextmenu="openMenu($event, 1, projectIndex, socketIndex)"
              >
                <v-text-field
                  v-if="socket.rename"
                  placeholder="Socket Name"
                  v-model="socket.name"
                  :disabled="!socket.rename"
                  autofocus
                  @blur="renameSocket(projectIndex, socketIndex)"
                  @keyup.enter="renameSocket(projectIndex, socketIndex)"
                ></v-text-field>
                <v-list-tile-title v-if="!socket.rename">{{socket.name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-divider :key="projectIndex"></v-divider>
        </template>
      </v-list>
    </v-flex>
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
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import BufferedSocket from '@/structs/buffered-socket';

interface IMenu {
  isShow: Boolean;
  x: Number;
  y: Number;
}

interface ISelectedItem {
  element: HTMLElement;
  type: Number;
  projectIndex: number;
  socketIndex: number;
}

class Project {
  name: string;
  rename: Boolean;
  sockets: Array<Socket>;
  constructor(name: string, rename: Boolean, sockets: Array<Socket>) {
    this.name = name;
    this.rename = rename;
    this.sockets = sockets;
  }
}

class Socket {
  name: string;
  rename: Boolean;
  bufferedSocket: BufferedSocket = new BufferedSocket();
  constructor(name: string, rename: Boolean) {
    this.name = name;
    this.rename = rename;
  }
}

export default Vue.extend({
  name: "ProjectList",
  data() {
    return {
      menu: {
        isShow: false,
        x: 0,
        y: 0
      } as IMenu,
      search: "",
      selectedItem: {} as ISelectedItem
    };
  },
  methods: {
    openMenu(
      e: MouseEvent,
      type: Number,
      projectIndex: number,
      socketIndex: number
    ) {
      e.preventDefault();
      this.menu.isShow = false;
      this.menu.x = e.clientX;
      this.menu.y = e.clientY;
      this.selectedItem = {
        element: e.target.getElementsByTagName("input")[0],
        type,
        projectIndex,
        socketIndex
      };
      this.$nextTick(() => {
        this.menu.isShow = true;
      });
    },
    addProject() {
      this.$store.commit("addProject", new Project("", true, []));
    },
    addSocket(projectIndex: number) {
      this.$store.commit("addSocket", {
        projectIndex,
        socket: new Socket("", true)
      });
    },
    setSocketId(socket: any) {
      this.$store.commit('setSocketId', socket._id)
    },
    renameProject(index: number) {
      this.$store.commit("renameProject", index);
    },
    renameSocket(projectIndex: number, socketIndex: number) {
      this.$store.commit("renameSocket", { projectIndex, socketIndex });
    },
    renameItem() {
      // TODO: check if this should be async to focus
      this.$store.commit("renameItem", {
        type: this.selectedItem.type,
        projectIndex: this.selectedItem.projectIndex,
        socketIndex: this.selectedItem.socketIndex
      });
      this.selectedItem.element.focus();
    },
    deleteItem() {
      this.$store.commit("deleteItem", {
        type: this.selectedItem.type,
        projectIndex: this.selectedItem.projectIndex,
        socketIndex: this.selectedItem.socketIndex
      });
    }
  },
  computed: {
    projects() {
      return this.$store.state.projects.filter(project => {
        return (
          project.name.toLowerCase().includes(this.search.toLowerCase()) ||
          project.sockets.find(socket =>
            socket.name.toLowerCase().includes(this.search.toLowerCase())
          )
        );
      });
    }
  }
});
</script>

<style lang="sass" scoped>
    .socket-item
        padding-left: 80px
</style>
