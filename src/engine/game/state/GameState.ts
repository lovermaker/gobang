import NotStartedState from "./NotStartedState";
import NextWhiteState from "./NextWhiteState";
import NextBlackState from "./NextBlackState";
import BlackWinState from "./BlackWinState";
import WhiteWinState from "./WhiteWinState";
import OverState from "./OverState";

class GameState {
    public static NOT_STARTED: NotStartedState = new NotStartedState()
    public static NEXT_WHITE: NextWhiteState = new NextWhiteState()
    public static NEXT_BLACK: NextBlackState = new NextBlackState()
    public static BLACK_WIN: BlackWinState = new BlackWinState()
    public static WHITE_WIN: WhiteWinState = new WhiteWinState()
    public static OVER: OverState = new OverState()
}

export default GameState