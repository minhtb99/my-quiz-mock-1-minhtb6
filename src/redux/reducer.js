const initState = {
    numberQuestion: 0
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_NUMBER_QUESTIONS':
            return {
                ...state,
                numberQuestion: action.payload
            }
        default:
            return state
    }
}