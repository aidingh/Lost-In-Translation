
export const LoginAPI = {
  async login(credentials) {
    let apiURL = "https://noroff-trivia-api.herokuapp.com";
    let apiKEY = "1b23229d-18ca-48ec-bdeb-9c7445384f23";

      let userResponse = fetch(`${apiURL}/translations?username=${credentials}`);
      if ((await userResponse).ok) {
        let data = await (await userResponse).json();
      
        if (data.length == 0) {
          let response = fetch(`${apiURL}/translations`, {
            method: "POST",
            headers: { "X-API-Key": apiKEY, "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials,
              translations: [],
            }),
          });
          let newResponse = await (await response).json();
          return newResponse
        }
        else{
          let newData = { username: data[0].username, translations: data[0].translations, id: data[0].id }
          return newData
        }
      }
      else{
        const { error = "An unknown error occurred" } = await userResponse.json();
        throw new Error(error);
      }
  },
};







/*export const LoginAPI = {
  login(credentials) {
    let apiURL = "https://noroff-trivia-api.herokuapp.com";
    let apiKey = "1b23229d-18ca-48ec-bdeb-9c7445384f23";

    return fetch(`${apiURL}/trivia?username=${credentials}`).then(
      async (response) => {
        if (response.status !== 200) {
          const { error = "An unknown error occurred" } = await response.json();
          throw new Error(error);
        }
        console.log(response)
        fetch(`${apiURL}/translations`, {
          method: "POST",
          headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials,
            translations: [],
          }),
        }).then(async (setUserResponse) => {
          if (setUserResponse.status !== 201) {
            const { error = "An unknown error occurred" } = await setUserResponse.json();
              throw new Error(error);
          }
          let temp = setUserResponse.json();
          console.log(temp)
        });
      }
    );
  },
};*/

/*export const LoginAPI = {
   login(credentials) {
    let apiURL = "https://noroff-trivia-api.herokuapp.com";
    let apiKey = "1b23229d-18ca-48ec-bdeb-9c7445384f23";

    return fetch(`${apiURL}/translations`, {
      method: "POST",
      headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials,
        translations: [],
      })
    })
    .then(async (response) => {
      if(response.status !== 201) {
        const {error = 'An unknown error occurred'} = await response.json()
        throw new Error(error)
      }
      console.log("sexy");
      return response.json() 
    })
  }
}*/
