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

export type Score = Record<Color, number>

export type BoardWithScoreState = {
    board: BoardSchema
    score: Score
    turn: Color
    gameOver: boolean
}
