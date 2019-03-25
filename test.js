class AutomaticResponder {

    static MODE = {
        JS: 0,
        TXT: 1,
        JSON: 2,
    };

    constructor(regex) {

        this.regex = regex;
        this.activeMethod = this.textResponse;

        this.javascript = "";
        this.text = "";
        this.json = "";
    }

    handle = (data) => this.activeMethod(data);

    switchMode = (mode) => {
        if(mode === this.MODE.JS) {
            this.activeMethod = this.javascriptResponse;
        }
        else if(mode === this.MODE.TXT) {
            this.activeMethod = this.textResponse;
        }
        else if(mode === this.MODE.JSON) {
            this.activeMethod = this.jsonResponse;
        }
    };

    javascriptResponse = (data) => {
        return eval(this.javascript)
    };

    textResponse = (data) => {
        return this.text;
    };

    jsonResponse = () => {
        return this.json;
    }
}

class Response {
    static TYPE = {
        AUTOMATED: 0,
        MANUAL: 1,
    };
    constructor(content, date, type) {
        this.content = content;
        this.date = date;
        this.type = type;
    }
}

class Message {
    constructor(content, date) {
        this.content = content;
        this.date = date;
    }
}

class WsConfig {
    constructor(url, protocol) {
        this.url = url;
        this.protocol = protocol;
    }
}

class CachedWebsocket {

    constructor(wsConfig) {
        this.ws = null;
        this.wsConfig = wsConfig;

        this.automate = false;

        this.lsDataReceived = [];
        this.lsDataSent = [];
        this.automationResponders = [];
    }

    open = () => {
        this.ws = new WebSocket(this.wsConfig.url, this.wsConfig.protocol);
    };

    onMsgRecv = (e) => {
        let message = new Message(e.data, new Date());
        this.lsReceived.push(e.data);

        if(this.automate) {
            let response = this.tryAutomatedResponse()
        }

    };

    tryAutomatedResponse = (data) => {
        let response = null;
        for(let autoResponder of this.automationResponders) {
            if(data.matches(autoResponder.regex).length > 0) {
                response = new Response(autoResponder.handle(data), new Date(), Response.TYPE.AUTOMATED);
                break;
            }
        }
        return response;
    };

}