import { Color, Position } from '../components/types'
import { borderLimit, colorStep } from './boardConstants'

// 8x8 board
export const getAvailableMoves = (position: Position, color: Color): Position[] => {
    if (position.row === borderLimit[color]) {
        return []
    }

    if (position.col === 0) {
        return [{ col: position.col + 1, row: position.row + colorStep[color] }]
    }

    if (position.col === 7) {
        return [{ col: position.col - 1, row: position.row + colorStep[color] }]
    }

    return [
        { col: position.col - 1, row: position.row + colorStep[color] },
        { col: position.col + 1, row: position.row + colorStep[color] },
    ]
}
