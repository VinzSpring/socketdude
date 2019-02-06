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
            <input placeholder="Enter Message"/>
            <button>Send</button>
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
        max-height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        border-left: 1px solid grey;
    }

    .chatField {
        width: 100%;
        overflow: auto;
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

        border-top: 1px solid grey;

        height: 100px;
        min-height: 100px;
        width: 100%;

        bottom: 0;
    }

    .messageField button {
        height: 100%;
        width: 100px;

        border: none;

        background-color: forestgreen;
    }

    .messageField input {
        width: 100%;
        background-color: transparent;
        border: none;

        color: white;

        padding: 20px;

        font-size: large;
    }


</style>