import Country from "./Country.js";

const Results = ({ results }) => {
  return (
    <div className="flex space-x-4">
      {results.map((result, key) => (
        <div key={key} className="flex flex-col">
          <span className="text-lg font-bold mb-2">{result.name}</span>
          {/* display each country */}
          {result.countries.map((country, key) => (
            <Country country={country} index={key} key={key} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Results;
