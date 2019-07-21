import ChessType from "../ChessType";

enum FiveDirection {
    // 无
    NONE = 0,
    // 水平
    HORIZONTAL,
    // 垂直
    VERTICAL,
    // 左斜
    LEFT_SLANT,
    // 右斜
    RIGHT_SLANT
}

interface Position {
    row: number
    col: number
}

interface FivePosition {
    found: boolean,
    winType: ChessType
    position: Position[]
}

const isFive = function(board: number[][], type: ChessType, row: number, col: number): FiveDirection {
    // 行列大小
    const totalCount = board.length;
    let count = 1;

    const reset = () => count = 1

    // [row, col]该点右边连珠数量
    for(let i= col + 1; i < totalCount;i++) {
        if (board[row][i] !== type) {
            break
        }
        count += 1
    }


    // [row, col]该点左边连珠数量
    for(let i = col - 1;i>= 0 ;i --) {
        if (board[row][i] !== type) {
            break
        }
        count ++;
    }

    if(count >= 5) return FiveDirection.HORIZONTAL;

    //纵向
    reset();
    for(let i= row + 1;i < totalCount;i++) {
        if (board[i][col] !== type) {
            break
        }
        count ++;
    }

    for(let i = row - 1;i > 0;i--) {
        if (board[i][col] !== type) {
            break
        }
        count ++;
    }

    if(count >= 5) return FiveDirection.VERTICAL;
    // 右斜方向 \\
    reset();

    for(let i=1;true;i++) {
        const x = row + i, y = col + i;
        if(x>= totalCount || y>= totalCount) {
            break;
        }
        if (board[x][y] !== type) {
            break
        }
        count ++;
    }

    for(let i=1;true;i++) {
        const x = row - i, y = col - i;
        if(x < 0 || y < 0) {
            break;
        }
        if (board[x][y] !== type) {
            break
        }
        count ++;
    }

    if(count >= 5) return FiveDirection.RIGHT_SLANT;

    // 左斜方向 //
    reset();

    for(let i=1; true;i++) {
        const x = row + i, y = col - i;
        if( x < 0 || y < 0 || x >= totalCount || y >= totalCount) {
            break;
        }
        if (board[x][y] !== type) {
            break
        }
        count ++;
    }

    for(let i=1; true;i++) {
        const x = row - i, y = col + i;
        if( x < 0 || y < 0 || x >= totalCount || y >= totalCount) {
            break;
        }
        if (board[x][y] !== type) {
            break
        }
        count ++;
    }

    if(count >= 5) return FiveDirection.LEFT_SLANT;

    return FiveDirection.NONE;

}

// 找到五子连珠的点
const findFivePosition = (board: number[][]): FivePosition => {
    let direction = FiveDirection.NONE
    let position = { row: -1, col: -1 }
    let winType = ChessType.EMPTY
    for(let i = 0;i < board.length;i++) {
        for(let j = 0;j  <board[i].length;j++) {
            const type = board[i][j]
            position = { row: i, col: j }
            if (type !== ChessType.EMPTY) {
                direction = isFive(board, type, i, j)
                if (direction !== FiveDirection.NONE) {
                    winType = type
                    break
                }
            }
        }
    }

    if (direction === FiveDirection.NONE) return { found: false, winType, position: [] };
    if (direction === FiveDirection.HORIZONTAL) {
        return {
            found: true,
            winType,
            position: [
                position,
                {row: position.row, col: position.col + 1},
                {row: position.row, col: position.col + 2},
                {row: position.row, col: position.col + 3},
                {row: position.row, col: position.col + 4}]
        }
    }
    if (direction === FiveDirection.VERTICAL) {
        return {
            found: true,
            winType,
            position: [
                position,
                {row: position.row + 1, col: position.col},
                {row: position.row + 2, col: position.col},
                {row: position.row + 3, col: position.col},
                {row: position.row + 4, col: position.col}]
        }
    }
    if (direction === FiveDirection.RIGHT_SLANT) {
        return {
            found: true,
            winType,
            position: [
                position,
                {row: position.row + 1, col: position.col + 1},
                {row: position.row + 2, col: position.col + 2},
                {row: position.row + 3, col: position.col + 3},
                {row: position.row + 4, col: position.col + 4}]
        }
    }
    if (direction === FiveDirection.LEFT_SLANT) {
        return {
            found: true,
            winType,
            position: [
                position,
                {row: position.row + 1, col: position.col - 1},
                {row: position.row + 2, col: position.col - 2},
                {row: position.row + 3, col: position.col - 3},
                {row: position.row + 4, col: position.col - 4}]
        }
    }
    return { found: false, winType, position: [] }
}

export { findFivePosition }