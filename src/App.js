import { useState } from "react";
import Form from "./components/Form.tsx";
import Results from "./components/Results.tsx";
import { sendListOfPeople } from "./utils";

function App() {
  const [isGeneratorLoading, setIsGeneratorLoading] = useState(false);
  const [results, setResults] = useState({});

  const submitList = (listOfPeople, isFair) => {
    setIsGeneratorLoading(true);
    sendListOfPeople(listOfPeople, isFair).then((result) => {
      const parsedResult = JSON.parse(result);
      const names = Object.keys(parsedResult);

      const formattedResults = names.map((name) => ({
        name,
        countries: parsedResult[name],
      }));

      setResults(formattedResults);
    });
  };

  return (
    <div className="flex flex-col w-full items-center h-full justify-center">
      <div className="flex flex-col w-full p-4 items-center">
        <h1 className="text-2xl mb-6 text-center w-full">
          World Cup SweepStake!
        </h1>
        {!isGeneratorLoading && !results.length && (
          <Form onSubmit={submitList} />
        )}
        {isGeneratorLoading && !results.length && (
          <span className="text-center w-full">Generating...</span>
        )}
        {!!results.length && <Results results={results} />}
      </div>
    </div>
  );
}

export default App;
