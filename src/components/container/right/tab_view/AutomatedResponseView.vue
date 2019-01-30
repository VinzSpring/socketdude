<template>
    <div class="responseContainer">
        <p>activation Regex</p>
        <input/>

        <p>response</p>
        <div class="tabButtonsContainer">
            <button>JSON</button>
            <button>Text</button>
            <button>JavaScript</button>
        </div>
        <textarea>
        </textarea>
    </div>
</template>

<script>
    export default {
        name: "AutomatedRespdivonseView"
    }
</script>

<style scoped>

    .responseContainer {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        color: white;
    }

    .responseContainer input {

        width: 80%;
        border: none;
    }

    .responseContainer textarea {

        width: 80%;
        height: 100%;
        max-height: 75%;
        box-sizing: border-box;
        resize: none;
        border: none;

    }

    .tabButtonsContainer {
        display: flex;
        flex-direction: row;
        width: 80%;
    }

    .tabButtonsContainer button {
        width: 100%;
        height: 30px;
        border: none;

        font-size: 20px;

        background-color: lightgrey;
    }

</style>