import { fireEvent, render, screen, within } from '@testing-library/react'
import { Row } from './Row'
import { Piece } from './types'

describe('Row integration tests', () => {
    it('Should render a row of squares with pieces on dark squares', () => {
        const rowData: Piece[] = [null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }]

        render(<Row availableMoves={[]} data={rowData} rowIndex={0} pieceClicked={jest.fn()} squareClicked={jest.fn()} />)

        const squares = screen.getAllByTestId('square-dark')

        expect(squares).toHaveLength(4)

        within(squares[0]).getByTestId('piece-black')
    })

    it('Should highlight the available moves', () => {
        const rowData: Piece[] = [null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }]

        render(<Row availableMoves={[{ row: 0, col: 1 }]} data={rowData} rowIndex={0} pieceClicked={jest.fn()} squareClicked={jest.fn()} />)

        screen.getByTestId('highlighted')
    })

    it('Should call click callback if user clicks on available square', () => {
        const rowData: Piece[] = [null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }]

        const onClick = jest.fn()

        render(<Row availableMoves={[{ row: 0, col: 1 }]} data={rowData} rowIndex={0} pieceClicked={jest.fn()} squareClicked={onClick} />)

        const nextSquare = screen.getByTestId('highlighted')

        fireEvent.click(nextSquare)

        expect(onClick).toBeCalled()
        expect(onClick).toBeCalledWith({ row: 0, col: 1 })
    })

    it('Should not call click callback if user clicks on a unavailable square', () => {
        const rowData: Piece[] = [null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }]

        const onClick = jest.fn()

        render(<Row availableMoves={[{ row: 0, col: 1 }]} data={rowData} rowIndex={0} pieceClicked={jest.fn()} squareClicked={onClick} />)

        const squares = screen.getAllByTestId('square-dark')

        fireEvent.click(squares[1])

        expect(onClick).not.toBeCalled()
    })

    it('Should render the pieces properly', () => {
        const rowData: Piece[] = [null, { color: 'black', isKing: false }, null, { color: 'black', isKing: true }, null, { color: 'white', isKing: false }, null, { color: 'white', isKing: true }]

        const onClick = jest.fn()

        render(<Row availableMoves={[{ row: 0, col: 1 }]} data={rowData} rowIndex={0} pieceClicked={jest.fn()} squareClicked={onClick} />)

        const squares = screen.getAllByTestId('square-dark')

        within(squares[0]).getByTestId('piece-black')
        within(squares[1]).getByTestId('piece-black-king')
        within(squares[2]).getByTestId('piece-white')
        within(squares[3]).getByTestId('piece-white-king')
    })
})
