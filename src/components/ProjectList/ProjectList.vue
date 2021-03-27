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
        <v-list-item @click="deleteItem">
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
        <v-list-item @click="renameItem">
          <v-list-item-title>Rename</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Searchbar from './Searchbar.vue';
import ProjectTile from './ProjectTile.vue';
import SocketTile from './SocketTile.vue';
import BufferedSocket from '@/structs/buffered-socket';
import Menu from '@/structs/menu';
import Project from '@/structs/project';

interface ISelectedItem {
  id: number;
  projectIndex: number;
  socket: BufferedSocket;
}

@Component({
  components: {
    Searchbar,
    ProjectTile,
    SocketTile,
  },
})
export default class ProjectList extends Vue {
  activeId: number | null = null;
  activeSocketId: number | null = null;
  menu = new Menu();
  search = '';
  selectedItem = {} as ISelectedItem;
  loadingProjects = false;

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
  }

  addProject() {
    this.$store.commit(
      'addProject',
      (project: Project) => (this.activeId = project.getId()),
    );
  }

  addSocket(projectIndex: number) {
    this.$store.commit('addSocket', {
      projectIndex,
      callback: (socket: BufferedSocket) => (this.activeId = socket.getId()),
    });
  }

  setSocket(socket: BufferedSocket) {
    this.$store.commit('setActiveSocket', socket);
    this.activeSocketId = socket.getId();
  }

  rename(item: Project, name: string) {
    if (!item.name) {
      item.name = name;
    }
    this.activeId = null;
  }

  renameItem() {
    this.activeId = this.selectedItem.id;
  }

  deleteItem() {
    this.$store.commit('deleteItem', {
      projectIndex: this.selectedItem.projectIndex,
      socket: this.selectedItem.socket,
    });
  }

  get projects(): Project[] {
    return this.$store.state.projects.filter((project: Project) => {
      return (
        project.name.toLowerCase().includes(this.search.toLowerCase()) ||
        project.sockets.find((socket: BufferedSocket) =>
          socket.name.toLowerCase().includes(this.search.toLowerCase()),
        )
      );
    });
  }

}
</script>
