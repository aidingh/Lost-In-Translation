import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { loginAttemptAction } from "../store/actions/loginActions";
import logo from "./images/Logos/Logo.png";

//import logo from './src/assets/LostInTranslation_Resources/Logo.png';

//can pass in props
function LoginPage() {
  let navigate = useNavigate();
  let apiKEY = "1b23229d-18ca-48ec-bdeb-9c7445384f23";
  let apiURL = "https://noroff-trivia-api.herokuapp.com";

  const {loggedIn} = useSelector(state => state.sessionReducer);

  const [username, setUsername] = useState("");

  const dispatch = useDispatch();


  function routeChange() {
    let path = `/translation`;
    navigate(path);
  }

  async function setUserToApi() {
    let response = fetch(`${apiURL}/translations`, {
      method: "POST",
      headers: { "X-API-Key": apiKEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        translations: [],
      }),
    });

    if ((await response).ok) {
      let data = (await response).json();
      return data;
    } else {
      console.log(
        "Could not register " + username + " with service url: " + apiURL
      );
    }
  }

  const setUserNameToServer = async (event) => {
    event.preventDefault();
    let userResponse = fetch(`${apiURL}/translations?username=${username}`);
    if ((await userResponse).status === 200) {
      let data = await (await userResponse).json();
      console.log("User name: " + username);
      console.log(JSON.stringify(data));
      if (data.length == 0) {
        let dataResponse = await setUserToApi();
        console.log("a" + JSON.stringify(dataResponse));
        console.log("b" + JSON.stringify(userResponse));
        //localStorage.setItem("greeting", "Hello World!");
        routeChange();
        return;
      }
      else{
        //manage sessions here
        console.log('b' + JSON.stringify(userResponse));
        localStorage.setItem("greeting", "Hello World!");
        routeChange();
        return;
      }
    }
    else{
      console.log('error bro')
    }
  }





  const startLoginAction = (event) => {
    console.log(username);
    event.preventDefault();
    dispatch(loginAttemptAction(username));
    routeChange();

  }



  return (
        <>
        {loggedIn && <Navigate to="/translation" />}
        {!loggedIn && 
              <header className="header">
              <div className="row">
                <div className="card">
                  <h1 id="header1"> Lost In Translation!</h1>
                  <h2 id="usrInputTitle">Lets get started</h2>
                  <img src={logo} alt=" "></img>
                  <div className="cardItemColumn">
                    <form className="form-control" onSubmit={startLoginAction}>
                      <label>Enter username</label>
      
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
      
                      <button id="btn-false" type="form-control" className="btn">
                        {" "}
                        Login!{" "}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </header>
        }
        </>

    
  );
}

/*const stylingObject = {
    color: 'red',
    backgroundColor: 'black',
}*/

export default LoginPage;
