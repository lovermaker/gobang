import AbstractState from "./AbstractState"
import Position from "../chess/Position";
import GameState from "./GameState";

class NotStartedState extends AbstractState{
    dropChess(position: Position): boolean {
        return false
    }
    setChess(position: Position): boolean {
        return false
    }

    start(): void {
        this.gameContext.setGameState(GameState.NEXT_BLACK)
    }

    stop(): void {
        this.gameContext.setGameState(GameState.OVER)
    }
}

export default NotStartedState