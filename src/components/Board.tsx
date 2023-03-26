import { useReducer, useState } from 'react'
import { borderLimit, initialBoard } from '../board/boardConstants'
import { canJumpOverEnemy } from '../board/canJumpOverEnemy'
import { getAvailableMoves } from '../board/getAvailableMoves'
import { movePiece } from '../board/movePiece'
import { BlackMan, WhiteMan } from './Piece'
import { Row } from './Row'
import { BoardSchema, Color, Piece, Position } from './types'

type Score = Record<Color, number>

interface BoardWithScoreState {
    board: BoardSchema
    score: Score
    turn: Color
}

type BoardActionType = 'pieceMoved'

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
        }
    }

    return state
}

export function Board() {
    // const [turn, setTurn] = useState<Color>('white')
    const [availableMoves, setAvailableMoves] = useState<Position[]>([])
    const [currentPiece, setCurrentPiece] = useState<Position | undefined>()
    // const [board, setBoard] = useState(initialState)
    // const [score, setScore] = useState<Score>({ black: 0, white: 0 })

    const [state, dispatch] = useReducer(myReducer, {
        board: initialBoard,
        score: { black: 0, white: 0 },
        turn: 'white',
    })

    function pieceClicked(pieceClicked: Position, piece: Piece) {
        if (piece?.color !== state.turn) {
            console.log('invalid move')
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

        // console.log(`moving piece ${currentPiece} to `, { row, col })

        // const { board: newBoard, hasCaptured } = movePiece(board, currentPiece, { row, col })

        // if (hasCaptured) {
        //     setScore({ ...score, [turn]: score[turn] + 1 })
        // }

        // if (borderLimit[turn] === row) {
        //     newBoard[row][col]!.isKing = true
        // }

        dispatch({ type: 'pieceMoved', payload: { sourcePosition: currentPiece, finalPosition } })

        // setBoard(newBoard)
        setCurrentPiece(undefined)
        // setTurn(turn === 'white' ? 'black' : 'white')
        setAvailableMoves([])
    }

    function undo() {
        console.log('undo')
    }

    return (
        <div className="container">
            <div className="board">
                {state.board.map((rowData, rowIndex) => {
                    return <Row squareClicked={squareClicked} key={rowIndex.toString()} rowIndex={rowIndex} data={rowData} pieceClicked={pieceClicked} availableMoves={availableMoves} />
                })}
            </div>

            <div className="info board">
                <button onClick={undo}>Undo</button>
                <div className="current-turn">
                    <span>Current turn</span>
                    {state.turn === 'black' ? <BlackMan onClick={() => {}} /> : <WhiteMan onClick={() => {}} />}
                </div>
                <div className="score">
                    <div>
                        <BlackMan onClick={() => {}} />
                        <span> {state.score.black}</span>
                    </div>
                    <div>
                        <WhiteMan onClick={() => {}} />
                        <span> {state.score.white}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
