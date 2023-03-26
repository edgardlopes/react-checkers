import { useReducer, useState } from 'react'
import { initialState } from '../board/boardConstants'
import { canJumpOverEnemy } from '../board/canJumpOverEnemy'
import { getAvailableMoves } from '../board/getAvailableMoves'
import { movePiece } from '../board/movePiece'
import { BlackMan, WhiteMan } from './Piece'
import { Row } from './Row'
import { Color, Piece, Position } from './types'

type Score = Record<Color, number>

// interface BoardState {
//     board: BoardSchema,
//     score: Score,
//     turn: Color,
//     availableMoves: Position[],
//     currentPiece: Position | undefined
// }

// type BoardActionType = 'pieceClicked' | 'squareClicked'

// interface BoardAction {
//     type: BoardActionType,
//     payload: {
//         sourcePosition: Position,
//         finalPosition: Position
//     }
// }

// const myReducer = (state: BoardState, action: BoardAction): BoardState => {
//     if(action.type === 'pieceClicked') {

//     }

//     return state;
// }

export function Board() {
    const [turn, setTurn] = useState<Color>('white')
    const [availableMoves, setAvailableMoves] = useState<Position[]>([])
    const [currentPiece, setCurrentPiece] = useState<Position | undefined>()
    const [board, setBoard] = useState(initialState)
    const [score, setScore] = useState<Score>({ black: 0, white: 0 })

    // const [state, dispatch] = useReducer(myReducer, {
    //     board: initialState,
    //     score: { 'black': 0, 'white': 0 },
    //     turn: 'white',
    //     availableMoves: [],
    //     currentPiece: undefined
    // })

    function pieceClicked(pieceClicked: Position, piece: Piece) {
        if (piece?.color !== turn) {
            console.log('invalid move')
            return
        }

        setCurrentPiece(pieceClicked)

        const movements = getAvailableMoves(pieceClicked, piece)
            .map((position) => canJumpOverEnemy(board, turn, pieceClicked, position))
            .filter((square) => square)

        const mustCaptureMovements = movements.filter((a) => a?.mustCapture)

        if (mustCaptureMovements.length) {
            setAvailableMoves(mustCaptureMovements.map((square) => square?.movement) as Position[])
        } else {
            setAvailableMoves(movements.map((square) => square?.movement) as Position[])
        }
    }

    function squareClicked({ row, col }: Position) {
        if (!currentPiece) throw new Error('Does not have selected piece')

        console.log(`moving piece ${currentPiece} to `, { row, col })

        const { board: newBoard, hasCaptured } = movePiece(board, currentPiece, { row, col })

        if (hasCaptured) {
            setScore({ ...score, [turn]: score[turn] + 1 })
        }

        if (turn === 'white' && row === 0) {
            newBoard[row][col]!.isKing = true
        }

        if (turn === 'black' && row === 7) {
            newBoard[row][col]!.isKing = true
        }

        setBoard(newBoard)
        setCurrentPiece(undefined)
        setTurn(turn === 'white' ? 'black' : 'white')
        setAvailableMoves([])
    }

    return (
        <div className="container">
            <div className="board">
                {board.map((rowData, rowIndex) => {
                    return <Row squareClicked={squareClicked} key={rowIndex.toString()} rowIndex={rowIndex} data={rowData} pieceClicked={pieceClicked} availableMoves={availableMoves} />
                })}
            </div>

            <div className="info board">
                <div className="current-turn">
                    <span>Current turn</span>
                    {turn === 'black' ? <BlackMan onClick={() => {}} /> : <WhiteMan onClick={() => {}} />}
                </div>
                <div className="score">
                    <div>
                        <BlackMan onClick={() => {}} />
                        <span> {score.black}</span>
                    </div>
                    <div>
                        <WhiteMan onClick={() => {}} />
                        <span> {score.white}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
