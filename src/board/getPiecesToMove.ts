import { BoardSchema, Color, Piece, Position } from '../components/types'
import { canJumpOverEnemy } from './canJumpOverEnemy'
import { getAvailableMoves } from './getAvailableMoves'

export type PieceWithPositionAndMoves = {
    piece: Piece
    position: Position
    moves: Position[]
}

/**
 * Returns a list of piece's positions that can be moved
 * @param board
 * @returns
 */
export const getPiecesToMove = (board: BoardSchema, turn: Color): PieceWithPositionAndMoves[] => {
    return board
        .flatMap((row, rowIndex) => {
            return row.map((piece, col) => ({ position: { row: rowIndex, col }, piece })).filter(({ piece }) => piece?.color === turn)
        })
        .map(({ piece, position }) => {
            const moves = getAvailableMoves(position, piece)
                .map((finalPosition) => canJumpOverEnemy(board, turn, position, finalPosition))
                .filter((position) => position)
                .map((position) => position?.movement) as Position[]

            return {
                piece,
                position,
                moves,
            }
        })
        .filter((fullPiece) => fullPiece?.moves?.length)
}
