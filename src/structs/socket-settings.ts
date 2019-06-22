// throwaway object, doesn't need setters

export default class SocketSettings {
    public url: string;
    public protocols: string[];
    public clrMsgLimit: number;

    constructor(url: string, protocols: string[], clrMsgLimit: number = Number.MAX_SAFE_INTEGER) {
        this.url = url;
        this.protocols = protocols;
        this.clrMsgLimit = clrMsgLimit;
    }
}
