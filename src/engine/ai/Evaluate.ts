import ChessType from "../game/chess/ChessType";
import Position from '../game/chess/Position'
import { getChessScore } from "./ChessScore";
import { ChessCount } from "./ChessShap";

/**
 * 这个是专门给某一个位置打分的， 表示在当前位置下一个棋子后的分数
 * @param board 当前棋盘
 * @param position {row, col} 行列
 * @param type 黑棋或白棋
 */
const evaluatePosition = (board: number[][], position: Position, type: ChessType) => {
    const size = board.length
    let score = 0
    const chessCount = new ChessCount();
    // 水平方向 向右
    for (let i = position.col + 1; i < position.col + 5; i++) {
        if (i < 0 || i >= size) {
            chessCount.block ++
            break
        }
        const itemType = board[position.row][i]
        if (itemType === ChessType.EMPTY) {
            // 若连续两个为空或者到边缘
            if (i < size - 1 && board[position.row][i + 1] === type) {
                chessCount.empty ++
            } else {
                break
            }
        } else if (itemType === type) {
            chessCount.count ++
        } else {
            chessCount.block ++
            break
        }
    }

    // 水平方向 向左
    for (let i = position.col - 1; i > position.col - 5; i--) {
        if (i < 0 || i >= size) {
            chessCount.block ++
            break
        }
        const itemType = board[position.row][i]
        if (itemType === ChessType.EMPTY) {
            // 若连续两个为空或者到边缘
            if (i > 0 && board[position.row][i - 1] === type) {
                chessCount.empty ++
            } else {
                break
            }
        } else if (itemType === type) {
            chessCount.count ++
        } else {
            chessCount.block ++
            break
        }
    }

    score += getChessScore(chessCount)

    chessCount.reset()


}

export default {
    evaluatePosition
}