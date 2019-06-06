import { colors } from 'vuetify/lib';

enum MESSAGE_TYPE {
    INCOMING,
    OUTGOING,
    ERROR,
    SUCCESS,
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

const STANDARD_TAGS = {
    INCOMING: new MessageTag("incoming", "red lighten-1"),
    OUTGOING: new MessageTag("outgoing", "light-green"),
    ERROR: new MessageTag("ERROR", "red"),
    DISCONNECT: new MessageTag("CLOSE", "red"),
    CONNECTED: new MessageTag("CONNECTED", "green"),
    BINARY: new MessageTag("binary", "light-blue"),
    JSON: new MessageTag("json", "orange lighten-2"),
}

export { MessageTag, ChatMessage, MESSAGE_TYPE, STANDARD_TAGS }