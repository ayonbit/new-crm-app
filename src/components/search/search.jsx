"use client";
// Dependencies
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

// Search UI main function
const Search = ({ placeholder, onSearch }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((e) => {
    const query = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (query) {
      if (query.length > 2) {
        params.set("q", query);
      }
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params}`);
    onSearch(query); // Call the onSearch prop with the search query
  }, 300);

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-300 shadow-sm w-max hover:shadow-md transition-shadow duration-200">
      <FaSearch size={16} className="text-gray-500" />
      <input
        placeholder={placeholder}
        className="outline-none bg-transparent text-sm p-1 w-48"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
