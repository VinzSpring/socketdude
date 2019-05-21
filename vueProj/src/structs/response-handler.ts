
enum RESPONSE_MODE {
    TEXT_PLAIN,
    JSON,
    JS,
}


class Activator {
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
    activeMethod: Function = () => { };
    textResponse: string = "";
    jsonResponse: string = "";
    javaScript: string = "";
    mode: RESPONSE_MODE = RESPONSE_MODE.TEXT_PLAIN;

    constructor() {
        this.setMode(this.mode);
    }

    setMode(mode: RESPONSE_MODE) {
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

    getMode() {
        return this.mode;
    }

    handleTextResponse = (msg: string) => {
        return this.textResponse;
    };

    handleJsonResponse = (msg: string) => {
        return this.jsonResponse;
    };

    handleJsResponse = (msg: string) => {
        return eval(this.javaScript);
    };

    handle = (msg: string) => {
        //handle message using internal state, return response
        return this.activeMethod(msg);
    };
}


export {ResponseHandler, Activator, RESPONSE_MODE}