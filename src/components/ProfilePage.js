import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 
import { sessionLogoutAction } from "../store/actions/sessionActions";
function ProfilePage() {
    
  let apiKEY = "1b23229d-18ca-48ec-bdeb-9c7445384f23";
  let apiURL = "https://noroff-trivia-api.herokuapp.com";

  const {username, id} = useSelector(state => state.sessionReducer);
  const {loggedIn} = useSelector(state => state.sessionReducer);
  const [translationList, setTranslationList] = useState([]);

  let navigate = useNavigate();

  function routeChange() {
    let path = `/`;
    navigate(path);
  }
  const dispatch = useDispatch();

  //useEffect(initImageList, []); 

    function logOut(){

        const initialState = {
            username: "",
            translations: [],
            id: "" ,
            loggedIn: false
        }

        console.log(username);
        console.log(id);
        localStorage.clear();
        dispatch(sessionLogoutAction(username))
        routeChange()

      }

      async function getTranslations(){
        let userResponse = fetch(`${apiURL}/translations?username=${username}`);
        if ((await userResponse).ok) {
            let data = await (await userResponse).json();
            console.log(data[0].translations)
            setTranslationList(data[0].translations)
        }
    }

  return (
    <div>
      <header className="header">
        <div className="row">
          <div className="card">
            <h1 id="header1"> Lost In Translation!</h1>
            <h2 id="usrInputTitle">Profile</h2>

            <div className="Row">
            <label >User: </label>
            <label>{username}</label>
           

            </div>

            <div className="cardItemColumn">
              <div className="form-control">
                <label>Enter translation</label>
                <button id="btn-false" type="button" onClick={getTranslations} className="btn">{" "} Reset translations!{" "} </button>
                <button id="btn-false" type="button" onClick={logOut} className="btn">{" "} Log out{" "} </button>
              </div>
            </div>

            
            <div >

        {translationList.map((words, index) => {
            return <label style={{marginInlineStart: 10}}key={index}>{words}</label>
        })}

            </div>





          </div>
        </div>
      </header>
    </div>
  );
}



export default ProfilePage;
