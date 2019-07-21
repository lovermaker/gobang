// 棋盘类
import ChessType from "./ChessType";

class ChessBoard {
    board : Array<Array<number>> = new Array<Array<number>>()
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

    setChess(type: ChessType, row: number, col: number): boolean {
        // 位置不合法
        // 当前位置不为空
        if (this.checkPosition(row, col) === false || this.board[row][col] !== ChessType.EMPTY) {
            return false
        }
        this.board[row][col] = type
        return true
    }

    dropChess(type: ChessType, row: number, col: number): boolean {
        // 位置不合法
        // 当前位置不为空
        if (this.checkPosition(row, col) === false || this.board[row][col] !== type) {
            return false
        }
        this.board[row][col] = ChessType.EMPTY
        return true
    }

    checkPosition(row: number, col: number) {
        // 位置不合法
        return !(row < 0 || row > this.rowNum || col < 0 || col > this.colNum)
    }
}

export default ChessBoard