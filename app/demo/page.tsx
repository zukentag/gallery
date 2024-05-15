"use client";
import React, { use, useEffect, useState } from "react";

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

const MultiSelect = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Array<Search>>([]);
  const [selectedUser, setSelectedUser] = useState<Array<Search>>([]);

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
  return (
    <div className="p-5 flex flex-col justify-center items-center relative gap-2  ">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
        className="p-2 w-[50%] flex flex-wrap border-solid border-2 outline-none"
      />
      <ul className="flex flex-col w-[50%] max-h-[10rem] overflow-y-scroll ml-1 gap-2 text-left">
        {suggestions?.map((user) => {
          return (
            <li
              key={user.id}
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
