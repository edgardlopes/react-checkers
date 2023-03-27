import { BoardSchema } from '../components/types'

export const cloneBoard = (board: BoardSchema) => board.map((row) => row.map((square) => (square ? { ...square } : null)))
