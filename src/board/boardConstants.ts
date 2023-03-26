import { BoardSchema, Color, Piece } from '../components/types'
import { cloneBoard } from './cloneBoard'

const black: Piece = { color: 'black', isKing: false }
const white: Piece = { color: 'white', isKing: false }

const emptyBoard: BoardSchema = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null], // w: 4, 6 b: 3, 7
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
]

export const createEmptyBoard = () => cloneBoard(emptyBoard)

export const initialBoard: BoardSchema = [
    [null, { ...black }, null, { ...black }, null, { ...black }, null, { ...black }],
    [{ ...black }, null, { ...black }, null, { ...black }, null, { ...black }, null],
    [null, { ...black }, null, { ...black }, null, { ...black }, null, { ...black }],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [{ ...white }, null, { ...white }, null, { ...white }, null, { ...white }, null],
    [null, { ...white }, null, { ...white }, null, { ...white }, null, { ...white }],
    [{ ...white }, null, { ...white }, null, { ...white }, null, { ...white }, null],
]

export const colorStep: Record<Color, number> = {
    black: 1,
    white: -1,
}

export const borderLimit: Record<Color, number> = {
    black: 7,
    white: 0,
}
