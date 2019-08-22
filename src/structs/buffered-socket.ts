import { ChatMessage, MessageTag, MESSAGE_TYPE, STANDARD_TAGS } from './chat-message';
import { Activator } from './response-handler';
import SocketSettings from './socket-settings';
import IdGenerator, { Identifyable } from './id-generator';
import { isJson } from '@/util/pretty-json';
import { isValidUrl } from '@/util/url-tools';
import store from '@/store'


//Wrapper class for websocket
export default class BufferedSocket implements Identifyable {

    //name displayed in sidebar
    public name: string = '';
    //object GUID
    private _id: number = IdGenerator.getNextId();
    private websocket: WebSocket = null;
    //array of received/sent messages
    private messages: ChatMessage[] = [];
    //array of different automatic response activators
    private activators: Activator[] = [];
    //settings for this socket
    private settings: SocketSettings = new SocketSettings('', []);
    //counter for messages sent/received while user didn't have view open
    public missedMessages: number = 0; //TODO maybe rename, so it is clear that this isn't an array of messages


    public getId(): number {
        return this._id;
    }

    /***
     * send a Chatmessage
     */
    public sendMessage(msg: string, tags: MessageTag[] = []) {

        //outgoing message-tag
        tags.push(STANDARD_TAGS.OUTGOING);
        //append json-tag if message content contains json
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
    public getMessages(): ChatMessage[] {
        return this.messages;
    }
    public getActivators(): Activator[] {
        return this.activators;
    }
    public addActivator(activator: Activator) {
        this.activators.push(activator);
    }
    /**
     * removes a given activator from the list of activators
     * @param activator acctivator to remove
     */
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
            //tried to remove non-existant activator. if this happens you might have state problems 
            throw new Error('activator not found!');
        }
    }

    public isConnected(): boolean {
        return this.websocket && this.websocket.readyState === WebSocket.OPEN;
    }

    /**
     * connect to websocket with current settings
     */
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
            //reject, error occured
            this.websocket.onerror = (e: MessageEvent) => {
                reject();
                this.onError(e);
            };
            //success
            this.websocket.onopen = (e: Event) => {
                resolve();
                this.onConnect(e);
            };
            //reject, connection closed
            this.websocket.onclose = (e: CloseEvent) => {
                reject();
                //handle disconnect
                this.onClose(e);
            };
        });
    }

    /**
     * handle received message
     * @param msg
     */
    private onMsgRecv(msg: MessageEvent) {
        // catch message without data, replace with empty string
        const s: string = msg.data ? msg.data : '';

        //add incoming message-tag
        const tags: MessageTag[] = [STANDARD_TAGS.INCOMING];
        //add json-tag if message contains json
        if (isJson(s)) {
            tags.push(STANDARD_TAGS.JSON);
        }

        const message = new ChatMessage(
            MESSAGE_TYPE.INCOMING,
            s,
            new Date(), //current time
            tags,
        );

        this.messages.push(message);

        //check for matching activator (->automatic response)
        for (const activator of this.activators) {
            const res = activator.handle(s);
            // force sring cast to prevent 0 from evaluating false
            if (res + '') {
                console.log(res);
                //send automated response
                this.sendMessage(res, [STANDARD_TAGS.AUTOMATED]);
            }
        }

        // count missed messages
        if (this != store.state.selectedSocket) {
            this.missedMessages++;
        }
    }

    /**
     * handle connection error
     * @param e 
     */
    private onError(e: MessageEvent) {
        //show error message in chat
        const errorMessage = new ChatMessage(
            MESSAGE_TYPE.ERROR,
            e.data,
            new Date(),
            [STANDARD_TAGS.ERROR],
        );
        this.messages.push(errorMessage);
    }

    /**
     * handle connect
     * @param e 
     */
    private onConnect(e: Event) {
        //show error message in chat
        const errorMessage = new ChatMessage(
            MESSAGE_TYPE.SUCCESS,
            'Connected to:\n' + this.settings.url,
            new Date(),
            [STANDARD_TAGS.CONNECTED],
        );
        this.messages.push(errorMessage);
    }

    /**
     * handle close-event
     * @param e 
     */
    private onClose(e: CloseEvent) {
        //show connection -losed-message in chat
        const errorMessage = new ChatMessage(
            MESSAGE_TYPE.ERROR,
            'Connection closed!\nreason:' + e.reason,
            new Date(),
            [STANDARD_TAGS.DISCONNECT],
        );
        this.messages.push(errorMessage);
    }
}
