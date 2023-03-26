import { Piece } from '../components/types'
import { createEmptyBoard } from './boardConstants'
import { movePiece } from './movePiece'

describe('movePiece unit tests', () => {
    it('Does not change the board if a piece has moved more than 2 squares', () => {
        const board = createEmptyBoard()
        const piece: Piece = { color: 'white', isKing: false }

        board[0][0] = piece

        const { board: newBoard, hasCaptured } = movePiece(board, { row: 0, col: 0 }, { row: 4, col: 4 })

        expect(newBoard[0][0]).toEqual(piece)
        expect(newBoard[4][4]).toBeNull()
        expect(hasCaptured).toBeFalsy()
    })

    it('Should move piece without capture the enemy', () => {
        const board = createEmptyBoard()
        const piece: Piece = { color: 'white', isKing: false }

        board[0][0] = piece

        const { board: newBoard, hasCaptured } = movePiece(board, { row: 0, col: 0 }, { row: 1, col: 1 })

        expect(newBoard[0][0]).toBeNull()
        expect(newBoard[1][1]).toEqual(piece)
        expect(hasCaptured).toBeFalsy()
    })

    it('Should capture the enemy with a white piece on a right movement', () => {
        const board = createEmptyBoard()
        board[7][5] = { color: 'white', isKing: false }
        board[6][6] = { color: 'black', isKing: false }

        const { board: newBoard, hasCaptured } = movePiece(board, { row: 7, col: 5 }, { row: 5, col: 7 })

        expect(hasCaptured).toBeTruthy()
        expect(newBoard[7][5]).toBeNull()
        expect(newBoard[5][7]?.color).toBe('white')
        expect(newBoard[6][6]).toBeNull()
    })

    it('Should capture the enemy with a white piece on a left movement', () => {
        const board = createEmptyBoard()
        board[7][5] = { color: 'white', isKing: false }
        board[6][4] = { color: 'black', isKing: false }

        const { board: newBoard, hasCaptured } = movePiece(board, { row: 7, col: 5 }, { row: 5, col: 3 })

        expect(hasCaptured).toBeTruthy()
        expect(newBoard[7][5]).toBeNull()
        expect(newBoard[5][3]?.color).toBe('white')
        expect(newBoard[6][4]).toBeNull()
    })

    it('Should capture the enemy with a black piece on a right movement', () => {
        const board = createEmptyBoard()
        board[0][5] = { color: 'black', isKing: false }
        board[1][6] = { color: 'white', isKing: false }

        const { board: newBoard, hasCaptured } = movePiece(board, { row: 0, col: 5 }, { row: 2, col: 7 })

        expect(hasCaptured).toBeTruthy()
        expect(newBoard[0][5]).toBeNull()
        expect(newBoard[2][7]?.color).toBe('black')
        expect(newBoard[1][6]).toBeNull()
    })

    it('Should capture the enemy with a black piece on a left movement', () => {
        const board = createEmptyBoard()
        board[0][5] = { color: 'black', isKing: false }
        board[1][4] = { color: 'white', isKing: false }

        const { board: newBoard, hasCaptured } = movePiece(board, { row: 0, col: 5 }, { row: 2, col: 3 })

        expect(hasCaptured).toBeTruthy()
        expect(newBoard[0][5]).toBeNull()
        expect(newBoard[2][3]?.color).toBe('black')
        expect(newBoard[1][4]).toBeNull()
    })
})
