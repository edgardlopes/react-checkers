import React from 'react'
import { BlackMan, WhiteMan } from './Piece'
import { Color, Score } from './types'

import './Info.css'

type Props = {
    score: Score
    turn: Color
    canUndo: boolean
    onUndoClick: () => void
    onNewGameClick: () => void
}

export const Info: React.FC<Props> = ({ score, turn, canUndo, onUndoClick, onNewGameClick }) => {
    return (
        <div className="info board">
            <div className="button-group flex">
                <button disabled={!canUndo} onClick={onUndoClick}>
                    Undo
                </button>
                <button onClick={onNewGameClick}>New Game</button>
            </div>

            <div className="current-turn" data-testid={`current-turn-${turn === 'black' ? 'black' : 'white'}`}>
                <span>Current turn</span>
                {turn === 'black' ? <BlackMan onClick={() => {}} /> : <WhiteMan onClick={() => {}} />}
            </div>
            <div className="score">
                <div>
                    <BlackMan onClick={() => {}} />
                    <span> {score.black}</span>
                </div>
                <div>
                    <WhiteMan onClick={() => {}} />
                    <span> {score.white}</span>
                </div>
            </div>
        </div>
    )
}
