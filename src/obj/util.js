class SequenceGenerator {
    constructor(seed = 0) {
        this.state = seed;
    }

    getNext = () => {

    };
}

export class LinSeqGen extends SequenceGenerator {

    getNext = (inc=1) => {
        this.state += inc;
        return this.state;
    };
}





