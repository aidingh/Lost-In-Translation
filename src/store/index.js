/**
 * Credit to: Dewalds who created this code. I reuse this code to manage my redux login states.
 * creates a store object to be passed to the app-provider. 
 */

import { createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import appReducer from "./reducers"
import middleware from "./middleware"

export default createStore(
appReducer,
composeWithDevTools(middleware)
)