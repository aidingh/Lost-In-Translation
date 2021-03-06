/**
 * Credit to: Dewalds who created this code. I reuse this code to manage my redux login states.
 * Returns objects ot manage action states. 
 */

export const ACTION_LOGIN_ATTEMPTING = '[login] ATTEMPTING'
export const ACTION_LOGIN_SUCCESS = '[login] SUCCESS'
export const ACTION_LOGIN_ERROR = '[login] ERROR'

export const loginAttemptAction = credentials => ({
    type: ACTION_LOGIN_ATTEMPTING,
    payload: credentials
})

export const loginSuccessAction = profile => ({
    type: ACTION_LOGIN_SUCCESS,
    payload: profile
})

export const loginErrorAction = error => ({
    type: ACTION_LOGIN_ERROR,
    payload: error
})