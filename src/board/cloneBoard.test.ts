import { BoardSchema } from '../components/types'
import { cloneBoard } from './cloneBoard'

describe('cloneBoard unit tests', () => {
    it('Should clone properly', () => {
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

        const anotherBoard = cloneBoard(emptyBoard)

        anotherBoard[0][0] = { color: 'black', isKing: false }

        expect(emptyBoard[0][0]).toBeNull()
    })
})
