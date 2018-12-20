<template>
    <div class="container">
        <div class="tabBar">
            <div class="tab">jhuihzgzg</div>
            <div class="tab">fefwefe</div>

            <svg class="addButton" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.6667 0H3.33333C1.48333 0 0 1.5 0 3.33333V26.6667C0 28.5 1.48333 30 3.33333 30H26.6667C28.5 30 30 28.5 30 26.6667V3.33333C30 1.5 28.5 0 26.6667 0ZM23.3333 16.6667H16.6667V23.3333H13.3333V16.6667H6.66667V13.3333H13.3333V6.66667H16.6667V13.3333H23.3333V16.6667Z" fill="white"></path>
            </svg>

        </div>
    </div>
</template>

<script>
    export default {
        name: "TabView"
    }
</script>

<style scoped>
    .container {
        width: 50%;
        height: 100%;

        border: solid black 1px;
    }

    .tabBar {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        width: 100%;

        border-bottom: 1px solid white;
    }

    .tab {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: auto;
        height: 30px;
        padding: 10px;

        color: white;

        border-right: solid white 1px;
    }

    .addButton {
        margin: 10px;
    }
</style>