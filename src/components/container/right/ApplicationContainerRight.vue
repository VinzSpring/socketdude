<template>
    <div id="containerRight">
        <div class="containerHead">
            Projects
        </div>

    </div>
</template>

<script>
    export default {
        name: "ApplicationContainerRight"
    }
</script>

<style scoped>
    #containerRight {
        display: flex;
        flex-direction: column;
        align-items: center;

        outline: 1px solid black;
        height: 100%;
        width: 70%;
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