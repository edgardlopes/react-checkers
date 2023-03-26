import { Color, Piece, Position } from '../components/types'
import { borderLimit, colorStep } from './boardConstants'

// 8x8 board
export const getAvailableMoves = (position: Position, piece: Piece): Position[] => {
    if (!piece) return []

    const moves = [
        { col: position.col - 1, row: position.row + colorStep[piece.color] },
        { col: position.col + 1, row: position.row + colorStep[piece.color] },
    ]

    if (piece.isKing) {
        //king piece can go foward and backward
        moves.push({ col: position.col - 1, row: position.row - colorStep[piece.color] })
        moves.push({ col: position.col + 1, row: position.row - colorStep[piece.color] })
    }

    //remove movement to outside the board
    return moves.filter(({ col, row }) => col >= 0 && col <= 7 && row >= 0 && row <= 7)
}
