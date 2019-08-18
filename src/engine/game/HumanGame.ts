
import GameContext from "./state/GameContext";
import IGame from "./IGame";
import WhitePlayer from "../player/WhitePlayer";
import BlackPlayer from "../player/BlackPlayer";

class HumanGame extends GameContext implements IGame {
    constructor() {
        super(new BlackPlayer(), new WhitePlayer())
    }
    pauseGame(): void {
    }

    startGame(): void {
        this.start()
    }

    stopGame(): void {
        this.stop()
    }
}

export default HumanGame