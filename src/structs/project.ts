import BufferedSocket from "./buffered-socket";
import IdGenerator, { Identifyable } from './id-generator';

export default class Project implements Identifyable {
    private sockets: BufferedSocket[];
    private id = IdGenerator.getNextId();
    
    constructor() {
        this.sockets = [];
    }

    getId(): number {
        return this.id;
    }

    public addSocket(socket: BufferedSocket) {
        this.sockets.push(socket);
    }

    public removeSocket(socket: BufferedSocket) {
        let found = false;
        let i = 0;
        for (; i < this.sockets.length; i++) {
            found = this.sockets[i].getId() == socket.getId();
            if (found)
                break;
        }
        if (found)
            this.sockets.splice(i, 1);
        else
            throw "socket not found!";
    }
}