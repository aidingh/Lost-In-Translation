/**
 * Credit to: Dewalds who created this code. I reuse this code to manage my redux login states.
 * Apply the middleware to the provider.
 */

import { applyMiddleware } from "redux";
import { loginMiddleWare } from "./loginMiddleWare";
import { sessionMiddleWare } from "./sessionMiddleware";

export default applyMiddleware(loginMiddleWare, sessionMiddleWare);
