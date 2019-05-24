import BufferedSocket from "./buffered-socket";

export default class Project {
    private sockets: BufferedSocket[];
    
    constructor() {
        this.sockets = [];
    }

    public addSocket(socket: BufferedSocket) {
        this.sockets.push(socket);
    }

    public removeSocket(socket: BufferedSocket) {
        //TODO impl
    }
}