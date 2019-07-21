import React from 'react'
import './Avatar.less'

interface IProps {
    right?: boolean
    white?: boolean
    isComputer: boolean
}

interface IState {
}

class Avatar extends React.Component<IProps, IState> {
    render(): React.ReactNode {
        const { right, white, isComputer } = this.props
        const justifyContent = right ? 'flex-end': ''
        const text = white ? '白棋' : '黑棋'
        const player = isComputer ? '电脑' : '玩家'
        const alignItems = right ? 'flex-end' : ''
        const playerText = right ? `[${player}] ${text}` : `${text} [${player}]`
        return <div className="avatar" style={{ justifyContent }}>
            <div className="image-wrapper" style={{ alignItems }}>
                <div className="image person" />
                <span className="text">{playerText}</span>
            </div>

        </div>;
    }
}

export default Avatar