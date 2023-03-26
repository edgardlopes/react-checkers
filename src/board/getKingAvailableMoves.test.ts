import { Position } from '../components/types'
import { getKingAvailableMoves } from './getKingAvailableMoves'

describe('getKingAvailableMoves', () => {
    it('Should return available moves when the piece is on the middle of the board', () => {
        const expected: Set<Position> = new Set([
            { row: 6, col: 6 },
            { row: 6, col: 4 },
            { row: 4, col: 4 },
            { row: 4, col: 6 },
        ])

        const moves = getKingAvailableMoves({ row: 5, col: 5 })

        expect(new Set(moves)).toEqual(expected)
    })

    it('should return all available moves for a position at the top left corner of the board', () => {
        const position = { col: 0, row: 0 }
        const expectedMoves = new Set([{ col: 1, row: 1 }])

        const result = getKingAvailableMoves(position)

        expect(new Set(result)).toEqual(expectedMoves)
    })

    it('should return all available moves for a position at the bottom right corner of the board', () => {
        const position = { col: 7, row: 7 }
        const expectedMoves = new Set([{ col: 6, row: 6 }])

        const result = getKingAvailableMoves(position)

        expect(new Set(result)).toEqual(expectedMoves)
    })

    it('should return all available moves for a position at the top right corner of the board', () => {
        const position = { col: 7, row: 0 }
        const expectedMoves = new Set([{ col: 6, row: 1 }])

        const result = getKingAvailableMoves(position)

        expect(new Set(result)).toEqual(expectedMoves)
    })

    it('should return all available moves for a position at the bottom left corner of the board', () => {
        const position = { col: 0, row: 7 }
        const expectedMoves = [{ col: 1, row: 6 }]

        const result = getKingAvailableMoves(position)

        expect(result).toEqual(expectedMoves)
    })

    it('should return all available moves for a position on the left edge of the board', () => {
        const position = { col: 0, row: 4 }
        const expectedMoves = new Set([
            { col: 1, row: 5 },
            { col: 1, row: 3 },
        ])
        const result = getKingAvailableMoves(position)
        expect(new Set(result)).toEqual(expectedMoves)
    })

    it('should return all available moves for a position on the top edge of the board', () => {
        const position = { col: 4, row: 0 }
        const expectedMoves = new Set([
            { col: 3, row: 1 },
            { col: 5, row: 1 },
        ])

        const result = getKingAvailableMoves(position)

        expect(new Set(result)).toEqual(expectedMoves)
    })

    it('should return all available moves for a position on the right edge of the board', () => {
        const position = { col: 7, row: 4 }
        const expectedMoves = new Set([
            { col: 6, row: 5 },
            { col: 6, row: 3 },
        ])
        const result = getKingAvailableMoves(position)
        expect(new Set(result)).toEqual(expectedMoves)
    })
})
