export const initialState = {
    user: null
}

function reducer(state = initialState , action ) {
    switch(action.type) {
        case 'SET_USER': 
            return {
                ...state ,
                user: action.user
            }
        case 'SIGN_OUT':
            return {
                ...state , 
                user: null
            }
        default:
            return state
    }
}

export default reducer