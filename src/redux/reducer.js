const initState = {
    user: {}
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}