import redux from 'redux'
import { setCookie, deleteCookie } from './cookie'

const initState = {
    token: null,
    isLoading: false,
    message: '',
    loader: false,
    serverData: {categories:[]}
}

export const rootReducer:redux.Reducer<any,any> = (state:any = initState, action:any) => {
    switch(action.type) {
        case 'auth':
            setCookie('token',action.payload)
            return {
                ...state, token: action.payload
            }
        case 'logout': 
            deleteCookie('token')
            return {
                ...state
            }
        case 'break-loading':
            return {
                ...state, isLoading: false
            }
        case 'loading':
            return {
                ...state,isLoading: true
            }
        case 'set-token':
            return {
                ...state, token: action.payload
            }
        case 'set-toast':
            return {
                ...state, message: action.payload
            }
        case 'run-loader':
            return {
                ...state, loader: true
            }
        case 'stop-loader':
            return {
                ...state, loader: false
            }
        case 'init-bill':
            return {
                ...state, bill: action.payload
            }
        case 'init-user':
            return {
                ...state, user: action.payload
            }
        default:
            return state;
    }
}