<template>
    <div class="container">
        <button style="height: 100px; width: 100%" @click="addProject"></button>
        <div v-for="project in projects" :key="project.guid">
            <project-node :project="project"></project-node>
        </div>
    </div>
</template>


<script>
    import ProjectNode from "./projectNode";
    import Socket from "./socket";
    import {CachedWebsocket, WebsocketProject} from "../../../obj/sckt";
    import EVENTS from "../../../obj/EVENTS";

    export default {
        name: "projectContainer",
        components: {Socket, ProjectNode},

        data: function () {
            return {
                projects: [],
            }
        },

        mounted() {
            this.$on(EVENTS.ON_SOCKET_CLICKED, this.socketClicked);
            this.$on(EVENTS.ON_PROJECT_CLICKED, this.projectClicked);
        },

        methods: {
            addProject() {
                //show name modal
                this.projects.push(
                    new WebsocketProject("test project")
                )
            },
            projectClicked(project) {
                console.log(project);

                this.$parent.$emit(EVENTS.ON_SOCKET_CLICKED, project);
            },
            socketClicked(socket) {
                console.log(socket);

                this.$parent.$emit(EVENTS.ON_SOCKET_CLICKED, socket);
            },
        },
    }
</script>

<style scoped>
    .container {
        width: 100%;

        background-color: inherit;
        color: white;
    }
</style>