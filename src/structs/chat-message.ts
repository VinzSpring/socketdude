/* tslint:disable:max-classes-per-file */
enum MESSAGE_TYPE {
    INCOMING,
    OUTGOING,
    ERROR,
    SUCCESS,
}


// currently pretty useless, but could later (with more features)
// be automatically added to found patterns, content types, etc.
class MessageTag {
    public text: string;
    public color: string;
    constructor(text: string, color: string) {
        this.text = text;
        this.color = color;
    }
}

class ChatMessage {
    public msgType: MESSAGE_TYPE;
    public text: string;
    public dateSent: Date;
    public tags: MessageTag[];
    constructor(msgType: MESSAGE_TYPE, text: string, dateSent: Date, tags: MessageTag[]) {
        this.msgType = msgType;
        this.text = text;
        this.dateSent = dateSent;
        this.tags = tags;
    }

    public setMessageType(msgType: MESSAGE_TYPE): void {
        this.msgType = msgType;
    }
}

// collection of tags that are most commonly used
const STANDARD_TAGS = {
    INCOMING: new MessageTag('incoming', 'red lighten-1'),
    OUTGOING: new MessageTag('outgoing', 'light-green'),
    ERROR: new MessageTag('ERROR', 'red'),
    DISCONNECT: new MessageTag('CLOSE', 'red'),
    CONNECTED: new MessageTag('CONNECTED', 'green'),
    BINARY: new MessageTag('binary', 'light-blue'),
    JSON: new MessageTag('json', 'orange lighten-2'),
    AUTOMATED: new MessageTag('auto', 'green lighten-2'),
};

export { MessageTag, ChatMessage, MESSAGE_TYPE, STANDARD_TAGS };
