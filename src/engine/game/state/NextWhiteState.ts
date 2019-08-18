import AbstractState from "./AbstractState";
import Position from "../chess/Position";
import ChessFactory from "../chess/ChessFactory";
import GameState from "./GameState";

class NextWhiteState extends AbstractState {
    dropChess(position: Position): boolean {
        const success = this.gameContext.whitePlayer.dropChess(position)
        if (success) {
            this.gameContext.chessSteps.splice(this.gameContext.chessSteps.length - 1,1);
            this.gameContext.setGameState(GameState.NEXT_WHITE)
            this.gameContext.checkGameState()
        }
        return success
    }
    setChess(position: Position): boolean {
        const success = this.gameContext.whitePlayer.setChess(position)
        if (success) {
            this.gameContext.chessSteps.push(ChessFactory.newWhiteChess(position))
            this.gameContext.setGameState(GameState.NEXT_BLACK)
            this.gameContext.checkGameState()
        }

        return success
    }

    start(): void {
    }

    stop(): void {
    }
}

export default NextWhiteState