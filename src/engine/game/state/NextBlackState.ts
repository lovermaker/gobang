import AbstractState from "./AbstractState";
import Position from "../chess/Position";
import GameState from "./GameState";
import ChessFactory from "../chess/ChessFactory";

class NextBlackState extends AbstractState {
    dropChess(position: Position): boolean {
        const success = this.gameContext.blackPlayer.dropChess(position)
        if (success) {
            this.gameContext.chessSteps.splice(this.gameContext.chessSteps.length - 1,1);
            this.gameContext.setGameState(GameState.NEXT_BLACK)
            this.gameContext.checkGameState()
        }
        return success
    }
    setChess(position: Position): boolean {
        const success = this.gameContext.blackPlayer.setChess(position)
        if (success) {
            this.gameContext.chessSteps.push(ChessFactory.newBlackChess(position))
            this.gameContext.setGameState(GameState.NEXT_WHITE)
            this.gameContext.checkGameState()
        }
        return success
    }


    start(): void {
    }

    stop(): void {
    }
}

export default NextBlackState