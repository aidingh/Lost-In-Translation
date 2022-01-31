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