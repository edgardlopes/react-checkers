import React from 'react'

import './Square.css'

type Props = React.PropsWithChildren<{
    row: number
    column: number
    onClick: () => void
    selected: boolean
}>

export const Square: React.FC<Props> = ({ column, onClick, row, selected, children }) => {
    const isEvenRow = row % 2 === 0
    const isEvenColumn = column % 2 === 0
    const isLight = (isEvenRow && isEvenColumn) || (!isEvenColumn && !isEvenRow)

    const isLightString = isLight ? 'light' : 'dark'

    return (
        <div onClick={onClick} data-testid={`square-${row}-${column}`} className={`square ${isLightString}`}>
            {selected && <div data-testid="highlighted" className="blurred"></div>}
            {children}
        </div>
    )
}
