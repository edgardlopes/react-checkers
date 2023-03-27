import { createInitialBoard } from '../board/boardConstants'
import { BoardWithScoreState } from '../components/types'
import { boardReducer } from './boardReducer'

describe('boardReducer', () => {
    const initialBoardState: BoardWithScoreState = {
        board: createInitialBoard(),
        score: { black: 0, white: 0 },
        turn: 'white',
        gameOver: false,
    }

    it('should handle "pieceMoved" action', () => {
        const prevState = initialBoardState

        const newState = boardReducer(prevState, {
            type: 'pieceMoved',
            payload: {
                sourcePosition: { row: 5, col: 0 },
                finalPosition: { row: 4, col: 1 },
            },
        })

        expect(newState.board[5][0]).toBe(null)
        expect(newState.board[4][1]?.color).toBe('white')
        expect(newState.score.white).toBe(prevState.score.white)
        expect(newState.score.black).toBe(prevState.score.black)
        expect(newState.turn).toBe('black')
        expect(newState.gameOver).toBe(false)
    })

    it('should handle "outOfMoves" action', () => {
        const prevState = initialBoardState
        const newState = boardReducer(prevState, { type: 'outOfMoves' })

        expect(newState.board).toEqual(prevState.board)
        expect(newState.score).toEqual(prevState.score)
        expect(newState.turn).toBe('black')
        expect(newState.gameOver).toBe(true)
    })

    it('should handle "newGame" action', () => {
        const prevState: BoardWithScoreState = {
            board: [
                [null, { color: 'white', isKing: false }, null, { color: 'white', isKing: false }],
                [null, null, null, null],
                [null, null, null, null],
                [{ color: 'black', isKing: false }, null, { color: 'black', isKing: false }, null],
            ],
            score: { black: 5, white: 3 },
            turn: 'black',
            gameOver: true,
        }

        const newState = boardReducer(prevState, { type: 'newGame' })

        expect(newState.board).toEqual(initialBoardState.board)
        expect(newState.score).toEqual(initialBoardState.score)
        expect(newState.turn).toBe(initialBoardState.turn)
        expect(newState.gameOver).toBe(initialBoardState.gameOver)
    })
})
