import Position from "../chess/Position";
import GameContext from "./GameContext";

export default abstract class AbstractState {
    protected gameContext!: GameContext
    public setContext(context: GameContext):void {
        this.gameContext = context
    }
    abstract start(): void
    abstract setChess(position: Position): boolean
    abstract dropChess(position: Position): boolean
    abstract stop(): void

}