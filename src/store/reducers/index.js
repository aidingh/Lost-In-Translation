import { loginReducer } from "./loginReducer"
import {combineReducers} from 'redux'
import { sessionReducer } from "./sessionReducer"


const appReducer = combineReducers({
    loginReducer,
    sessionReducer
})

export default appReducer