<template>
    <div id="containerLeft">
        <div class="containerHead">
            Projects
        </div>
        <search></search>
        <hr style="width: 98%"/>
        <project-container></project-container>

    </div>
</template>

<script>
    import Search from "./search";
    import ProjectContainer from "./projectContainer";
    export default {
        name: "ApplicationContainerLeft",
        components: {ProjectContainer, Search}
    }
</script>

<style scoped>
    #containerLeft {
        display: flex;
        flex-direction: column;
        align-items: center;

        outline: 2px solid black;
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