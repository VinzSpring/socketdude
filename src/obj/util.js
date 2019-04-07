class SequenceGenerator {
    constructor(seed = 0) {
        this.state = seed;
    }

    getNext = () => {

    };
}

class LinSeqGen extends SequenceGenerator {

    getNext = (inc=1) => {
        this.state += inc;
        return this.state;
    };
}

const seqGen = new LinSeqGen();
export {seqGen, LinSeqGen}





