import ChessBoard from "./ChessBoard";
import ChessType from "./ChessType";
import Player from "./player/Player";
import GameContext from "./GameContext";
import {findFivePosition} from "./util/winUtils";
import GameHandler from "./GameHandler";
import {Computer} from "./player/Computer";

enum GameState {
    NOT_STARTED,
    STARTED,
    PAUSE,
    NEXT_WHITE,
    NEXT_BLACK,
    BLACK_WIN,
    WHITE_WIN,
    OVER
}

interface ChessStep {
    type: ChessType,
    row: number,
    col: number
}

class Game implements GameContext {
    chessBoard: ChessBoard = new ChessBoard()
    gameState: GameState = GameState.NOT_STARTED
    chessSteps: ChessStep[] = []

    blackPlayer!: Player
    whitePlayer!: Player
    handler: GameHandler

    constructor(handler: GameHandler) {
        this.handler = handler
    }

    getChessBoard(): number[][] {
        return this.chessBoard.board
    }

    getChessSteps(): ChessStep[] {
        return this.chessSteps
    }

    setBlackPlayer(player: Player) {
        player.setContext(this)
        player.setType(ChessType.BLACK)
        this.blackPlayer = player
    }

    setWhitePlayer(player: Player) {
        player.setContext(this)
        player.setType(ChessType.WHITE)
        this.whitePlayer = player
    }

    getCurrentPlayer(): Player| null {
        if (this.gameState === GameState.NEXT_WHITE) {
            return this.whitePlayer
        }
        if (this.gameState === GameState.NEXT_BLACK) {
            return this.blackPlayer
        }
        return null
    }

    // 开始游戏, 黑棋先手
    start() {
        this.gameState = GameState.STARTED
        this.chessBoard.newBoard()
        this.gameState = GameState.NEXT_BLACK
        if (this.handler.onStart) {
            this.handler.onStart(this.gameState)
        }
    }
    // 暂停游戏
    pause() {
        if (this.handler.onPause) {
            this.handler.onPause(this.gameState)
        }
    }

    stop() {

    }

    switchPlayer() {
        if (this.gameState === GameState.NEXT_BLACK) {
            this.gameState = GameState.NEXT_WHITE
            return
        }
        if (this.gameState === GameState.NEXT_WHITE) {
            this.gameState = GameState.NEXT_BLACK
            return
        }
    }

    checkComputerPlay(): void {
        const play = this.getCurrentPlayer()
        if (play instanceof Computer) {
            play.play()
        }
    }

    setChess(type: ChessType, row: number, col: number): boolean {
        if ((this.gameState === GameState.NEXT_BLACK && type === ChessType.BLACK) || (this.gameState === GameState.NEXT_WHITE && type === ChessType.WHITE)) {
            this.chessSteps.push({ type, row, col })
            const isSuccess = this.chessBoard.setChess(type, row, col)
            if (isSuccess) {
                const fivePosition = findFivePosition(this.getChessBoard())
                if (fivePosition.found) {
                    this.handler.onOver(this.gameState)
                }
                this.switchPlayer()
                this.handler.onUpdate(this.gameState)
                setTimeout(() => this.checkComputerPlay(), 100)
            }
            return isSuccess
        }
        return false
    }

    undo(type: ChessType): boolean {
        const len = this.chessSteps.length
        const lastStep = this.chessSteps[len - 1]
        if (len > 0 && lastStep.type === type) {
            if (this.chessBoard.dropChess(lastStep.type, lastStep.row, lastStep.col)) {
                this.chessSteps.splice(len - 1,1);
                return true
            }
        }
        return false;
    }
}

export default Game

export {
    GameState
}