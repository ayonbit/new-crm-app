"use client";
//Dependencies

import { FaSearch } from "react-icons/fa";

//Search UI main function
const Search = () => {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 w-max">
      <FaSearch size={20} />
      <input
        placeholder="search"
        className="outline-none bg-transparent text-sm"
      />
    </div>
  );
};

export default Search;
