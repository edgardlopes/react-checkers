import { Position } from '../components/types'

// 8x8 board
export const getKingAvailableMoves = (position: Position): Position[] => {
    const moves = [
        { row: position.row + 1, col: position.col - 1 },
        { row: position.row + 1, col: position.col + 1 },
        { row: position.row - 1, col: position.col - 1 },
        { row: position.row - 1, col: position.col + 1 },
    ]

    return moves.filter(({ col, row }) => col >= 0 && col <= 7 && row >= 0 && row <= 7)
}
