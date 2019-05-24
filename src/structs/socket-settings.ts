//throwaway object, doesn't need setters

export default class SocketSettings {
    private url: string;
    private protocols: string[];
    private clrMsgLimit: number = Number.MAX_SAFE_INTEGER;

    constructor(url: string, protocols: string[], clrMsgLimit: number) {
        this.url = url;
        this.protocols = protocols;
        this.clrMsgLimit = clrMsgLimit;
    }    
}