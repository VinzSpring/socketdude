import { ChatMessage, MessageTag, MESSAGE_TYPE, STANDARD_TAGS } from './chat-message';
import { Activator } from './response-handler';
import SocketSettings from './socket-settings';
import IdGenerator, { Identifyable } from './id-generator';
import { isJson } from '@/util/pretty-json';
import { isValidUrl } from '@/util/url-tools';

export default class BufferedSocket implements Identifyable {

    // TODO: update uml

    public name: string = '';
    public activeActivatorIndex = null; // TODO refactor, this is ugly
    private _id: number = IdGenerator.getNextId();
    private websocket: WebSocket = null;
    private messages: ChatMessage[] = [];
    private activators: Activator[] = [];
    private settings: SocketSettings = new SocketSettings('', []);
    public getId(): number {
        return this._id;
    }

    public sendMessage(msg: string) {

        const tags: MessageTag[] = [STANDARD_TAGS.OUTGOING];
        if (isJson(msg)) {
            tags.push(STANDARD_TAGS.JSON);
        }

        this.messages.push(
            new ChatMessage(
                MESSAGE_TYPE.OUTGOING,
                msg,
                new Date(),
                tags,
            ),
        );
        this.websocket.send(msg);
    }

    public setSettings(settings: SocketSettings) {
        this.settings = settings;
    }

    public getSettings(): SocketSettings {
        return this.settings;
    }
    // TODO add to UML
    public getMessages(): ChatMessage[] {
        return this.messages;
    }
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
            if (found) {
                break;
            }
        }
        if (found) {
            this.activators.splice(i, 1);
        }
        else {
            throw new Error('activator not found!');
        }
    }

    public isConnected() {
        return this.websocket && this.websocket.readyState === WebSocket.OPEN;
    }


    // TODO update in UML
    public connect(): Promise<Event> {
        if (!this.settings) {
            throw new Error('missing settings');
        }

        return new Promise((resolve, reject) => {
            if (!isValidUrl(this.settings.url)) {
                const e = new MessageEvent('error', { data: 'Invalid URL!' });
                this.onError(e);
                return;
            }

            if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
                this.websocket.close();
            }

            this.websocket = new WebSocket(this.settings.url, this.settings.protocols);
            this.websocket.onmessage = (msg: MessageEvent) => this.onMsgRecv(msg);
            this.websocket.onerror = (e: MessageEvent) => {
                reject();
                this.onError(e);
            };
            this.websocket.onopen = (e: Event) => {
                resolve();
                this.onConnect(e);
            };
            this.websocket.onclose = (e: CloseEvent) => {
                reject();
                this.onClose(e);
            };
        });
    }

    private onMsgRecv(msg: MessageEvent) {
        // catch message without data, replace with empty string
        const s: string = msg.data ? msg.data : '';

        const tags: MessageTag[] = [STANDARD_TAGS.INCOMING];
        if (isJson(s)) {
            tags.push(STANDARD_TAGS.JSON);
        }

        const message = new ChatMessage(
            MESSAGE_TYPE.INCOMING,
            s,
            new Date(),
            tags,
        );

        this.messages.push(message);

        for (const activator of this.activators) {
            const res = activator.handle(s);
            // force sring cast to prevent 0 from evaluating false
            if (res + '') {
                console.log(res);

                this.sendMessage(res);
            }
        }
    }

    // TODO update in UML
    private onError(e: MessageEvent) {
        const errorMessage = new ChatMessage(
            MESSAGE_TYPE.ERROR,
            e.data,
            new Date(),
            [STANDARD_TAGS.ERROR],
        );
        this.messages.push(errorMessage);
    }

    private onConnect(e: Event) {
        const errorMessage = new ChatMessage(
            MESSAGE_TYPE.SUCCESS,
            'Connected to:\n' + this.settings.url,
            new Date(),
            [STANDARD_TAGS.CONNECTED],
        );
        this.messages.push(errorMessage);
    }

    private onClose(e: CloseEvent) {
        const errorMessage = new ChatMessage(
            MESSAGE_TYPE.ERROR,
            'Connection closed!\nreason:' + e.reason,
            new Date(),
            [STANDARD_TAGS.DISCONNECT],
        );
        this.messages.push(errorMessage);
    }
}
