<template>
    <div class="container">
        <project-node></project-node>
        <socket></socket>
        <socket></socket>
        <project-node></project-node>
        <socket></socket>
        <socket></socket>
        <socket></socket>
    </div>
</template>


<script>
    import ProjectNode from "./projectNode";
    import Socket from "./socket";

    export default {
        name: "projectContainer",
        components: {Socket, ProjectNode},
    }
</script>

<style scoped>
    .container {
        width: 100%;

        background-color: inherit;
        color: white;
    }
</style>