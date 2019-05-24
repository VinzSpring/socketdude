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
        let found = false;
        let i = 0;
        for (; i < this.sockets.length; i++) {
            found = this.sockets[i].id == socket.id;
            if (found)
                break;
        }
        if (found)
            this.sockets.splice(i, 1);
        else
            throw "socket not found!";
    }
}