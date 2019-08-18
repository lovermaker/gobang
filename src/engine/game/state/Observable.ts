import StateListener from "./StateListener";
import AbstractState from "./AbstractState";
import Position from "../chess/Position";

export default abstract class Observable {
    list :Array<StateListener> = []
    addListener(listener: StateListener) {
        this.list.push(listener)
    }
    notifyStateChange(state: AbstractState) {
        for(const item of this.list) {
            item.stateChange(state)
        }
    }

    notifyWin(state: AbstractState, five: Array<Position>) {
        for(const item of this.list) {
            item.onWin(state, five)
        }
    }
}