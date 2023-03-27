import React from 'react'
import crown from '../assets/crown.svg'
import { Piece } from './types'

import './Piece.css'

interface Props {
    onClick?: (type: Piece) => void
}

export type PieceComponent = React.FunctionComponent<Props>

export const BlackMan: PieceComponent = () => {
    return (
        <div data-testid="piece-black" className={'piece black'}>
            <div></div>
        </div>
    )
}

export const WhiteMan: PieceComponent = ({ onClick }) => {
    return (
        <div data-testid="piece-white" className={'piece red'} onMouseOver={() => onClick && onClick({ color: 'white', isKing: false })}>
            <div></div>
        </div>
    )
}

export const WhiteKing: PieceComponent = ({ onClick }) => {
    return (
        <div data-testid="piece-white-king" className={'piece red'} onMouseOver={() => onClick && onClick({ color: 'white', isKing: true })}>
            <div>
                <img src={crown} alt="A white king" />
            </div>
        </div>
    )
}

export const BlackKing: PieceComponent = () => {
    return (
        <div data-testid="piece-black-king" className={'piece black'}>
            <div>
                <img src={crown} alt="A black king" />
            </div>
        </div>
    )
}
