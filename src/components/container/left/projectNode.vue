<template>
    <div>
        <div class="node" @click="onClick">
            <svg width="50px" height="45px">
                <svg width="47" height="37" viewBox="0 0 47 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.9166 0.166656H5.16665C2.64581 0.166656 0.60623 2.22916 0.60623 4.74999L0.583313 32.25C0.583313 34.7708 2.64581 36.8333 5.16665 36.8333H41.8333C44.3541 36.8333 46.4166 34.7708 46.4166 32.25V9.33332C46.4166 6.81249 44.3541 4.74999 41.8333 4.74999H23.5L18.9166 0.166656Z"
                          fill="white"></path>
                </svg>
            </svg>

            <div>
                {{this.project.name}}
            </div>

            <svg width="30px" height="30px" @click="addWebsocket">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.6667 0H3.33333C1.48333 0 0 1.5 0 3.33333V26.6667C0 28.5 1.48333 30 3.33333 30H26.6667C28.5 30 30 28.5 30 26.6667V3.33333C30 1.5 28.5 0 26.6667 0ZM23.3333 16.6667H16.6667V23.3333H13.3333V16.6667H6.66667V13.3333H13.3333V6.66667H16.6667V13.3333H23.3333V16.6667Z"
                          fill="white"></path>
                </svg>
            </svg>
        </div>
        <div v-for="socket in sockets" :key="socket.guid">
            <Socket :socket="socket"></Socket>
        </div>
    </div>
</template>


<script>
    import {CachedWebsocket} from "../../../obj/sckt";
    import Socket from "./socket";
    import EVENTS from "../../../obj/EVENTS";

    export default {
        name: "projectNode",
        components: {Socket},
        props: {
            project: {
                type: Object,
                required: true,
            },
        },

        data: function () {
            return {
                sockets: [],
            }
        },

        created() {
            this.$on(EVENTS.ON_SOCKET_CLICKED, (socket)=>this.$parent.$emit(EVENTS.ON_SOCKET_CLICKED, socket));
            this.$on(EVENTS.ON_DELETE_SOCKET, this.onDeleteSocket);
        },

        methods: {
            addWebsocket() {
                this.sockets.push(new CachedWebsocket())
            },
            onClick(e) {
                this.$emit(EVENTS.ON_PROJECT_CLICKED, this.project);
            },
            onDeleteSocket(socket) {
                this.sockets = this.sockets.filter(s=>s.guid !== socket.guid);
            },
        }
    }
</script>

<style scoped>
    .node {
        width: 100%;
        height: 70px;

        background-color: #3F3C3C;
        color: white;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }
</style>