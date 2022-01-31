import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "./images/Logos/Logo.png";

function TranslationPage() {

  // API-url and API-key to heruko
  let apiKEY = "1b23229d-18ca-48ec-bdeb-9c7445384f23";
  let apiURL = "https://noroff-trivia-api.herokuapp.com";

  // Redux selector object to manage and access variables in all components.
  const { id, username, translations } = useSelector(
    (state) => state.sessionReducer
  );

  // State objects that are managed globally in this component only.
  const [translationInput, setTranslationInput] = useState("");
  const [signImage, setSignImage] = useState([]);
  const [listObject, setListObject] = useState([]);
  const [saveTranslations, setSaveTranslations] = useState([]);
  
  // useNavigate object imported by react-router-dom. Used to navigate to another page.
  let navigate = useNavigate();

  /**
   * Function will navigate the client to profile page. 
   * Path variable will decide the path.
   * @param {void} undefined 
   */
  function routeChange() {
    let path = `/profile`;
    navigate(path);
  }

  /**
   * useEffect object runs initImageList function once on render.
   * Array parameter is empty. As it does not need to depend or run on any state updates.
   * 
   * @param {functional} initImageList Function to run when page renders.
   * @param {list} undefined 
   */
  useEffect(initImageList, []);

  /**
   * Function will run on page render by useEffect object.
   * Function will import all images needed to map client input to sign-images.
   * 
   * @param {void} undefined 
   */
  function initImageList() {
    const images = importAll(require.context("./images", false, /\.(png|jpe?g|svg)$/));
    let selectedList = [];

    for (let i = 0; i < images.length; i++) {
      let tmpImg = images[i];
      let alpTemp = String.fromCharCode("a".charCodeAt(0) + i);
      let object = { alphabet: alpTemp, img_src: tmpImg };
      selectedList.push(object);
    }
    setListObject(selectedList);
  }

  /**
   * Checks if client input contains any special chars.
   * 
   * @param {void} undefined 
   */
  function containsSpecialChars() {
    //eslint-disable-next-line
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(translationInput);
  }

  /**
   * Checks if client input contains any numbers.
   * 
   * @param {void} undefined 
   */
  function containsNumber() {
    if (/\d/.test(translationInput)) {
      alert("Cant translate numbers...please enter words.");
      return /\d/.test(translationInput);
    } else {
      return /\d/.test(translationInput);
    }
  }

  /**
   * Checks if client input is greater or equal than 40.
   * 
   * @param {void} undefined 
   */
  function checkInputLimit() {
    let translationChars = translationInput.split("");
    if (translationChars.length >= 40) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Function is used to map image folder paths
   * 
   * @param {object} require 
   */
  function importAll(r) {
    return r.keys().map(r);
  }

  /**
   * Will check client input, and if its valid it will translate the words to sign-images and display them for the clint.
   * If the input is not valid it will alert the user what kind of error occurred.
   * @param {void} undefined 
   */
  function startTranslation() {
    if (!containsSpecialChars() && checkInputLimit() && !containsNumber()) {
      console.log("Translation input: " + translationInput);

      translations.push(translationInput);
      saveTranslations.push(translationInput);

      let lowerCase = translationInput.toLowerCase();
      let translationChars = lowerCase.split("");

      let translationPath = [];
      for (let i = 0; i < translationChars.length; i++) {
        let tempVar = listObject.find(
          (element) => element.alphabet === translationChars[i]
        );
        translationPath.push(tempVar.img_src);
      }

      setSignImage(translationPath);
      setSaveTranslations(saveTranslations);
      setTranslationToApi();

    } else if (containsSpecialChars()) {
      alert("Something went wrong translating....no special chars or white space allowed");
    }
  }

  /**
   * Function makes a API-REST call to PATCH the translations made by the client. 
   * Translations are globally managed by redux.
   * @param {void} undefined 
   */
  async function setTranslationToApi() {
    let apiResponse = fetch(`${apiURL}/translations/${id}`, {
      method: "PATCH",
      headers: { "X-API-Key": apiKEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        translations: translations,
      }),
    });

    if ((await apiResponse).ok) {
      let data = (await apiResponse).json();
      return data;
    } else {
      console.log("Could not register " + id + " with service url: " + apiURL);
    }
  }

  /**
   * Navigates the client to profile page when page button is clicked.
   * 
   * @param {void} undefined 
   */
  function navigateToProfilePage() {
    routeChange();
  }

  /**
   * TranslationPage component will return a header with design elements defined.
   * All events are ran from event listeners defined in this components return statement
   */
  return (
    <div>
      <header className="header">
        <div className="row">
          <div className="card">
            <button
              id="btn-false"
              type="button"
              className="btn"
              style={{ display: "inline-block", marginLeft: 1600 }}
              onClick={navigateToProfilePage}
            >
              {" "}
              Profile!{" "}
            </button>
            <h1 id="header1"> Lost In Translation!</h1>
            <h2 id="usrInputTitle">Enter a translation</h2>
            <div className="cardItemColumn">
              <img src={logo} style={{ width: 230, height: 230 }} alt=" "></img>
              <div className="form-control">
                <h2 style={{ display: "inline-block", marginRight: 10 }}>
                  User:{" "}
                </h2>
                <h2 style={{ display: "inline-block" }}>{username}</h2>
                <h3 style={{ marginTop: 10 }}>Enter translation </h3>
                <input
                  type="text"
                  placeholder=""
                  style={{ marginBottom: 20 }}
                  value={translationInput}
                  onChange={(e) => setTranslationInput(e.target.value)}
                />
                <button
                  id="btn-false"
                  type="button"
                  className="btn"
                  onClick={startTranslation}
                >
                  {" "}
                  Translate!{" "}
                </button>
              </div>
              <div>
                {signImage.map((image, index) => {
                  return (
                    <img
                      key={index}
                      src={image}
                      style={{ width: 90, height: 90 }}
                      alt="Sorry!"
                    ></img>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default TranslationPage;
