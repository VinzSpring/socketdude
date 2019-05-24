import { colors } from 'vuetify/lib';

enum MESSAGE_STATE {
    INCOMING,
    OUTGOING,
    BUSY,
}


class MessageTag {
    text: string;
    color: string;
    constructor(text: string, color: string) {
        this.text = text;
        this.color = color;
    }
}

class ChatMessage {
    private text: string;
    private dateSent: Date;
    private tags: MessageTag[];
    public state: MESSAGE_STATE = MESSAGE_STATE.BUSY;
    constructor(text: string, dateSent: Date, tags: MessageTag[]) {
        this.text = text;
        this.dateSent = dateSent;
        this.tags = tags;
    }

    public setMessageState(state: MESSAGE_STATE) {
        this.state = state;
    }
}

export { MessageTag, ChatMessage }