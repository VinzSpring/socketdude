export default class IdGenerator {
    static id: number = 0;
    static getNextId() {
        return this.id++;
    }
}
