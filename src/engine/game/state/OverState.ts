import AbstractState from "./AbstractState";
import Position from "../chess/Position";

class OverState extends AbstractState {
    dropChess(position: Position): boolean {
        return false
    }

    setChess(position: Position): boolean {
        return false
    }

    start(): void {
    }

    stop(): void {
    }
}

export default OverState