import IdGenerator, { Identifyable } from './id-generator';

enum RESPONSE_MODE {
    TEXT_PLAIN,
    JSON,
    JS,
}


class Activator implements Identifyable {
    private id: number = IdGenerator.getNextId();
    getId(): number {
        return this.id;
    }

    regex: RegExp;
    handler: ResponseHandler;
    title: string;

    constructor(title: string, regex: RegExp, handler: ResponseHandler) {
        this.regex = regex;
        this.handler = handler;
        this.title = title;
    }

    handle(msg: string): string {
        if (this.regex.test(msg)) {
            return this.handler.handle(msg);
        }
        return ""
    }
}

class ResponseHandler {
    private activeMethod: Function = () => { };
    private textResponse: string = "";
    private jsonResponse: string = "";
    private javaScript: string = "";
    private mode: RESPONSE_MODE = RESPONSE_MODE.TEXT_PLAIN;

    constructor() {
        this.setMode(this.mode);
    }

    public setMode(mode: RESPONSE_MODE) {
        switch (mode) {
            case RESPONSE_MODE.TEXT_PLAIN:
                this.activeMethod = this.handleTextResponse;
                break;
            case RESPONSE_MODE.JSON:
                this.activeMethod = this.handleJsonResponse;
                break;
            case RESPONSE_MODE.JS:
                this.activeMethod = this.handleJsonResponse;
                break;
            default:
                throw "Mode not supported!";
                break;
        }
    }

    public getMode() {
        return this.mode;
    }

    private handleTextResponse = (msg: string) => {
        return this.textResponse;
    };

    private handleJsonResponse = (msg: string) => {
        return this.jsonResponse;
    };

    private handleJsResponse = (msg: string) => {
        return eval(this.javaScript);
    };

    public handle = (msg: string) => {
        //handle message using internal state, return response
        return this.activeMethod(msg);
    };

    public setTextResponse(response: string) {
        this.textResponse = response;
    }

    public setJsonResponse(response: string) {
        this.jsonResponse = response;
    }

    public setJs(response: string) {
        this.javaScript = response;
    }
}


export {ResponseHandler, Activator, RESPONSE_MODE}