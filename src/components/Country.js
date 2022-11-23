import { Menu } from "@headlessui/react";
import { useState } from "react";
import { getListOfPlayers } from "../utils";
import Tooltip from "./Tooltip.js";

const Country = ({ country, index }) => {
  const [players, setPlayers] = useState([]);

  const getPlayers = async (code) => {
    // get list of players for the country by country code
    await getListOfPlayers(code).then((players) => {
      // parse the json result string
      const parsedPlayers = JSON.parse(players);
      // set players
      setPlayers(parsedPlayers);
    });
  };

  return (
    <Menu
      className="mb-2 p-2 border border-blue-500 rounded-md"
      as="div"
      key={index}
    >
      <Menu.Button
        className="flex flex-col"
        onClick={() => getPlayers(country.code)}
      >
        <span className="text-md font-bold">{country.name}</span>
        <span className="text-sm">Click to see players</span>
      </Menu.Button>
      <Menu.Items as="div">
        {!players.length && <span>Loading...</span>}
        {players.length &&
          players.map((player, index) => (
            <Menu.Item
              as="div"
              key={index}
              className="mt-2 rounded-md bg-blue-200 p-2"
            >
              <div className="flex flex-col">
                <div className="flex underline">
                  <span className="mr-1">Name:</span>
                  <Tooltip text={player.name} />
                </div>
                <span>Position: {player.position}</span>
              </div>
            </Menu.Item>
          ))}
      </Menu.Items>
    </Menu>
  );
};

export default Country;
