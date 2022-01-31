/**
 * Credit to: Dewalds who created this code. I reuse this code to manage my redux login states.
 * We add reducer objects to the combineReducers object to provide it to the app.
 */

import { loginReducer } from "./loginReducer"
import {combineReducers} from 'redux'
import { sessionReducer } from "./sessionReducer"


const appReducer = combineReducers({
    loginReducer,
    sessionReducer
})

export default appReducer