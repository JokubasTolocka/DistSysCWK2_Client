import { useState } from "react";
import Form from "./components/Form.js";
import Results from "./components/Results.js";
import { sendListOfPeople } from "./utils";

function App() {
  const [isGeneratorLoading, setIsGeneratorLoading] = useState(false);
  const [results, setResults] = useState({});

  // function for submitting list
  const submitList = (listOfPeople, isFair) => {
    // set loading to be true
    setIsGeneratorLoading(true);
    // pass the list of people and isFair to the send function
    sendListOfPeople(listOfPeople, isFair).then((result) => {
      // parse the json response string
      const parsedResult = JSON.parse(result);
      // get the object keys into array
      const names = Object.keys(parsedResult);

      // format the results into persons name and countries assigned
      const formattedResults = names.map((name) => ({
        name,
        countries: parsedResult[name],
      }));

      // set the results
      setResults(formattedResults);
    });
  };

  return (
    <div className="flex flex-col w-full items-center h-full justify-center">
      <div className="flex flex-col w-full p-4 items-center">
        <h1 className="text-2xl mb-6 text-center w-full">
          World Cup SweepStake!
        </h1>
        {/* initially display form */}
        {!isGeneratorLoading && !results.length && (
          <Form onSubmit={submitList} />
        )}
        {/* once request is made, display loader */}
        {isGeneratorLoading && !results.length && (
          <span className="text-center w-full">Generating...</span>
        )}
        {/* once request is finished and we have data, display the results  */}
        {!!results.length && <Results results={results} />}
      </div>
    </div>
  );
}

export default App;
