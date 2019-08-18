import Player from "./Player";
import ChessType from "../game/chess/ChessType";

class BlackPlayer extends Player{
    getType(): ChessType {
        return ChessType.BLACK;
    }
}

export default BlackPlayer