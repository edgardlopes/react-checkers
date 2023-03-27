import { createEmptyBoard } from './boardConstants'
import { getPiecesToMove } from './getPiecesToMove'

describe('getPiecesToMove unit test', () => {
    it('should return movements for a standard piece', () => {
        const board = createEmptyBoard()
        board[7][7] = { color: 'white', isKing: false }

        const out = getPiecesToMove(board, 'white')

        expect(out).toHaveLength(1)
        expect(out[0].moves).toEqual([{ row: 6, col: 6 }])
    })

    it('should return movements to capture a piece', () => {
        const board = createEmptyBoard()
        board[0][0] = { color: 'black', isKing: false }
        board[1][1] = { color: 'white', isKing: false }

        const out = getPiecesToMove(board, 'black')

        expect(out).toHaveLength(1)
        expect(out[0].moves).toEqual([{ row: 2, col: 2 }])
    })

    it('should return an empty list when there is any piece', () => {
        const board = createEmptyBoard()

        const out = getPiecesToMove(board, 'black')

        expect(out).toHaveLength(0)
    })
})
