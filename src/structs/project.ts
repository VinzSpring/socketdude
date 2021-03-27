import BufferedSocket from './buffered-socket';
import IdGenerator, { Identifyable } from './id-generator';

export default class Project implements Identifyable {
    public name: string;
    public sockets: BufferedSocket[];
    private id = IdGenerator.getNextId();

    constructor() {
        this.sockets = [];
        this.name = '';
    }

    public getId(): number {
        return this.id;
    }

    public getSocket(socketId: number): BufferedSocket {
        return this.sockets.filter( (socket) => socket.getId() === socketId )[0];
    }

    public addSocket(socket: BufferedSocket): void {
        this.sockets.push(socket);
    }

    public removeSocket(socket: BufferedSocket): void {
        let found = false;
        let i = 0;
        for (; i < this.sockets.length; i++) {
            found = this.sockets[i].getId() === socket.getId();
            if (found) {
                break;
            }
        }
        if (found) {
            this.sockets.splice(i, 1); // remove socket from list if found
        } else {
            throw new Error('socket not found!');
        }
    }
}
