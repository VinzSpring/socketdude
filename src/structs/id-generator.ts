
export default class IdGenerator {
    // TODO refactor this. objects with same id could occur if they are serialized and loaded later.
    public static id: number = 0;
    public static getNextId() {
        return this.id++;
    }
}

interface Identifyable {
    getId(): number;
}

export { Identifyable, IdGenerator };
