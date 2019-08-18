import StateListener from "./state/StateListener";
import ChessType from "./chess/ChessType";
import Chess from "./chess/Chess";
import Position from "./chess/Position";

export default interface IGame {
    startGame(): void;
    stopGame(): void;
    pauseGame(): void;
    setChess(position: Position): boolean
    dropChess(position: Position): boolean
    addListener(listener: StateListener): void;
    getChessBoard(): Array<Array<ChessType>>
    getChessSteps(): Array<Chess>
}