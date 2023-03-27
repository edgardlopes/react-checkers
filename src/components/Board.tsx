import { useEffect, useState } from 'react'
import { canJumpOverEnemy } from '../board/canJumpOverEnemy'
import { getAvailableMoves } from '../board/getAvailableMoves'
import { getPiecesToMove } from '../board/getPiecesToMove'
import { boardReducer } from '../utils/boardReducer'
import { getRandom } from '../utils/getRandom'
import useUndoReducer from '../utils/useUndo'
import { Info } from './Info'
import { Row } from './Row'
import { BoardWithScoreState, Piece, Position } from './types'

type Props = {
    initialGameState: BoardWithScoreState
}

export const Board: React.FC<Props> = ({ initialGameState }) => {
    const [availableMoves, setAvailableMoves] = useState<Position[]>([])
    const [currentPiece, setCurrentPiece] = useState<Position | undefined>()

    const { state, dispatch, canUndo } = useUndoReducer(boardReducer, initialGameState)

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
