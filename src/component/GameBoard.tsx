import React from 'react'
import {Button, Toast} from 'antd-mobile'
import Game, {GameState} from "../engine/Game";
import './GameBoard.less'
import Chessman from "./Chessman";
import ChessType from "../engine/ChessType";
import {Human} from "../engine/player/Human";
import GameHandler from "../engine/GameHandler";
import Avatar from "./Avatar";
import {Computer} from "../engine/player/Computer";

interface IProps {

}

interface IState {
    gameState: GameState
}

class GameBoard extends React.Component<IProps, IState> implements GameHandler{
    game: Game
    board?: HTMLDivElement| null
    constructor(props: IProps) {
        super(props)
        this.game = new Game(this)

        this.state = {
            gameState: GameState.NOT_STARTED
        }
    }
    onOver(state: GameState): void {
        if (state === GameState.BLACK_WIN) {
            Toast.success('黑棋胜利')
        }
        if (state === GameState.WHITE_WIN) {
            Toast.success('白棋胜利')
        }
        this.setState({ gameState: state })
    }

    onUpdate(state: GameState): void {
        this.setState({ gameState: state })
    }
    onStart(state: GameState): void {
        this.setState({ gameState: state })
    }

    handleStartClick = () => {
        const startGame = (humanFirst: boolean) => {
            this.game.setBlackPlayer(humanFirst ? new Human() : new Computer())
            this.game.setWhitePlayer(humanFirst ? new Computer() : new Human())
            this.game.start()
        }
        // Modal.alert('开局提示', '谁先下棋', [
        //     { text: '电脑先手', onPress: () => startGame(false), style: 'default' },
        //     { text: '玩家先手', onPress: () => startGame(true) },
        // ])
        startGame(true)
    }
    get isStarted() {
        const { gameState } = this.state
        return gameState === GameState.NEXT_BLACK || gameState === GameState.NEXT_WHITE
    }
    handleClick = (e: React.MouseEvent) => {
        if (!this.isStarted) {
            Toast.info('请点击开始游戏')
            return
        }
        if (this.board && this.isStarted) {
            const y = e.clientY - this.board.offsetTop,
                x = e.clientX - this.board.offsetLeft,
                width = this.board.clientWidth,
                offset = width * 0.044,
                step = width * 0.065;
            const col = Math.floor((x + offset) / step) - 1
            const row = Math.floor((y + offset) / step) - 1
            const player = this.game.getCurrentPlayer()
            if (player && !player.isComputer) {
                console.log(player)
                player.setChess(row, col)
            }
        }
    }
    isLast = (row: number, col: number): boolean => {
        if (this.game.chessSteps.length > 0) {
            const step = this.game.chessSteps[this.game.chessSteps.length - 1]
            return step.row === row && step.col === col
        }
        return false
    }
    render(): React.ReactNode {
        const board = this.game.getChessBoard()
        let chessMen = []
        const boardSize = Math.min(document.body.clientWidth, 500) * 0.9

        for(const row in board) {
            for (const col in board[row]) {
                const item = board[row][col]
                const isLast = this.isLast(Number(row), Number(col))
                if (item !== ChessType.EMPTY) {
                    chessMen.push(<Chessman size={boardSize / 18} isLast={isLast} isFive={false} type={item} key={`${row}-${col}`} row={Number(row)} col={Number(col)} />)
                }
            }
        }
        return <div className="content">
            <Avatar isComputer={true}/>
            <div ref={board => this.board = board } className="board" style={{ width: boardSize, height: boardSize }} onClick={this.handleClick}>
                {chessMen}
            </div>
            <Avatar right white isComputer={false}/>
            <div>
                <Button type="primary" inline size="small" style={{ marginRight: '4px' }} disabled={this.isStarted} onClick={this.handleStartClick}>开始游戏</Button>
            </div>
        </div>;
    }
}

export default GameBoard
