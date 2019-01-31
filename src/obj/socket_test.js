
export class ProjectConfig {

    constructor(name) {
        this.name = name;
        this.socketConfigs = {};
    }

    addSocketConfig = (key, socketConfig) => {
        this.socketConfigs[key] = socketConfig;
    };

    removeSocketConfig = (key) => {
        this.socketConfigs.delete(key);
    };
}

export class SocketConfig {

    constructor() {
        this.ws = null;
        this.automatedMessages = {};
    }

}


class Activation {

    constructor() {
        this.pattern = null;
        this.responseHandler = null;
    }

    macthes = (msg) => {
        //TODO if pattern matches -> return responseHandler.handle()
    };
}

class ResponseHandler {

    constructor() {
        this.activeMethod = this.handleTextResponse;

        this.textResponse = null;
        this.jsonResponse = null;
        this.javascript = null;
    }

    handleTextResponse = (msg) => {
        return this.textResponse;
    };

    handleJsonResponse = (msg) => {
        return this.jsonResponse;
    };

    handleJsResponse = (msg) => {
        //TODO execute code in this scope
    };

    handle = (msg) => {
        //handle message using internal state, return response
        return this.activeMethod(msg);
    };
}


class Ws {

    constructor(socketUrl) {
        this.socketUrl = socketUrl;
        this.activeSocket = null;
    }

    connect = () => {
        if(this.activeSocket) {
            //TODO close
        }

        this.activeSocket = new WebSocket(this.socketUrl);
        this.activeSocket.onmessage = this.onMsgRecv;
    };

    onMsgRecv = () => {

    };

    sendMsg = (msg) => {

    };
}