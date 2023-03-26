import React from 'react'
import { BlackKing, BlackMan, WhiteKing, WhiteMan } from './Piece'

import { Square } from './Square'
import { Piece, Position } from './types'

type Props = {
    rowIndex: number
    data: any
    availableMoves: Position[]
    pieceClicked: (position: Position, piece: Piece) => void
    squareClicked: (position: Position) => void
}

export const Row: React.FC<Props> = ({ rowIndex, data, availableMoves = [], pieceClicked, squareClicked }) => {
    function validateMovement(isAvailableMove: boolean, position: Position) {
        if (isAvailableMove) {
            squareClicked(position)
        }
    }

    function renderPiece(piece: Piece, colIndex: number) {
        if (!piece) return

        const { color, isKing } = piece

        if (color === 'black') {
            return isKing ? (
                <BlackKing onClick={(type) => pieceClicked({ row: rowIndex, col: colIndex }, type)} />
            ) : (
                <BlackMan onClick={(type) => pieceClicked({ row: rowIndex, col: colIndex }, type)} />
            )
        }

        return isKing ? <WhiteKing onClick={(type) => pieceClicked({ row: rowIndex, col: colIndex }, type)} /> : <WhiteMan onClick={(type) => pieceClicked({ row: rowIndex, col: colIndex }, type)} />
    }

    return (
        <div className="row">
            {data.map((piece: Piece, colIndex: number) => {
                const isAvailableMove = !!availableMoves.find((position) => position.row === rowIndex && position.col === colIndex)
                return (
                    <Square key={colIndex + rowIndex} row={rowIndex} column={colIndex} selected={isAvailableMove} onClick={() => validateMovement(isAvailableMove, { row: rowIndex, col: colIndex })}>
                        {renderPiece(piece, colIndex)}
                    </Square>
                )
            })}
        </div>
    )
}
