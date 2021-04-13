export default class IdGenerator {
    // TODO refactor this. objects with same id could occur if they are serialized and loaded later.
    public static id = 0;
    public static getNextId(): number {
        return this.id++;
    }
}

interface Identifyable {
    getId(): number;
}

export { Identifyable, IdGenerator };
