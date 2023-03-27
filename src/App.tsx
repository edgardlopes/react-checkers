import './App.css'
import { Board } from './components/Board'
import { getGameState } from './utils/localStorageState'
import { BoardWithScoreState } from './components/types'
import { createInitialBoard } from './board/boardConstants'

function App() {
    const gameState = getGameState<BoardWithScoreState>({
        board: createInitialBoard(),
        score: { black: 0, white: 0 },
        turn: 'white',
        gameOver: false,
    })

    return <Board initialGameState={gameState} />
}

export default App
