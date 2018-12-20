<template>
    <div class="container">
        <div class="chatField">
            <div class="messageBubble">
                <div class="infoContainer">
                    <div class="timeSent">12:50:33:123</div>
                    <div class="infoBubble">automated</div>
                </div>
                <div class="message">
                    <p>
                        saiudhfucsadhehjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                    </p>
                </div>
            </div>
            <div class="messageBubble">
                <div class="infoContainer">
                    <div class="timeSent">12:50:33:123</div>
                    <div class="infoBubble">automated</div>
                </div>
                <div class="message">
                    <p>
                        saiudhfucsadhehjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                    </p>
                </div>
            </div>
            <div class="messageBubble">
                <div class="infoContainer">
                    <div class="timeSent">12:50:33:123</div>
                    <div class="infoBubble">automated</div>
                </div>
                <div class="message">
                    <p>
                        saiudhfucsadhehjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                    </p>
                </div>
            </div>
            <div class="messageBubble">
                <div class="infoContainer">
                    <div class="timeSent">12:50:33:123</div>
                    <div class="infoBubble">automated</div>
                </div>
                <div class="message">
                    <p>
                        saiudhfucsadhehjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                    </p>
                </div>
            </div>
        </div>

        <div class="messageField">
            <input class="messageInput"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageView"
    }
</script>

<style scoped>
    .container {
        width: 50%;
        height: 100%;

        border: solid black 1px;
    }

    .chatField {
        height: 90%;
        width: 100%;
    }

    .messageBubble {
        width: 100%;
        height: auto;

        display:flex;
        flex-direction: column;
        justify-content: center;
    }

    .infoContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }

    .timeSent {
        color: white;
        text-align: center;
        padding: auto;
    }

    .infoBubble {
        width: auto;
        height: auto;
        padding: 5px;

        text-align: center;
        border-radius: 5px;

        background-color: chartreuse;
    }

    .message {
        padding: 2% 10% 2% 10%;
        margin-top: 5px;

        word-wrap: break-word;

        background-color: mediumaquamarine;
    }

    .messageField {
        display: flex;
        flex-direction: row;

        height: 10%;
    }

    .messageInput {
        width: 100%;
    }

</style>