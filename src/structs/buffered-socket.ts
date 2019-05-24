import { ChatMessage, MessageTag, MESSAGE_TYPE } from "./chat-message";
import { Activator } from './response-handler';
import SocketSettings from './socket-settings';
import IdGenerator from './id-generator';

export default class BufferedSocket {
    private _id: number = IdGenerator.getNextId();
    get id() {
        return this._id;
    }

    private websocket: WebSocket = null;
    private messages: ChatMessage[] = [];
    private activators: Activator[] = [];
    private settings: SocketSettings = null;

    private onMsgRecv(msg: MessageEvent) {
        //catch message without data, replace with empty string
        let s: string = msg.data ? msg.data : "";

        let message = new ChatMessage(
            MESSAGE_TYPE.INCOMING,
            s,
            new Date(),
            [new MessageTag("incoming", "lightgreen")],
        )

        this.messages.push(message);
    }
    public sendMessage(msg: string) {
        this.websocket.send(msg);
    }
    public setSettings(settings: SocketSettings) {
        this.settings = settings;
    }
    public addActivator(activator: Activator) {
        this.activators.push(activator);
    }
    public removeActivator(activator: Activator) {
        let found = false;
        let i = 0;
        for (; i < this.activators.length; i++) {
            found = this.activators[i].id == activator.id;
            if (found)
                break;
        }
        if (found)
            this.activators.splice(i, 1);
        else
            throw "activator not found!";
    }
    public connect() {
        if (!this.settings)
            throw "missing settings"
        this.websocket = new WebSocket(this.settings.url, this.settings.protocols);
        this.websocket.onmessage = this.onMsgRecv;
    }
}