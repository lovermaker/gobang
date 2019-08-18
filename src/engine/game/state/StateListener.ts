import AbstractState from "./AbstractState";
import Position from "../chess/Position";

export default interface StateListener {
    stateChange(state: AbstractState): void;
    onWin(state: AbstractState, five: Array<Position>): void
}