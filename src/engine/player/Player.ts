import ActionContext from "../game/ActionContext";
import ChessType from "../game/chess/ChessType";
import IPlayer from "./IPlayer";
import Chess from "../game/chess/Chess";
import Position from "../game/chess/Position";

abstract class Player implements IPlayer {
    context!: ActionContext
    type!: ChessType
    setContext(context: ActionContext) {
        this.context = context
    }
    setType(type: ChessType) {
        this.type = type
    }
    setChess(position: Position): boolean {
        if (this.context && this.getType()) {
            return this.context.setChess(new Chess(this.getType(), position))
        }
        return false
    }

    dropChess(position: Position): boolean {
        if (this.context && this.getType()) {
            return this.context.dropChess(new Chess(this.getType(), position))
        }
        return false;
    }
    abstract getType(): ChessType;
}

export default Player