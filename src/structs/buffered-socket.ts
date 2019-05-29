import { ChatMessage, MessageTag, MESSAGE_TYPE } from "./chat-message";
import { Activator } from './response-handler';
import SocketSettings from './socket-settings';
import IdGenerator, { Identifyable } from './id-generator';

export default class BufferedSocket implements Identifyable {
    private _id: number = IdGenerator.getNextId();
    getId(): number {
        return this._id;
    }

    private websocket: WebSocket = null;
    private messages: ChatMessage[] = [];
    private activators: Activator[] = [];
    private settings: SocketSettings = null;
    public activeActivatorIndex = null; //TODO refactor, this is ugly

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
    //TODO add to UML
    public getActivators(): Activator[] {
        return this.activators;
    }
    public addActivator(activator: Activator) {
        this.activators.push(activator);
    }
    public removeActivator(activator: Activator) {
        let found = false;
        let i = 0;
        for (; i < this.activators.length; i++) {
            found = this.activators[i].getId() == activator.getId();
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