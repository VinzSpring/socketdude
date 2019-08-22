import IdGenerator, { Identifyable } from './id-generator';

enum RESPONSE_MODE {
    TEXT_PLAIN,
    JSON,
    JS,
}


class Activator implements Identifyable {

    public regex: RegExp;
    public handler: ResponseHandler;
    public title: string;
    private id: number = IdGenerator.getNextId();

    constructor(title: string, regex: RegExp, handler: ResponseHandler) {
        this.regex = regex;
        this.handler = handler;
        this.title = title;
    }
    public getId(): number {
        return this.id;
    }

    public handle(msg: string): string {
        console.log(msg);

        if (!this.regex) {
            return ''; //equivalent of returning false
        }
        const match = msg.match(this.regex);
        if (match && match.length > 0 && match[0] === msg) { // handle message matches the 0th matchgroup
            return this.handler.handle(msg);
        }
        return '';
    }
}

/*strategy pattern or inheritance should be prefered here, maybe refactor if additional functionality needed */
class ResponseHandler {
    private textResponse: string = '';
    private jsonResponse: string = '';
    private javaScript: string = '';
    private mode: RESPONSE_MODE = RESPONSE_MODE.TEXT_PLAIN;

    constructor() {
        this.setMode(this.mode);
    }

    public setMode(mode: RESPONSE_MODE) {

        switch (mode) {
            case RESPONSE_MODE.TEXT_PLAIN:
                this.activeMethod = this.handleTextResponse;
                this.mode = mode;
                break;
            case RESPONSE_MODE.JSON:
                this.activeMethod = this.handleJsonResponse;
                this.mode = mode;
                break;
            case RESPONSE_MODE.JS:
                this.activeMethod = this.handleJsResponse;
                this.mode = mode;
                break;
            default:
                throw new Error('Mode not supported!');
                break;
        }
    }

    public getMode() {
        return this.mode;
    }

    public handle = (msg: string): string => {
        // handle message using internal state, return response
        return this.activeMethod(msg) + ''; // cast to string since only string messages are excpected in return
    }

    public setTextResponse(response: string) {
        this.textResponse = response;
    }

    public setJsonResponse(response: string) {
        this.jsonResponse = response;
    }

    public setJs(response: string) {
        this.javaScript = response;
    }

    public getTextResponse(): string {
        return this.textResponse;
    }

    public getJsonResponse(): string {
        return this.jsonResponse;
    }

    public getJs(): string {
        return this.javaScript;
    }
    private activeMethod: Function = () => { };

    private handleTextResponse = (msg: string): string => {
        return this.textResponse;
    }

    private handleJsonResponse = (msg: string): string => {
        return this.jsonResponse;
    }

    private handleJsResponse = (msg: string): string => {
        const script: string = '(function(msg){' + this.javaScript + '})(msg)';
        return eval(script);
    }
}


export { ResponseHandler, Activator, RESPONSE_MODE };
