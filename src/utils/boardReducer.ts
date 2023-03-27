import { borderLimit, createInitialBoard } from '../board/boardConstants'
import { cloneBoard } from '../board/cloneBoard'
import { movePiece } from '../board/movePiece'
import { BoardWithScoreState, Position } from '../components/types'

type BoardActionType = 'pieceMoved' | 'outOfMoves' | 'newGame'

interface BoardAction {
    type: BoardActionType
    payload?: {
        sourcePosition: Position
        finalPosition: Position
    }
}

export const boardReducer = (state: BoardWithScoreState, { type, payload }: BoardAction): BoardWithScoreState => {
    if (type === 'pieceMoved') {
        const { finalPosition, sourcePosition } = payload!

        const { board: newBoard, hasCaptured } = movePiece(state.board, sourcePosition, finalPosition)
        const captureScore = hasCaptured ? 1 : 0

        if (borderLimit[state.turn] === finalPosition.row) {
            newBoard[finalPosition.row][finalPosition.col]!.isKing = true
        }

        return {
            board: newBoard,
            score: { ...state.score, [state.turn]: state.score[state.turn] + captureScore },
            turn: state.turn === 'white' ? 'black' : 'white',
            gameOver: state.score.black === 12 || state.score.white === 12,
        }
    }

    if (type === 'outOfMoves') {
        return {
            board: cloneBoard(state.board),
            score: { ...state.score },
            turn: state.turn === 'white' ? 'black' : 'white',
            gameOver: true,
        }
    }

    if (type === 'newGame') {
        return {
            board: createInitialBoard(),
            score: { black: 0, white: 0 },
            turn: 'white',
            gameOver: false,
        }
    }

    return state
}
