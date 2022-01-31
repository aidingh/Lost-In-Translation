/**
 * Credit to: Dewalds who created this code. I reuse this code to manage my redux login states.
 * sessionReducer to set initial user state. ACTION_SESSION_LOGOUT i added myself to set loggedIn to false when the user logs out.
 */

import { ACTION_SESSION_SET , ACTION_SESSION_LOGOUT} from "../actions/sessionActions"

const initialState = {
    username: "",
    translations: [],
    id: "" ,
    loggedIn: false
}

export const sessionReducer = (state = initialState, action) => {
    switch(action.type){

        case ACTION_SESSION_SET:
            return{
                ...action.payload,
                loggedIn:true 
            }
        case ACTION_SESSION_LOGOUT:
            return{
                ...action.payload,
                loggedIn:false 
            }
            default:
            return state
    }
}