import { ChatMessage } from "./chat-message";
import { Activator } from './response-handler';
import SocketSettings from './socket-settings';

//TODO impl
export default class BufferedSocket {
    private websocket: WebSocket;
    private messages: ChatMessage[];
    private activators: Activator[];
    private settings: SocketSettings;

    constructor() {

    }

    private onMsgRecv(msg: string) {

    }
    public sendMessage(msg: string) {

    }
    public setSettings(settings: SocketSettings) {
        this.settings = settings;
    }
    public addActivator(activator: Activator) {

    }
    public removeActivator(activator: Activator) {

    }
    public connect(): boolean {
        return false;
    }
}