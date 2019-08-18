import Position from "../game/chess/Position";

export default interface IPlayer {
    setChess(position: Position): boolean;
    dropChess(position: Position): boolean;
}