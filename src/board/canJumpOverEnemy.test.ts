import { Piece, Position } from '../components/types'
import { createEmptyBoard } from './boardConstants'
import { canJumpOverEnemy } from './canJumpOverEnemy'

const black: Piece = { color: 'black', isKing: false }
const white: Piece = { color: 'white', isKing: false }

describe('canJumpOverEnemy unit test', () => {
    it('A white piece cannot move to the right if has another white piece', () => {
        const row = 6
        const col = 1

        const source: Position = { row: 7, col: 0 }

        const board = createEmptyBoard()
        board[6][1] = { ...white }

        const result = canJumpOverEnemy(board, 'white', source, { row, col })

        expect(result).toBeUndefined()
    })

    it('A white piece must capture a black piece if the board has a free slot after a that', () => {
        const board = createEmptyBoard()
        const source: Position = { row: 6, col: 1 }

        board[5][2] = { ...black }

        const result = canJumpOverEnemy(board, 'white', source, { row: 5, col: 2 })

        expect(result).toEqual({ movement: { col: 3, row: 4 }, mustCapture: true })
    })

    it('Should capture a black piece to the left', () => {
        const board = createEmptyBoard()
        const source: Position = { row: 6, col: 4 }
        board[5][3] = { ...black }

        const result = canJumpOverEnemy(board, 'white', source, { row: 5, col: 3 })

        expect(result).toEqual({ movement: { col: 2, row: 4 }, mustCapture: true })
    })

    it('A white piece cannot capture a black piece if the black piece is on the board edge', () => {
        const board = createEmptyBoard()
        const source: Position = { row: 4, col: 6 }
        board[3][7] = { ...black }

        const result = canJumpOverEnemy(board, 'white', source, { row: 3, col: 7 })

        expect(result).toBeUndefined()
    })

    it('A white piece cannot capture a black piece if there is another black piece after that', () => {
        const board = createEmptyBoard()

        const source: Position = { row: 4, col: 4 }

        board[3][5] = { ...black }
        board[2][6] = { ...black }

        const result = canJumpOverEnemy(board, 'white', source, { row: 3, col: 5 })

        expect(result).toBeUndefined()
    })

    it('Cannot move to outside the board', () => {
        const board = createEmptyBoard()

        let source: Position

        source = { row: 4, col: 7 }
        let result = canJumpOverEnemy(board, 'white', source, { row: 3, col: 8 })
        expect(result).toBeUndefined()

        source = { row: 4, col: 0 }
        result = canJumpOverEnemy(board, 'white', source, { row: 3, col: -1 })
        expect(result).toBeUndefined()

        source = { row: 0, col: 3 }
        result = canJumpOverEnemy(board, 'white', source, { row: -1, col: 2 })
        expect(result).toBeUndefined()

        source = { row: 7, col: 3 }
        result = canJumpOverEnemy(board, 'white', source, { row: 8, col: 2 })
        expect(result).toBeUndefined()
    })
})
