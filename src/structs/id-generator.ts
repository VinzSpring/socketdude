export default class IdGenerator {
    public static id: number = 0;
    public static getNextId() {
        return this.id++;
    }
}

interface Identifyable {
    getId(): number;
}

export { Identifyable, IdGenerator };
