<template>
    <div id="mainContainer">
        <ApplicationContainerLeft></ApplicationContainerLeft>
        <ApplicationContainerRight></ApplicationContainerRight>

    </div>
</template>

<script>
    import ApplicationContainerLeft from "./left/ApplicationContainerLeft";
    import ApplicationContainerRight from "./right/ApplicationContainerRight";
    import EVENTS from "../../obj/EVENTS";

    export default {
        name: "ApplicationContainer",
        components: {ApplicationContainerRight, ApplicationContainerLeft},

        data: function () {
            return {
                chosenSocket: null,
            }
        },
        mounted: function() {
            this.$on(EVENTS.ON_SOCKET_CHOSEN, this.on_socket_chosen);
        },
        methods: {
            on_socket_chosen: function (socket) {
                this.chosenSocket = socket;
            }
        }
    }
</script>

<style scoped>
    #mainContainer {
        display: flex;
        flex-direction: row;
        align-content: center;
        width: 100%;
        height: 100%;
        position: fixed;

        font-family: 'Roboto', sans-serif;

        background-color: grey;
    }
</style>