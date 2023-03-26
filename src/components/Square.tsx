import React from 'react'

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

    return (
        <div onClick={onClick} className={`square ${isLight ? 'light' : 'dark'} ${selected ? 'selected' : ''}`}>
            {children}
        </div>
    )
}
