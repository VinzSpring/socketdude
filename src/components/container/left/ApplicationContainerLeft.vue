<template>
    <div id="containerLeft">
        <div class="containerHead">
            Projects
        </div>
        <search></search>
        <hr style="width: 98%"/>

    </div>
</template>

<script>
    import Search from "./search";
    export default {
        name: "ApplicationContainerLeft",
        components: {Search}
    }
</script>

<style scoped>
    #containerLeft {
        display: flex;
        flex-direction: column;
        align-items: center;

        outline: 1px solid black;
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