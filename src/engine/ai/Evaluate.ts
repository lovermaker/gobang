import ChessType from "../ChessType";
import Position from '../Position'

/**
 * 这个是专门给某一个位置打分的， 表示在当前位置下一个棋子后的分数
 * @param board 当前棋盘
 * @param position {row, col} 行列
 * @param type 黑棋或白棋
 */
const evaluatePosition = (board: number[][], position: Position, type: ChessType) => {
    const size = board.length
    // 水平方向
    for (let i = position.col + 1; i < size; i++) {

    }
}

export default {
    evaluatePosition
}