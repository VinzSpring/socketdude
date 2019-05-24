import { colors } from 'vuetify/lib';

enum MESSAGE_TYPE {
    INCOMING,
    OUTGOING,
    BUSY,
}


//currently pretty useless, but could later (with more features) be automatically added to found patterns, content types, etc. 
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
    public msgType: MESSAGE_TYPE;
    constructor(msgType: MESSAGE_TYPE, text: string, dateSent: Date, tags: MessageTag[]) {
        this.msgType = msgType;
        this.text = text;
        this.dateSent = dateSent;
        this.tags = tags;
    }

    public setMessageType(msgType: MESSAGE_TYPE) {
        this.msgType = msgType;
    }
}

export { MessageTag, ChatMessage, MESSAGE_TYPE }