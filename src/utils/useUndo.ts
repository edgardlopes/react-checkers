import { useReducer } from 'react'
import { setGameState } from './localStorageState'

const useUndoReducer = <S>(reducer: (state: S, action: any) => S, initialState: S) => {
    const undoState: any = {
        past: [] as S[],
        present: initialState,
    }

    const undoReducer = (state = undoState, action: any) => {
        const newPresent = reducer(state.present, action)
        console.log(action.type)
        if (action.type === 'UNDO') {
            // undo the last two moves
            if (!state.past.length) {
                return state
            }

            const [aiMove, myMove, ...past] = state.past
            return {
                past,
                present: myMove,
            }
        }

        setGameState(newPresent)

        return {
            past: [state.present, ...state.past],
            present: newPresent,
        }
    }
    const [state, dispatch] = useReducer(undoReducer, undoState)

    return {
        state: state.present,
        dispatch,
        canUndo: !!state.past.length,
    }
}

export default useUndoReducer
