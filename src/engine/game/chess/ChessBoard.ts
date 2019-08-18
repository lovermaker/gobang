// 棋盘类
import ChessType from "./ChessType";
import Chess from "./Chess";
import Position from "./Position";
import ActionContext from "../ActionContext";

class ChessBoard implements ActionContext {
    board : Array<Array<ChessType>> = new Array<Array<ChessType>>()
    rowNum: number = 15
    colNum: number = 15

    newBoard(): void {
        this.board = []
        for (let i = 0; i < this.rowNum; i++) {
            const row = []
            for (let j = 0; j < this.colNum; j++) {
                row.push(ChessType.EMPTY)
            }
            this.board.push(row)
        }
    }

    setChess(chess: Chess): boolean {
        // 位置不合法
        // 当前位置不为空
        const { position, type } = chess
        if (!this.checkPosition(position) || this.board[position.row][position.col] !== ChessType.EMPTY) {
            return false
        }
        this.board[position.row][position.col] = type
        return true
    }

    dropChess(chess: Chess): boolean {
        // 位置不合法
        // 当前位置不为空
        const { position, type } = chess
        if (!this.checkPosition(position) || this.board[position.row][position.col] !== type) {
            return false
        }
        this.board[position.row][position.col] = ChessType.EMPTY
        return true
    }

    checkPosition(position: Position) {
        // 位置不合法
        return !(position.row < 0 || position.row > this.rowNum || position.col < 0 || position.col > this.colNum)
    }

    getChessBoard(): Array<Array<ChessType>> {
        return this.board;
    }
}

export default ChessBoard