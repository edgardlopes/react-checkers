import React from 'react'
import { render, screen, fireEvent, within, getByTestId, waitFor } from '@testing-library/react'
import { Board } from './Board'
import { createEmptyBoard, createInitialBoard } from '../board/boardConstants'
import { BoardWithScoreState } from './types'

describe('Board component', () => {
    it('should render without errors', () => {
        const initialState = {
            board: createInitialBoard(),
            score: { black: 0, white: 0 },
            turn: 'white',
            gameOver: false,
        }

        render(<Board initialGameState={initialState as BoardWithScoreState} />)
        screen.getByTestId('current-turn-white')
    })

    it('should allow a piece to be moved when a piece has a mouse over event', async () => {
        const initialState = {
            board: createInitialBoard(),
            score: { black: 0, white: 0 },
            turn: 'white',
            gameOver: false,
        }

        render(<Board initialGameState={initialState as BoardWithScoreState} />)

        const square = screen.getByTestId('square-5-0')
        const piece = within(square).getByTestId('piece-white')

        fireEvent.mouseOver(piece)

        await screen.findByTestId('highlighted')
    })

    it('should display available capture moves when a piece that can capture is clicked', async () => {
        const initialState = {
            board: createEmptyBoard(),
            score: { black: 0, white: 0 },
            turn: 'white',
            gameOver: false,
        }

        initialState.board[7][0] = { color: 'white', isKing: false }
        initialState.board[6][1] = { color: 'black', isKing: false }

        render(<Board initialGameState={initialState as BoardWithScoreState} />)
        const piece = within(screen.getByTestId('square-7-0')).getByTestId('piece-white')

        fireEvent.mouseOver(piece)

        const targetSquare = screen.getByTestId('square-5-2')
        await within(targetSquare).findByTestId('highlighted')
    })
})
