import { BoardSchema, Color, Position } from '../components/types'

type NextJump = {
    movement: Position
    mustCapture: boolean
}

export const canKingJumpOverEnemy = (board: BoardSchema, turn: Color, sourcePosition: Position, possibleJump: Position, level = 1): NextJump | undefined => {
    const { row, col } = possibleJump

    if (level > 2) {
        return undefined
    }

    if (row === -1 || row === 8 || col === -1 || col === 8) {
        return undefined
    }

    if (board[row][col]?.color === turn.toLowerCase()) {
        return undefined
    }

    if (!board[row][col]) {
        return { movement: { row, col }, mustCapture: level > 1 }
    }

    const rowStep = possibleJump.row - sourcePosition.row
    const colStep = possibleJump.col - sourcePosition.col

    return canKingJumpOverEnemy(board, turn, possibleJump, { col: col + colStep, row: row + rowStep }, level + 1)
}
