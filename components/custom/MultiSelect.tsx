"use client";
import React, { useEffect, useState } from "react";

const dummyData = [
  { id: 1, name: "Walter White" },
  { id: 2, name: "Jesse Pinkman" },
  { id: 3, name: "Saul Goodman" },
  { id: 4, name: "Skyler White" },
  { id: 5, name: "Hank Schrader" },
  { id: 6, name: "Mike Ehrmantraut" },
  { id: 7, name: "Gus Fring" },
  { id: 8, name: "Tuco Salamanca" },
  { id: 9, name: "Jane Margolis" },
  { id: 10, name: "Gale Boetticher" },
];

interface Search {
  id: number;
  name: string;
}
interface ChipProps {
  user: Search;
  onClickFunction: () => void;
}

const Chip: React.FC<ChipProps> = ({ user, onClickFunction }) => {
  return (
    <div
      className="flex justify-center items-center cursor-pointer p-2 border-solid border-2 rounded-full bg-black text-white dark:bg-white dark:text-black "
      onClick={onClickFunction}
    >
      {user.name} &times;
    </div>
  );
};

const MultiSelect = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Array<Search>>([]);
  const [selectedUser, setSelectedUser] = useState<Array<Search>>([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  useEffect(() => {
    const fetchData = () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      } else {
        const filterBySearch = dummyData.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSuggestions(filterBySearch);
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleSelectedUser = (user: Search) => {
    setSelectedUser([...selectedUser, user]);
    setSelectedUserSet(new Set([...selectedUser, user.id]));
    setSearchTerm("");

    setSuggestions([]);
  };

  return (
    <div className="p-5   flex flex-col justify-center items-center relative gap-2  ">
      <div className="p-2 w-[50rem]  flex flex-wrap border-solid border-2 outline-none gap-5">
        {selectedUser.length !== 0 ? (
          <div className="flex flex-wrap gap-5">
            {selectedUser.map((user) => (
              <Chip
                key={user.id}
                user={user}
                onClickFunction={() => {
                  const updatedUser = selectedUser.filter(
                    (u) => u.id !== user.id
                  );
                  const updatedUserIdSet = new Set(selectedUserSet);
                  updatedUserIdSet.delete(user.id);
                  setSelectedUserSet(updatedUserIdSet);

                  setSelectedUser(updatedUser);
                }}
              />
            ))}
          </div>
        ) : null}

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="flex justify-center items-center outline-none w-[50rem] "
        />
      </div>
      <ul className="flex flex-col w-[50rem]  max-h-[10rem] overflow-y-scroll ml-1 gap-2 text-left">
        {suggestions?.map((user) => {
          return selectedUserSet.has(user.id) ? (
            <></>
          ) : (
            <li
              key={user.id}
              onClick={() => handleSelectedUser(user)}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100 hover:dark:text-black"
            >
              {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MultiSelect;
