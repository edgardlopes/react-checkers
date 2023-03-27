export function setGameState<S>(state: S) {
    window.localStorage.setItem('gameState', JSON.stringify(state))
}

export function getGameState<S>(fallback: S): S {
    const stateJson = window.localStorage.getItem('gameState')

    if (stateJson) {
        return JSON.parse(stateJson)
    }

    return fallback
}
