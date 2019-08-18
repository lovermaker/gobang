import React from 'react'
import {Button, Toast} from 'antd-mobile'
import HumanGame from "../engine/game/HumanGame";
import './GameBoard.less'
import Chessman from "./Chessman";
import ChessType from "../engine/game/chess/ChessType";
import Avatar from "./Avatar";
import StateListener from "../engine/game/state/StateListener";
import AbstractState from "../engine/game/state/AbstractState";
import GameState from "../engine/game/state/GameState";
import IGame from "../engine/game/IGame";
import Position from '../engine/game/chess/Position'

interface IProps {

}

interface IState {
    gameState: AbstractState
    fiveArray: Position[]
}

class GameBoard extends React.Component<IProps, IState> implements StateListener {
    game: IGame
    board?: HTMLDivElement | null

    constructor(props: IProps) {
        super(props)
        this.game = new HumanGame()
        this.game.addListener(this)
        this.state = {
            gameState: GameState.NOT_STARTED,
            fiveArray: []
        }
    }
    componentDidMount(): void {
        this.game.startGame()
    }

    onWin(state: AbstractState, five: Array<Position>): void {

        this.setState({gameState: state, fiveArray: five})
    }

    onUpdate(state: AbstractState): void {
        this.setState({gameState: state})
    }

    onStart(state: AbstractState): void {
        this.setState({gameState: state})
    }

    handleStartClick = () => {
    }

    get isStarted() {
        const {gameState} = this.state
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

            this.game.setChess(new Position(row, col))

        }
    }
    isLast = (row: number, col: number): boolean => {
        const chessSteps = this.game.getChessSteps()
        if (chessSteps.length > 0) {
            const step = chessSteps[chessSteps.length - 1]
            return step.position.row === row && step.position.col === col
        }
        return false
    }
    isFiveItem = (row: number, col: number): boolean => {
        const {fiveArray} = this.state
        for (const index in fiveArray) {
            const p = fiveArray[index]
            if (p.row === row && p.col === col) {
                return true
            }
        }
        return false
    }

    render(): React.ReactNode {
        const board = this.game.getChessBoard()
        let chessMen = []
        const boardSize = Math.min(document.body.clientWidth, 500) * 0.9

        for (const row in board) {
            for (const col in board[row]) {
                const item = board[row][col]
                if (item !== ChessType.EMPTY) {
                    const isLast = this.isLast(Number(row), Number(col))
                    const isFive = this.isFiveItem(Number(row), Number(col))
                    console.log(isFive, row, col)
                    chessMen.push(<Chessman size={boardSize / 18} isLast={isLast} isFive={isFive} type={item}
                                            key={`${row}-${col}`} row={Number(row)} col={Number(col)}/>)
                }
            }
        }
        return <div className="content">
            <Avatar isComputer={true}/>
            <div ref={board => this.board = board} className="board" style={{width: boardSize, height: boardSize}}
                 onClick={this.handleClick}>
                {chessMen}
            </div>
            <Avatar right white isComputer={false}/>
            <div>
                <Button type="primary" inline size="small" style={{marginRight: '4px'}} disabled={this.isStarted}
                        onClick={this.handleStartClick}>开始游戏</Button>
            </div>
        </div>;
    }

    stateChange(state: AbstractState): void {
        if (state === GameState.BLACK_WIN) {
            Toast.success('黑棋胜利')
        }
        if (state === GameState.WHITE_WIN) {
            Toast.success('白棋胜利')
        }
        this.setState({ gameState: state })
    }
}

export default GameBoard
