/**
 * Credit to: Dewalds who created this code. I reuse this code to manage my redux login states.
 * Returns objects ot manage session states. 
 */

export const ACTION_SESSION_SET = '[session] SET'
export const ACTION_SESSION_INIT = '[session] INIT'
export const ACTION_SESSION_LOGOUT = '[session] LOGOUT'

export const sessionSetAction = profile => ({
    type: ACTION_SESSION_SET,
    payload: profile
})

export const sessionLogoutAction = profile => ({
    type: ACTION_SESSION_LOGOUT,
    payload: profile

})

export const sessionInitAction = () => ({
    type: ACTION_SESSION_INIT

})