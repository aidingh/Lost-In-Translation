import { applyMiddleware } from "redux";
import { loginMiddleWare } from "./loginMiddleWare";
import { sessionMiddleWare } from "./sessionMiddleware";

export default applyMiddleware(loginMiddleWare, sessionMiddleWare);
