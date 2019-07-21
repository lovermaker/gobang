import {GameState} from "./Game";

interface GameHandler {
    onStart?(state: GameState): void
    onUpdate(state: GameState): void
    onOver(state: GameState): void
    onPause?(state: GameState): void
}

export default GameHandler