import GameContext from "../GameContext";
import ChessType from "../ChessType";

class Player {
    context!: GameContext
    type!: ChessType
    isComputer: boolean
    constructor(isComputer: boolean) {
        this.isComputer = isComputer
    }
    setContext(context: GameContext) {
        this.context = context
    }
    setType(type: ChessType) {
        this.type = type
    }
    setChess(row: number, col: number) {
        if (this.context && this.type) {
            return this.context.setChess(this.type, row, col)
        }
        return false
    }

    undo() {
        return this.context.undo(this.type)
    }
}

export default Player