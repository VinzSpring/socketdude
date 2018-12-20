<template>
    <div class="leaf">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.0833 0.75H5.91667C3.075 0.75 0.75 3.075 0.75 5.91667V42.0833C0.75 44.925 3.075 47.25 5.91667 47.25H42.0833C44.925 47.25 47.25 44.925 47.25 42.0833V5.91667C47.25 3.075 44.925 0.75 42.0833 0.75ZM16.25 36.9167H11.0833V18.8333H16.25V36.9167ZM26.5833 36.9167H21.4167V11.0833H26.5833V36.9167ZM36.9167 36.9167H31.75V26.5833H36.9167V36.9167Z" fill="white"></path>
        </svg>

        Socket 100000
    </div>
</template>

<script>
    export default {
        name: "socket"
    }
</script>

<style scoped>
    .leaf {
        width: 100%;
        height: 70px;

        background-color: inherit;
        color: white;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
</style>