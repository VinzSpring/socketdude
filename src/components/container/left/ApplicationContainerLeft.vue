<template>
    <div id="containerLeft">
        <div class="containerHead">
            Projects
        </div>
        <search></search>
        <hr style="width: 100%"/>
        <project-container :sockets="sockets"></project-container>
    </div>
</template>

<script>
    import Search from "./search";
    import ProjectContainer from "./projectContainer";
    import EVENTS from "../../../obj/EVENTS";
    import {CachedWebsocket} from "../../../obj/sckt";

    export default {
        name: "ApplicationContainerLeft",
        components: {ProjectContainer, Search},
        mounted: function () {
            this.$on(EVENTS.ON_SOCKET_CLICK, (socket) => {this.chosenSocket = socket});
        },
        data: function() {
            return {
                sockets: [],
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    #containerLeft {
        display: flex;
        flex-direction: column;
        align-items: center;

        border-right: 1px solid grey;

        height: 100%;
        width: 30%;
    }

    .containerHead {
        background-color: mediumseagreen;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        color: black;
        width: 100%;
        height: 50px;
    }
</style>