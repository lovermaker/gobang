import Chess from "./chess/Chess";
import ChessType from "./chess/ChessType";

export default interface ActionContext {
    newBoard():void;
    setChess(chess: Chess): boolean
    dropChess(chess: Chess): boolean
    getChessBoard(): Array<Array<ChessType>>
}