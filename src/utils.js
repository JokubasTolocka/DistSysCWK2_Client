// service 1 and 2 urls
const serviceOne = "http://127.0.0.1:5000";
const serviceTwo = "http://127.0.0.1:7789";

// call service 2 to get the list of countries
const getCountryList = () =>
  fetch(`${serviceTwo}/countries`).then(
    // get the json
    async (countries) => await countries.json()
  );

export const sendListOfPeople = async (peopleList, isFair = true) => {
  let countries;

  // get countries, parse the json string into an array of object
  await getCountryList().then((result) => {
    countries = JSON.parse(result);
  });

  // create data object with list of countries, people and isFair
  const data = {
    countries,
    people: peopleList,
    isFair,
  };

  // equivalent of json.dumps in python, make data into json string
  const formattedData = JSON.stringify(data);

  // sending request to first web service to generate sweepstake
  return fetch(serviceOne, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: formattedData,
  }).then((result) => result.json());
};

// send GET request to service 2 with countrCode as query parameter and get the json result
export const getListOfPlayers = (countryCode) =>
  fetch(`${serviceTwo}/squads/${countryCode}`).then(
    // get the json
    async (squads) => await squads.json()
  );
