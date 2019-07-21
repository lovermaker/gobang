import Player from "./Player";

class Computer extends Player {
    constructor() {
        super(true)
    }

    play() {
        console.log('computer play')
    }
}

export {
    Computer
}