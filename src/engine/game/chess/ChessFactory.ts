import Chess from "./Chess";
import ChessType from "./ChessType";
import Position from "./Position";

class ChessFactory {
    static newBlackChess(position: Position): Chess {
       return new Chess(ChessType.BLACK, position)
    }
    static newWhiteChess(position: Position): Chess {
        return new Chess(ChessType.WHITE, position)
    }
}

export default ChessFactory