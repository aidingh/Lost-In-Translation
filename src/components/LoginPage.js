import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { loginAttemptAction } from "../store/actions/loginActions";
import logo from "./images/Logos/Logo.png";

function LoginPage() {

  // Navigate object imported by react-router-dom to navigate page on condition.
  let navigate = useNavigate();

  // Dispatch object imported by react-redux to dispatch functions managed by redux state management.
  const dispatch = useDispatch();

  // A global state defined with a useSelector. Accessed by Redux session management.
  const { loggedIn } = useSelector((state) => state.sessionReducer);

  // A global state within this component. Sets the username input by the client.
  const [username, setUsername] = useState("");

  /**
   * Function will navigate the client to translation page. 
   * Path variable will decide the path.
   * @param {void} undefined 
   */
  function routeChange() {
    let path = `/translation`;
    navigate(path);
  }

  /**
   * Starts the login action when user has entered a username.
   * Function will start a dispatch to start the Redux login attempt.
   * After dispatch a route navigation will run to navigate to the translation page.
   * @param {string} event contains username defined by the client.
   */
  const startLoginAction = (event) => {
    event.preventDefault();
    console.log(username);
    if (username == "") {
      alert("Please enter a username to the API to continue.");
      return;
    } else {
      dispatch(loginAttemptAction(username));
      routeChange();
    }
  };

  /**
   * LoginPage component will return a header will design elements defined.
   * loggedIn variable is used to redirect user to translation page if he is logged in.
   * All events are ran from event listeners defined in this components return statement
   */
  return (
    <>
      {loggedIn && <Navigate to="/translation" />}
      {!loggedIn && (
        <header className="header">
          <div className="row">
            <div className="card">
              <h1 id="header1"> Lost In Translation!</h1>
              <h2 id="usrInputTitle">Lets get started</h2>
              <div className="cardItemColumn">
                <img
                  src={logo}
                  style={{ width: 320, height: 320 }}
                  alt=" "
                ></img>
                <form className="form-control" onSubmit={startLoginAction}>
                  <label>Enter username</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button
                    id="btn-login"
                    style={{ width: 200 }}
                    type="form-control"
                    className="btn"
                  >
                    {" "}
                    Login!{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}

export default LoginPage;
