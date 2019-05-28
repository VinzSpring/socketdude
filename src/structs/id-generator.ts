export default class IdGenerator {
    static id: number = 0;
    static getNextId() {
        return this.id++;
    }
}

interface Identifyable {    
    getId() : number;    
}

export { Identifyable, IdGenerator }