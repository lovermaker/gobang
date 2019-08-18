/**
 * 棋子形状
 */
enum ChessShape {
    ONE, // 活一
    TWO, // 活二
    THREE, // 活三
    FOUR, // 活四
    FIVE, // 连五
    BLOCKED_ONE, // 眠一
    BLOCKED_TWO, // 眠二
    BLOCKED_THREE, // 眠三
    BLOCKED_FOUR, // 眠四
    OTHER
}

class ChessCount {
    empty: number = -1
    count: number = 1
    block: number = 0
    constructor() {
        this.reset()
    }
    reset() {
        this.empty = -1
        this.count = 1
        this.block = 0
    }
}

const getChessShape = (chessCount: ChessCount) => {
    const { count, empty, block } = chessCount
    //没有空位
    if(empty <= 0) {
        if(count >= 5) return ChessShape.FIVE
        if(block === 0) {
            switch(count) {
                case 1: return ChessShape.ONE
                case 2: return ChessShape.TWO
                case 3: return ChessShape.THREE
                case 4: return ChessShape.FOUR
            }
        }

        if(block === 1) {
            switch(count) {
                case 1: return ChessShape.BLOCKED_ONE
                case 2: return ChessShape.BLOCKED_TWO
                case 3: return ChessShape.BLOCKED_THREE
                case 4: return ChessShape.BLOCKED_FOUR
            }
        }

    } else if(empty === 1 || empty == count-1) {
        //第1个是空位
        if(count >= 6) {
            return ChessShape.FIVE
        }
        if(block === 0) {
            switch(count) {
                case 2: return ChessShape.TWO/2
                case 3: return ChessShape.THREE
                case 4: return ChessShape.BLOCKED_FOUR
                case 5: return ChessShape.FOUR
            }
        }

        if(block === 1) {
            switch(count) {
                case 2: return ChessShape.BLOCKED_TWO
                case 3: return ChessShape.BLOCKED_THREE
                case 4: return ChessShape.BLOCKED_FOUR
                case 5: return ChessShape.BLOCKED_FOUR
            }
        }
    } else if(empty === 2 || empty == count-2) {
        //第二个是空位
        if(count >= 7) {
            return ChessShape.FIVE
        }
        if(block === 0) {
            switch(count) {
                case 3: return ChessShape.THREE
                case 4:
                case 5: return ChessShape.BLOCKED_FOUR
                case 6: return ChessShape.FOUR
            }
        }

        if(block === 1) {
            switch(count) {
                case 3: return ChessShape.BLOCKED_THREE
                case 4: return ChessShape.BLOCKED_FOUR
                case 5: return ChessShape.BLOCKED_FOUR
                case 6: return ChessShape.FOUR
            }
        }

        if(block === 2) {
            switch(count) {
                case 4:
                case 5:
                case 6: return ChessShape.BLOCKED_FOUR
            }
        }
    } else if(empty === 3 || empty == count-3) {
        if(count >= 8) {
            return ChessShape.FIVE
        }
        if(block === 0) {
            switch(count) {
                case 4:
                case 5: return ChessShape.THREE
                case 6: return ChessShape.BLOCKED_FOUR
                case 7: return ChessShape.FOUR
            }
        }

        if(block === 1) {
            switch(count) {
                case 4:
                case 5:
                case 6: return ChessShape.BLOCKED_FOUR
                case 7: return ChessShape.FOUR
            }
        }

        if(block === 2) {
            switch(count) {
                case 4:
                case 5:
                case 6:
                case 7: return ChessShape.BLOCKED_FOUR
            }
        }
    } else if(empty === 4 || empty == count-4) {
        if(count >= 9) {
            return ChessShape.FIVE
        }
        if(block === 0) {
            switch(count) {
                case 5:
                case 6:
                case 7:
                case 8: return ChessShape.FOUR
            }
        }

        if(block === 1) {
            switch(count) {
                case 4:
                case 5:
                case 6:
                case 7: return ChessShape.BLOCKED_FOUR
                case 8: return ChessShape.FOUR
            }
        }

        if(block === 2) {
            switch(count) {
                case 5:
                case 6:
                case 7:
                case 8: return ChessShape.BLOCKED_FOUR
            }
        }
    } else if(empty === 5 || empty == count-5) {
        return ChessShape.FIVE
    }
    return ChessShape.OTHER
}

export {
    ChessShape,
    ChessCount,
    getChessShape
}