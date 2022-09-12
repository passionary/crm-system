import redux from 'redux'
import { setCookie, deleteCookie } from '../utils/cookie'
import { dateOptions } from '../utils/dateOptions'

const initState = {
    token: null,
    isLoading: false,
    message: '',
    user:{
        language: 'en'
    },
    categories: [],
    records: [],
    date: new Intl.DateTimeFormat('en-EN',dateOptions).format(new Date())    
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
        case 'loading':
            return {
                ...state,isLoading: true
            }
        case 'break-loading':
            return {
                ...state, isLoading: false
            }
        case 'set-token':
            return {
                ...state, token: action.payload
            }
        case 'set-toast':
            return {
                ...state, message: action.payload
            }        
        case 'init-bill':
            return {
                ...state, bill: action.payload
            }
        case 'init-user':
            return {
                ...state, user: action.payload
            }
        case 'set-locale':
            return {
                ...state, language: action.payload
            }
        case 'set-info':
            return {
                ...state, [action.payload.key]: action.payload.value
            }
        default:
            return state;
    }
}