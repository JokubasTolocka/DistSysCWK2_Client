import { useState, useRef } from "react";

const Form = ({ onSubmit }) => {
  const [listOfPeople, setListOfPeople] = useState<string[]>([]);
  const [isFair, setIsFair] = useState(true);

  const input = useRef<HTMLInputElement>(null);

  const addPerson = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    setListOfPeople([...listOfPeople, value]);
    if (input.current) input.current.value = "";
  };

  const removePerson = (index) => {
    const newppl = [...listOfPeople];
    newppl.splice(index, 1);
    setListOfPeople([...newppl]);
  };

  const handleSubmit = () => onSubmit(listOfPeople, isFair);

  return (
    <div className="bg-gray-100 rounded-md p-4 w-64">
      <h4 className="text-xl mb-4">Add people</h4>
      <form onSubmit={addPerson} className="my-4 flex">
        <input placeholder="Enter name" ref={input} />
        <button className="text-center bg-green-200 w-full rounded-md">
          Add
        </button>
      </form>

      <h4 className="text-xl mb-4">List</h4>
      <div className="mb-6">
        {listOfPeople.map((person, index) => (
          <div className="w-full flex justify-between my-2" key={index}>
            <h4>{person}</h4>
            <button
              className="bg-red-600 px-2 text-white rounded-md"
              onClick={() => removePerson(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <input
        type="checkbox"
        id="isFair"
        name="subscribe"
        className="mr-2 my-4"
        checked={isFair}
        onChange={() => setIsFair(!isFair)}
      />
      <label htmlFor="isFair">Fair sweepstake?</label>

      <button
        onClick={handleSubmit}
        disabled={!listOfPeople.length}
        className="py-2 rounded-md bg-green-600 w-full disabled:bg-gray-400"
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
