import React from 'react'
import ChessType from "../engine/game/chess/ChessType";
import './Chessman.less'

interface IProps {
    row: number,
    col: number,
    size: number,
    isLast: boolean
    isFive: boolean
    type: ChessType
}

interface IState {

}

/**
 * 棋子
 */
class Chessman extends React.Component<IProps, IState> {

    handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    render(): React.ReactNode {
        const { row, col, type, isFive, isLast, size } = this.props
        const marginTop = (1.5 + row * 6.53) + '%'
        const marginLeft = (1.5 + col * 6.53) + '%'
        const className = type === ChessType.WHITE ? 'chessman white' : 'chessman'
        const isLastClass = isLast ? 'lastStep' : ''
        const isFiveClass = isFive ? 'fives' : ''
        return (<div className={`${className} ${isLastClass} ${isFiveClass}`} style={{ marginTop, marginLeft, width: size, height: size }} onClick={this.handleClick} />)
    }
}

export default Chessman