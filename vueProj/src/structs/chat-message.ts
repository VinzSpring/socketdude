import { colors } from 'vuetify/lib';

class MessageTag {
    text: string;
    color: string;
    constructor(text: string, color: string) {
        this.text = text;
        this.color = color;
    }
}

class ChatMessage {
    text: string;
    dateSent: Date;
    tags: MessageTag[];
    constructor(text: string, dateSent: Date, tags: MessageTag[]) {
        this.text = text;
        this.dateSent = dateSent;
        this.tags = tags;
    }
}

export { MessageTag, ChatMessage }