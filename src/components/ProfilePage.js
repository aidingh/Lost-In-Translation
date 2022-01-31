import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 
import { sessionLogoutAction } from "../store/actions/sessionActions";
import logo from "./images/Logos/Logo.png";
function ProfilePage() {
    
  let apiKEY = "1b23229d-18ca-48ec-bdeb-9c7445384f23";
  let apiURL = "https://noroff-trivia-api.herokuapp.com";

  const {username, id} = useSelector(state => state.sessionReducer);
  const {translations} = useSelector(state => state.sessionReducer);
  const [translationList, setTranslationList] = useState([]);

  let navigate = useNavigate();

  function routeChange() {
    let path = `/`;
    navigate(path);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    async function getTranslations(){
        let userResponse = fetch(`${apiURL}/translations?username=${username}`);
        if ((await userResponse).ok) {
            let data = await (await userResponse).json();
            if(data[0].translations.length >= 10){
                data[0].translations.length = 10;
            }
            setTranslationList(data[0].translations)
        }
    }
    getTranslations()
  }, [])

    function logOut(){
        console.log(username);
        console.log(id);
        localStorage.clear();
        dispatch(sessionLogoutAction(username))
        routeChange()
      }


      async function deleteTranslations(){

        let apiResponse = fetch(`${apiURL}/translations/${id}`, {
            method: "PATCH",
            headers: { "X-API-Key": apiKEY, "Content-Type": "application/json" },
            body: JSON.stringify({
              id: id,
              translations: []
            }),
          });
      
          if ((await apiResponse).ok) {
            translations.length = []
            setTranslationList([])
          } else {
            console.log(
              "Could not reset data with " + id + " and service url: " + apiURL
            );
          }
    }


  return (
    <div>
      <header className="header">
        <div className="row">
          <div className="card">


          <div >
          
          <button id="btn-false" type="button" style={{display:"inline-block", marginLeft:1600}} onClick={logOut} className="btn">{" "} Log out{" "} </button>

          </div>
            <h1 style={{marginBottom:30}} id="profileTitle">Profile</h1>
            <img src={logo} style={{width:200, height: 200, marginBottom:20}} alt=" "></img>
            <div className="Row">
            <h3 style={{display:"inline-block", marginRight: 10}}>User: </h3>
            <h3 style={{display:"inline-block"}} >{username}</h3>
           

            </div>

            <div className="cardItemColumn">
              <div className="form-control">
                <button id="btn-false" type="button" onClick={deleteTranslations} className="btn">{" "} Reset translations!{" "} </button>
                <h3 style={{marginTop:20}} >Your latest translations</h3>
              </div>
            </div>

            
            <div style={{marginBottom:20}} >

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
