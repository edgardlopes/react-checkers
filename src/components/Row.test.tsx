import { fireEvent, render, screen, within } from '@testing-library/react'
import { Row } from './Row'
import { Piece } from './types'

describe('Row integration tests', () => {
    it('Should render a row of squares with pieces on dark squares', () => {
        const rowData: Piece[] = [null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }, null, { color: 'black', isKing: false }]

        render(<Row availableMoves={[]} data={rowData} rowIndex={0} pieceClicked={jest.fn()} squareClicked={jest.fn()} />)

        const square = screen.getByTestId('square-0-1')

        within(square).getByTestId('piece-black')
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

        render(<Row availableMoves={[]} data={rowData} rowIndex={0} pieceClicked={jest.fn()} squareClicked={onClick} />)

        const square = screen.getByTestId('square-0-1')

        fireEvent.click(square)

        expect(onClick).not.toBeCalled()
    })

    it('Should render the pieces properly', () => {
        const rowData: Piece[] = [null, { color: 'black', isKing: false }, null, { color: 'black', isKing: true }, null, { color: 'white', isKing: false }, null, { color: 'white', isKing: true }]

        const onClick = jest.fn()

        render(<Row availableMoves={[{ row: 0, col: 1 }]} data={rowData} rowIndex={0} pieceClicked={jest.fn()} squareClicked={onClick} />)

        within(screen.getByTestId('square-0-1')).getByTestId('piece-black')
        within(screen.getByTestId('square-0-3')).getByTestId('piece-black-king')
        within(screen.getByTestId('square-0-5')).getByTestId('piece-white')
        within(screen.getByTestId('square-0-7')).getByTestId('piece-white-king')
    })
})
