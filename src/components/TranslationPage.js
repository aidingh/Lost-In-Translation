
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'; 
import {useSelector } from "react-redux";
import logo from './images/Logos/Logo.png';

//can pass in props
function TranslationPage(){
    const [translationInput, setTranslationInput] = useState('');
    const [signImage, setSignImage] = useState([]);
    const [listObject, setListObject] = useState([]);
    const [saveTranslations, setSaveTranslations] = useState([]);

    let navigate = useNavigate();

    function routeChange() {
      let path = `/profile`;
      navigate(path);
    }

    let apiKEY = "1b23229d-18ca-48ec-bdeb-9c7445384f23";
    let apiURL = "https://noroff-trivia-api.herokuapp.com";

    const {id} = useSelector(state => state.sessionReducer);


    useEffect(initImageList, []); 

    function initImageList(){

      const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
      let selectedList = []

      for(let i = 0; i < images.length; i++) {
        let tmpImg = images[i];
        let alpTemp = String.fromCharCode("a".charCodeAt(0) + i)
        let object = {alphabet: alpTemp, img_src: tmpImg};
          selectedList.push(object);
      }
      setListObject(selectedList);
    }

    function containsSpecialChars() {
      //eslint-disable-next-line
      const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      console.log(specialChars.test(translationInput));
      return specialChars.test(translationInput);
    }

    function checkInputLimit(){
      let translationChars = translationInput.split(''); 
      if(translationChars.length >= 40){
          return false
      }
      else{
        return true
      }
    }

    function importAll(r) {
      return r.keys().map(r);
    }

    function startTranslation (){

        if(!containsSpecialChars() && checkInputLimit()){
          console.log("Translation input: " + translationInput);
          saveTranslations.push(translationInput)
          let translationChars = translationInput.split(''); 
  
          let translations = [];
          for(let i = 0; i < translationChars.length; i++) {
            let tempVar  = listObject.find(o => o.alphabet === translationChars[i]);
            translations.push(tempVar.img_src);
          }
  
          setSignImage(translations)
          setSaveTranslations(saveTranslations)
          setTranslationToApi()
          console.log("List of translations: " +  translations)


        }
        else if(containsSpecialChars()){
            alert("Something went wrong translating....")
            console.log('Something went wrong translating....');
        }
      }

      async function setTranslationToApi(){
        console.log(saveTranslations)
        let apiResponse = fetch(`${apiURL}/translations/${id}`, {
          method: "PATCH",
          headers: { "X-API-Key": apiKEY, "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            translations: saveTranslations
          }),
        });
    
        if ((await apiResponse).ok) {
          let data = (await apiResponse).json();
          return data;
        } else {
          console.log(
            "Could not register " + id + " with service url: " + apiURL
          );
        }
    }

    function navigateToProfilePage(){
      routeChange()
    }


  return <div>
<header className='header'>
<div className="row">
      <div className="card">
      <h1 id="header1"> Lost In Translation!</h1>
      <h2 id="usrInputTitle">Enter a translation</h2>
      
        <div className="cardItemColumn">
        <button id="btn-false" type="button" className="btn" onClick={navigateToProfilePage}> Profile! </button>
         <div className='form-control'>
        <label>Enter translation</label>
        <input type='text' placeholder='' value={translationInput} onChange={(e) => setTranslationInput(e.target.value)}/>
        <button id="btn-false" type="button" className="btn" onClick={startTranslation}> Translate! </button>
        
        </div>

        <img src= {logo} style={{width:170, height: 170}} alt=" "></img>

       

        <div>
          <ul>
        {signImage.map((value, index) => {
          return <li key={index}>{value}</li>
        })}
      </ul>
        </div>

        <div>

        {signImage.map((image, index) => {
          return <img key={index} src={image} style={{width:90, height: 90}} alt="Sorry!"></img>
        })}

        </div>


        </div>
      </div>


      </div>
</header>

  </div>;

  
};




export default TranslationPage;
