import { BoardSchema, Color, Position } from '../components/types'
import { colorStep } from './boardConstants'
import { cloneBoard } from './cloneBoard'

/**
 * Function to move a piece to another square, also identifies wheter is a jump and remove the jumped piece
 * Doesn't check the color, that is done by another function
 * @param board
 * @param sourcePosition
 * @param finalPosition
 * @returns
 */
export const movePiece = (board: BoardSchema, sourcePosition: Position, finalPosition: Position): { board: BoardSchema; hasCaptured: boolean } => {
    const squaresWalked = Math.abs(finalPosition.col - sourcePosition.col)

    if (squaresWalked > 2) {
        console.log('Invalid move')
        return { board, hasCaptured: false }
    }

    const newBoard = cloneBoard(board)

    const hasCaptured = squaresWalked === 2

    if (hasCaptured) {
        const dRow = (sourcePosition.row + finalPosition.row) / 2
        const dCol = (sourcePosition.col + finalPosition.col) / 2

        newBoard[dRow][dCol] = null
    }

    newBoard[finalPosition.row][finalPosition.col] = newBoard[sourcePosition.row][sourcePosition.col]

    newBoard[sourcePosition.row][sourcePosition.col] = null

    return {
        board: newBoard,
        hasCaptured,
    }
}
