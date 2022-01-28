import React from 'react';
import { useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import logo from './images/Logos/Logo.png';

//import logo from './src/assets/LostInTranslation_Resources/Logo.png';

//can pass in props
function LoginPage(){
    let navigate = useNavigate(); 
    const [username, setUsername] = useState('');

    async function setUserNameToServer(){
        console.log(username);

        let apiURL = "https://noroff-trivia-api.herokuapp.com";
        let apiKey = "1b23229d-18ca-48ec-bdeb-9c7445384f23";

      let response = fetch(`${apiURL}/translations`, {
        method: "POST",
        headers: {"X-API-Key": apiKey, "Content-Type": "application/json",},
        body: JSON.stringify({
          username: username,
          translations: []
        }),
      });

      if ((await response).status === 201) {
        let data = (await response).json();
        console.log(data);
        routeChange();
        //return data;
      } 
      else {
        console.log("Could not register " + username +  " with service url: " + apiURL);
      }
      }

      
      function routeChange(){ 
        let path = `/translation`; 
        navigate(path);
      }


  return <div>
<header className='header'>
    <div className="row">
      <div className="card">
      <h1 id="header1"> Lost In Translation!</h1>
      <h2 id="usrInputTitle">Lets get started</h2>
      <img src= {logo} alt=" "></img>
        <div className="cardItemColumn">

         <div className='form-control'>
        <label>Enter username</label>
        <input type='text' placeholder='John Doe' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <button id="btn-false" type="button" className="btn" onClick={setUserNameToServer}> Login! </button>
        </div>

        </div>
      
      
      </div>

      </div>
</header>

  </div>;

  
};


/*const stylingObject = {
    color: 'red',
    backgroundColor: 'black',
}*/

export default LoginPage;
