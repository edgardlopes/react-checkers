import { useEffect, useState } from 'react'
import { borderLimit, createInitialBoard } from '../board/boardConstants'
import { canJumpOverEnemy } from '../board/canJumpOverEnemy'
import { cloneBoard } from '../board/cloneBoard'
import { getAvailableMoves } from '../board/getAvailableMoves'
import { getPiecesToMove } from '../board/getPiecesToMove'
import { movePiece } from '../board/movePiece'
import { getRandom } from '../utils/getRandom'
import useUndoReducer from '../utils/useUndo'
import { Info } from './Info'
import { Row } from './Row'
import { BoardWithScoreState, Piece, Position } from './types'

type BoardActionType = 'pieceMoved' | 'outOfMoves' | 'newGame'

interface BoardAction {
    type: BoardActionType
    payload: {
        sourcePosition: Position
        finalPosition: Position
    }
}

const myReducer = (state: BoardWithScoreState, { type, payload }: BoardAction): BoardWithScoreState => {
    if (type === 'pieceMoved') {
        const { finalPosition, sourcePosition } = payload
        console.log(`moving piece ${sourcePosition} to `, finalPosition)

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
        console.log('new game!!')
        const board = createInitialBoard()
        console.log(board)
        return {
            board,
            score: { black: 0, white: 0 },
            turn: 'white',
            gameOver: false,
        }
    }

    return state
}

type Props = {
    initialGameState: BoardWithScoreState
}

export const Board: React.FC<Props> = ({ initialGameState }) => {
    const [availableMoves, setAvailableMoves] = useState<Position[]>([])
    const [currentPiece, setCurrentPiece] = useState<Position | undefined>()

    const { state, dispatch, canUndo } = useUndoReducer(myReducer, initialGameState)

    useEffect(() => {
        if (state.turn === 'black' && !state.gameOver) {
            const availablePieces = getPiecesToMove(state.board, state.turn)
            if (!availablePieces.length) {
                dispatch({ type: 'outOfMoves' })
            }

            const randomPiece = getRandom(availablePieces.length)
            const piece = availablePieces[randomPiece]
            if (piece) {
                const randomMove = getRandom(piece.moves.length)
                const move = piece.moves[randomMove]

                dispatch({ type: 'pieceMoved', payload: { sourcePosition: piece.position, finalPosition: move } })
            }

            console.log(availablePieces)
        }
    }, [state.turn, state.gameOver, state.board, dispatch])

    function pieceClicked(pieceClicked: Position, piece: Piece) {
        if (piece?.color !== state.turn) {
            return
        }

        setCurrentPiece(pieceClicked)

        const movements = getAvailableMoves(pieceClicked, piece)
            .map((position) => canJumpOverEnemy(state.board, state.turn, pieceClicked, position))
            .filter((square) => square)

        const mustCaptureMovements = movements.filter((a) => a?.mustCapture)

        if (mustCaptureMovements.length) {
            setAvailableMoves(mustCaptureMovements.map((square) => square?.movement) as Position[])
        } else {
            setAvailableMoves(movements.map((square) => square?.movement) as Position[])
        }
    }

    function squareClicked(finalPosition: Position) {
        if (!currentPiece) throw new Error('Does not have selected piece')

        dispatch({ type: 'pieceMoved', payload: { sourcePosition: currentPiece, finalPosition } })

        setCurrentPiece(undefined)
        setAvailableMoves([])
    }

    return (
        <div className="flex container">
            <div className="board">
                {state.gameOver && (
                    <div className="flex blurred">
                        <div>{state.score.black > state.score.white ? 'Black wins!' : 'white wins!'}</div>
                        <button onClick={() => dispatch({ type: 'newGame' })}>New game</button>
                    </div>
                )}
                {state.board.map((rowData: any, rowIndex: number) => {
                    return <Row squareClicked={squareClicked} key={rowIndex.toString()} rowIndex={rowIndex} data={rowData} pieceClicked={pieceClicked} availableMoves={availableMoves} />
                })}
            </div>

            <Info canUndo={canUndo} onNewGameClick={() => dispatch({ type: 'newGame' })} onUndoClick={() => dispatch({ type: 'UNDO' })} score={state.score} turn={state.turn} />
        </div>
    )
}
