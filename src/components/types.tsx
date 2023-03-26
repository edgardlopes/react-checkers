export type Position = {
    row: number
    col: number
}

export type Color = 'black' | 'white'

export type Piece = {
    color: Color
    isKing: boolean
} | null

export type BoardSchema = Piece[][]
