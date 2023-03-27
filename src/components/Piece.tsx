import React from 'react'
import crown from '../assets/crown.svg'
import { Piece } from './types'

interface Props {
    onClick: (type: Piece) => void
}

export type PieceComponent = React.FunctionComponent<Props>

export const BlackMan: PieceComponent = ({ onClick }) => {
    return (
        <div className={'piece black'}>
            <div></div>
        </div>
    )
}

export const WhiteMan: PieceComponent = ({ onClick }) => {
    return (
        <div className={'piece red'} onMouseOver={() => onClick({ color: 'white', isKing: false })} onClick={() => onClick({ color: 'white', isKing: false })}>
            <div></div>
        </div>
    )
}

export const WhiteKing: PieceComponent = ({ onClick }) => {
    return (
        <div className={'piece red'} onMouseOver={() => onClick({ color: 'white', isKing: true })} onClick={() => onClick({ color: 'white', isKing: true })}>
            <div>
                <img src={crown} alt="A white king" />
            </div>
        </div>
    )
}

export const BlackKing: PieceComponent = ({ onClick }) => {
    return (
        <div className={'piece black'}>
            <div>
                <img src={crown} alt="A black king" />
            </div>
        </div>
    )
}
