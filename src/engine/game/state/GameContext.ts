import BlackPlayer from "../../player/BlackPlayer";
import WhitePlayer from "../../player/WhitePlayer";
import AbstractState from "./AbstractState";
import Position from "../chess/Position";
import ActionContext from "../ActionContext";
import ChessBoard from "../chess/ChessBoard";
import {findFivePosition} from "../../util/winUtils";
import ChessType from "../chess/ChessType";
import Observable from "./Observable";
import GameState from "./GameState";
import Chess from "../chess/Chess";


class GameContext extends Observable {
    blackPlayer: BlackPlayer
    whitePlayer: WhitePlayer
    context: ActionContext = new ChessBoard()
    chessSteps: Array<Chess> = []
    private gameState!: AbstractState
    constructor(blackPlayer: BlackPlayer, whitePlayer: WhitePlayer) {
        super();
        this.blackPlayer = blackPlayer
        this.whitePlayer = whitePlayer
        this.blackPlayer.setContext(this.context)
        this.whitePlayer.setContext(this.context)
        this.setGameState(GameState.NOT_STARTED)
    }

    public setGameState(gameState: AbstractState): void {
        if (gameState !== this.gameState) {
            this.gameState = gameState
            this.gameState.setContext(this)
            this.notifyStateChange(this.gameState)
        }
    }

    public getGameState(): AbstractState {
        return this.gameState
    }

    public setChess(position: Position): boolean {
        const success = this.gameState.setChess(position)
        this.checkGameState()
        return success
    }

    public dropChess(position: Position): boolean {
        return this.gameState.dropChess(position)
    }

    protected start() {
        this.context.newBoard()
        this.gameState.start()
    }

    protected stop() {
        this.gameState.stop()
    }

    checkGameState(): AbstractState {
        const fivePosition = findFivePosition(this.context.getChessBoard())
        console.log(fivePosition)
        if (fivePosition.found) {
            if (fivePosition.winType === ChessType.WHITE) {
                this.setGameState(GameState.WHITE_WIN)
                this.notifyWin(this.gameState, fivePosition.position)
            } else if (fivePosition.winType === ChessType.BLACK) {
                this.setGameState(GameState.BLACK_WIN)
                this.notifyWin(this.gameState, fivePosition.position)
            } else {
                this.setGameState(GameState.OVER)
            }
        }
        return this.gameState
    }

    public getChessBoard(): Array<Array<ChessType>> {
        return this.context.getChessBoard()
    }

    public getChessSteps(): Array<Chess> {
        return this.chessSteps
    }
}

export default GameContext