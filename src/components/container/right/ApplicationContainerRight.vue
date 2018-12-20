<template>
    <div class="containerRight">
        <div class="containerHead">
            Projects
        </div>
        <div class="subContainer">
            <tab-view></tab-view>
            <message-view></message-view>
        </div>
    </div>
</template>

<script>
    import TabView from "./tab_view/TabView";
    import MessageView from "./msg_view/MessageView";

    export default {
        name: "ApplicationContainerRight",
        components: {MessageView, TabView}
    }
</script>

<style scoped>
    .containerRight {
        display: flex;
        flex-direction: column;
        align-items: center;

        outline: 1px solid black;
        height: 100%;
        width: 70%;

        background-color: #3F3C3C;
    }

    .subContainer {
        display: flex;
        flex-direction: row;
        align-items: center;

        height: 100%;
        width: 100%;
    }

    .containerHead {
        background-color: #706b57;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        color: black;

        width: 100%;
        height: 50px;
    }
</style>