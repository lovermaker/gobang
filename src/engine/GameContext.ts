import ChessType from "./ChessType";

interface GameContext {
    // 下棋
    setChess(type: ChessType, row: number, col: number): boolean
    // 悔棋
    undo(type: ChessType): boolean
}

export default GameContext
