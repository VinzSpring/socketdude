<template>
    <div id="mainContainer">
        <ApplicationContainerLeft></ApplicationContainerLeft>
        <ApplicationContainerRight></ApplicationContainerRight>

    </div>
</template>

<script>
    import ApplicationContainerLeft from "./left/ApplicationContainerLeft";
    import ApplicationContainerRight from "./right/ApplicationContainerRight";

    export default {
        name: "ApplicationContainer",
        components: {ApplicationContainerRight, ApplicationContainerLeft}
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