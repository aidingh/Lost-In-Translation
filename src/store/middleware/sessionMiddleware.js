/**
 * Credit to: Dewalds who created this code. I reuse this code to manage my redux login states.
 * sessionMiddleWare Object will dispatch functions depending on session actions and store them in local storage.
 */
import { ACTION_SESSION_INIT, ACTION_SESSION_SET, sessionSetAction } from "../actions/sessionActions"

export const sessionMiddleWare = ({dispatch}) => next => action =>{

next(action)

if(action.type === ACTION_SESSION_INIT){
    const storedSession = localStorage.getItem('rtxtf-ss')
    if(!storedSession){
        return
    }
    const session = JSON.parse(storedSession)
    dispatch(sessionSetAction(session))
}

if(action.type === ACTION_SESSION_SET){
    localStorage.setItem('rtxtf-ss', JSON.stringify(action.payload))
}

}