import Player from "./Player";
import ChessType from "../game/chess/ChessType";

class WhitePlayer extends Player {
    getType(): ChessType {
        return ChessType.WHITE;
    }
}

export default WhitePlayer