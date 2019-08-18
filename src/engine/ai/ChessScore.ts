import {ChessCount, ChessShape, getChessShape} from "./ChessShap";
import {number} from "prop-types";

const ChessScoreMap: {[index:number]: number} = {
    [ChessShape.ONE]: 10,
    [ChessShape.TWO]: 100,
    [ChessShape.THREE]: 1000,
    [ChessShape.FOUR]: 100000,
    [ChessShape.FIVE]: 10000000,
    [ChessShape.BLOCKED_ONE]: 1,
    [ChessShape.BLOCKED_TWO]: 10,
    [ChessShape.BLOCKED_THREE]: 100,
    [ChessShape.BLOCKED_FOUR]: 10000,
    [ChessShape.OTHER]: 0
}

const getChessScore = (count: ChessCount): number => {
    const shape = getChessShape(count)
    return ChessScoreMap[shape]
}

export {
    getChessScore
}