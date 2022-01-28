import React from 'react';
import { useState, useEffect } from 'react'; 
//import LazyLoad from "react-lazyload";
import logo from './images/Logos/Logo.png';
import signsx from './images/a.png';

//can pass in props
function TranslationPage(){
    const [translationInput, setTranslationInput] = useState('');
    const [signImage, setSignImage] = useState('');

    useEffect(() => {
        console.log("walahi " + signImage);
    }, [signImage]);

    const signList = [{sign:"a", imgSource: 'a.png'}];
    /*const eventHandler = () => {
        console.log("event");
    }*/

    //lost-in-translation/src/components/LostInTranslation_Resources/individial_signs/a.png

    function importAll(r) {
      return r.keys().map(r);
    }
    
    


    function startTranslation (){
        let importString =  './images/';
        let endOfString = '.png';
        console.log("hello" + translationInput);
        let translationChars = translationInput.split(''); 
        console.log(translationChars);
        console.log(signList);

        let find = importString + translationChars[0] + endOfString;
        console.log(find);
        console.log(signsx);
        setSignImage(find);

        const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
        console.log(images);
        
        
        //console.log("suagah "+ signImage);

      }


  return <div>
<header className='header'>
<div className="row">
      <div className="card">
      <h1 id="header1"> Lost In Translation!</h1>
      <h2 id="usrInputTitle">Enter a translation</h2>
      <img src= {logo} style={{width:170, height: 170}} alt=" "></img>
        <div className="cardItemColumn">

         <div className='form-control'>
        <label>Enter translation</label>
        <input type='text' placeholder='John Doe' value={translationInput} onChange={(e) => setTranslationInput(e.target.value)}/>
        <button id="btn-false" type="button" className="btn" onClick={startTranslation}> Translate! </button>
        </div>
        <div className="card">
        <div className="cardItemColumn">
        <label>Enter translation</label>

        <img src= {signImage} style={{width:170, height: 170}} alt="Sorry!"></img>
        
        </div>







      </div>
        </div>
      </div>


      </div>
</header>

  </div>;

  
};




export default TranslationPage;
