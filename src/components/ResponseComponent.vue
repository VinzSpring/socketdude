<template>
  <v-tabs v-if="socket" :key="tabsId" v-model="tab">
    <v-tab
      v-for="activator in socket.getActivators()"
      :key="activator.getId()"
      ripple
      @contextmenu="(e) => openMenu(e, activator)"
    >
      <v-text-field
        v-if="rename && selectedActivator && selectedActivator.getId() === activator.getId()"
        v-model="activator.title"
        flat
        autofocus
        @blur="() => {rename = false; selectedActivator = null}"
      ></v-text-field>
      <div v-else>{{activator.title}}</div>
    </v-tab>
    <v-btn fab small ripple light @click="addActivator">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-tabs-items v-model="tab">
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
import { Activator, ResponseHandler } from '@/structs/response-handler';
import ResponseForm from '@/components/ResponseForm.vue';
import BufferedSocket from '@/structs/buffered-socket';
import Menu from '@/structs/menu';
import { Component, Vue} from 'vue-property-decorator';

@Component({
  components: {
    ResponseForm,
  },
})
export default class ResponseComponent extends Vue {
  tab = null;
  // right click context-menu
  menu = new Menu(); 
  // selected activator
  selectedActivator: Activator | null = null;
  // rename mode active?
  rename = false; 

  addActivator(): void {
    // add Activator to active socket
    if (!this.socket) {
      return;
    }
    this.socket.addActivator(
      new Activator(
        this.socket.getActivators().length.toString(), // set some initial activator name
        null,
        new ResponseHandler(),
      ),
    );
  }

  openMenu(e: MouseEvent, activator: Activator): void {
    e.preventDefault();
    this.menu.isShow = false;
    this.menu.x = e.clientX;
    this.menu.y = e.clientY;
    this.selectedActivator = activator;
    this.$nextTick(() => {
      // open menu next tick
      this.menu.isShow = true;
    });
  }

  deleteItem(): void {
    if (this.selectedActivator) {
      this.socket?.removeActivator(this.selectedActivator);
      this.menu.isShow = false; // close menu
    }
  }

  renameItem(): void {
    if (this.selectedActivator) {
      this.rename = true;
    }
  }

  //@Watch('active')
  //onActiveChange(index: number) {
  //    this.activeTabindex[this.socket.getId()] = index; // save activce tab index for socket
  //}

  //@Watch('socket')
  //onSocketChange(s: BufferedSocket) {
  //  if (this.socket?.getId() === s.getId()) {
  //    return;
  //  } else {
  //    this.active = this.activeTabindex[s.getId()];
  //  }
  //}

  // eslint-disable-next-line
  get state() {
    return this.$store.state;
  }

  get socket(): BufferedSocket | null {
    const socket: BufferedSocket = this.state.selectedSocket;
    if (socket) {
      return socket;
    } else {
      return null;
    }
  }

  get tabsId(): string {
    return `${this.socket?.getId()}${this.socket?.getActivators().length}`;
  }

}
</script>
