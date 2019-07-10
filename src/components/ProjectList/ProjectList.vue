<template>
  <v-layout fill-height column>
    <v-flex>
      <Searchbar :search.sync="search" @addClicked="addProject"/>
    </v-flex>
    <v-flex xs12 class="scroll-y">
      <v-layout fill-height align-center v-if="loadingProjects">
        <v-flex>
          <p class="text-xs-center">loading...</p>
        </v-flex>
      </v-layout>
      <v-list v-else>
        <template v-for="(project, projectIndex) in projects">
          <ProjectTile
            :key="`project-${projectIndex}`"
            :id="project.getId()"
            :activeId="activeId"
            :name.sync="project.name"
            @rightClicked="openMenu($event, project.getId(), projectIndex, null)"
            @inputBlur="rename(project, `project-${projectIndex}`)"
            @inputUpEnter="rename(project, `project-${projectIndex}`)"
            @addClicked="addSocket(projectIndex)"
          />
          <template v-for="(socket, socketIndex) in project.sockets">
            <SocketTile
              :key="`socket${projectIndex}-${socketIndex}`"
              :id="socket.getId()"
              :activeId="activeId"
              :activeSocketId="activeSocketId"
              :name.sync="socket.name"
              :missedMessages="socket.missedMessages"
              :status="socket.websocket ? socket.websocket.readyState : -1"
              @rightClicked="openMenu($event, socket.getId(), projectIndex, socket)"
              @clicked="setSocket(socket)"
              @inputBlur="rename(socket, `socket-${socketIndex}`)"
              @inputUpEnter="rename(socket, `socket-${socketIndex}`)"
            />
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
import Vue from 'vue';
import Searchbar from './Searchbar.vue';
import ProjectTile from './ProjectTile.vue';
import SocketTile from './SocketTile.vue';
import BufferedSocket from '@/structs/buffered-socket';
import Menu from '@/structs/menu';

interface ISelectedItem {
  id: number;
  projectIndex: number;
  socket: BufferedSocket;
}

export default Vue.extend({
  name: 'ProjectList',
  components: {
    Searchbar,
    ProjectTile,
    SocketTile
  },
  data() {
    return {
      activeId: null,
      activeSocketId: null,
      menu: new Menu(),
      search: '',
      selectedItem: {} as ISelectedItem,
      loadingProjects: false,
    };
  },
  methods: {
    openMenu(
      e: MouseEvent,
      id: number,
      projectIndex: number,
      socket: BufferedSocket,
    ) {
      e.preventDefault();
      this.menu.isShow = false;
      this.menu.x = e.clientX;
      this.menu.y = e.clientY;
      this.selectedItem = {
        id,
        projectIndex,
        socket,
      };
      this.$nextTick(() => {
        this.menu.isShow = true;
      });
    },
    addProject() {
      this.$store.commit(
        'addProject',
        (project) => (this.activeId = project.getId()),
      );
    },
    addSocket(projectIndex: number) {
      this.$store.commit('addSocket', {
        projectIndex,
        callback: (socket) => (this.activeId = socket.getId()),
      });
    },
    setSocket(socket: BufferedSocket) {
      this.$store.commit('setActiveSocket', socket);
      this.activeSocketId = socket.getId();
    },
    rename(item, name) {
      item.name ? null : (item.name = name);
      this.activeId = null;
    },
    renameItem() {
      this.activeId = this.selectedItem.id;
    },
    deleteItem() {
      this.$store.commit('deleteItem', {
        projectIndex: this.selectedItem.projectIndex,
        socket: this.selectedItem.socket,
      });
    },
  },
  computed: {
    projects() {
      return this.$store.state.projects.filter((project) => {
        return (
          project.name.toLowerCase().includes(this.search.toLowerCase()) ||
          project.sockets.find((socket) =>
            socket.name.toLowerCase().includes(this.search.toLowerCase()),
          )
        );
      });
    },
  },
});
</script>
