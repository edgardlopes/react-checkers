import { Position } from '../components/types'
import { getAvailableMoves } from './getAvailableMoves'

describe('board unit tests', () => {
    it('should increment the row for black pieces', () => {
        const result = getAvailableMoves({ col: 1, row: 0 }, { color: 'black', isKing: false })

        const expected: Position[] = [
            { col: 0, row: 1 },
            { col: 2, row: 1 },
        ]

        expect(result).toEqual(expected)
    })

    it('should decrement the row for white pieces', () => {
        const result = getAvailableMoves({ col: 1, row: 7 }, { color: 'white', isKing: false })

        const expected: Position[] = [
            { col: 0, row: 6 },
            { col: 2, row: 6 },
        ]

        expect(result).toEqual(expected)
    })

    it('Should not go ahead if a black piece is on the opposite side', () => {
        const result = getAvailableMoves({ col: 1, row: 7 }, { color: 'black', isKing: false })

        const expected: Position[] = []

        expect(result).toEqual(expected)
    })

    it('Should not go ahead if a white piece is on the opposite side', () => {
        const result = getAvailableMoves({ col: 1, row: 0 }, { color: 'white', isKing: false })

        const expected: Position[] = []

        expect(result).toEqual(expected)
    })

    it('Should not return a movement if it is most left position', () => {
        const result = getAvailableMoves({ col: 0, row: 2 }, { color: 'black', isKing: false })

        const expected: Position[] = [{ col: 1, row: 3 }]

        expect(result).toEqual(expected)
    })

    it('A white piece not return a movement if it is most left position', () => {
        const result = getAvailableMoves({ col: 0, row: 5 }, { color: 'white', isKing: false })

        const expected: Position[] = [{ col: 1, row: 4 }]

        expect(result).toEqual(expected)
    })

    it("A black piece can't go right if it is on the most right position", () => {
        const result = getAvailableMoves({ col: 7, row: 2 }, { color: 'black', isKing: false })

        const expected: Position[] = [{ col: 6, row: 3 }]

        expect(result).toEqual(expected)
    })

    it("A white piece can't go right if it is on the most right position", () => {
        const result = getAvailableMoves({ col: 7, row: 5 }, { color: 'white', isKing: false })

        const expected: Position[] = [{ col: 6, row: 4 }]

        expect(result).toEqual(expected)
    })

    it('Should return available moves when a king piece is on the middle of the board', () => {
        const expected: Set<Position> = new Set([
            { row: 6, col: 6 },
            { row: 6, col: 4 },
            { row: 4, col: 4 },
            { row: 4, col: 6 },
        ])

        const moves = getAvailableMoves({ row: 5, col: 5 }, { color: 'black', isKing: true })

        expect(new Set(moves)).toEqual(expected)
    })

    it('should return all available moves for king piece at the top left corner of the board', () => {
        const position = { col: 0, row: 0 }
        const expectedMoves = new Set([{ col: 1, row: 1 }])

        const result = getAvailableMoves(position, { color: 'black', isKing: true })

        expect(new Set(result)).toEqual(expectedMoves)
    })

    it('should return all available moves for king piece position at the bottom right corner of the board', () => {
        const position = { col: 7, row: 7 }
        const expectedMoves = new Set([{ col: 6, row: 6 }])

        const result = getAvailableMoves(position, { color: 'black', isKing: true })

        expect(new Set(result)).toEqual(expectedMoves)
    })

    it('should return all available moves for king piece at the top right corner of the board', () => {
        const position = { col: 7, row: 0 }
        const expectedMoves = new Set([{ col: 6, row: 1 }])

        const result = getAvailableMoves(position, { color: 'black', isKing: true })

        expect(new Set(result)).toEqual(expectedMoves)
    })

    it('should return all available moves for a king piece at the bottom left corner of the board', () => {
        const position = { col: 0, row: 7 }
        const expectedMoves = [{ col: 1, row: 6 }]

        const result = getAvailableMoves(position, { color: 'black', isKing: true })

        expect(result).toEqual(expectedMoves)
    })

    it('should return all available moves for king piece at the left edge of the board', () => {
        const position = { col: 0, row: 4 }
        const expectedMoves = new Set([
            { col: 1, row: 5 },
            { col: 1, row: 3 },
        ])
        const result = getAvailableMoves(position, { color: 'black', isKing: true })
        expect(new Set(result)).toEqual(expectedMoves)
    })

    it('should return all available moves for a king piece at the top edge of the board', () => {
        const position = { col: 4, row: 0 }
        const expectedMoves = new Set([
            { col: 3, row: 1 },
            { col: 5, row: 1 },
        ])

        const result = getAvailableMoves(position, { color: 'black', isKing: true })

        expect(new Set(result)).toEqual(expectedMoves)
    })

    it('should return all available moves for a king piece at the right edge of the board', () => {
        const position = { col: 7, row: 4 }
        const expectedMoves = new Set([
            { col: 6, row: 5 },
            { col: 6, row: 3 },
        ])
        const result = getAvailableMoves(position, { color: 'black', isKing: true })
        expect(new Set(result)).toEqual(expectedMoves)
    })
})
