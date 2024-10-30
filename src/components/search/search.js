import { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { cityApiUrl, cityApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  useEffect(() => {
    const defaultValue = {
      value: "35.011611111 135.768111111", // Coordinates for Kyoto
      label: "Kyoto, JP", // Default label for Kyoto
    };
    setSearch(defaultValue);
    onSearchChange(defaultValue); // Notify parent component about the default selection
    // eslint-disable-next-line
  }, []);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${cityApiUrl}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        cityApiOptions
      );
      const response_1 = await response.json();
      return {
        options: response_1.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (err) {
      return console.log(err);
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div>
      <span
        className="text-2xl flex justify-center drop-shadow-2xl items-center "
        style={{ textShadow: "0 0 8px rgba(0, 0, 0, 1)" }}
      >
        <img src="/logo512.png" alt="tenki-logo" className="h-12 w-12 m-0" />
        Tenki
      </span>
      <AsyncPaginate
        placeholder="Kyoto, JP"
        debounceTimeout={700}
        className="searchBar"
        loadOptions={loadOptions}
        value={search}
        onChange={handleOnChange}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Tailwind bg-black/30
            backdropFilter: "blur(12px)",
            color: "#ffffff",
            borderColor: "rgba(255,255,255,0.3)", // Tailwind border-gray-500
            borderRadius: "0.5rem", // Tailwind rounded-lg
            paddingLeft: "1rem", // Tailwind px-4
            paddingRight: "1rem",
            paddingTop: "0.5rem", // Tailwind py-2
            paddingBottom: "0.5rem",
          }),
          input: (base) => ({
            ...base,
            color: "white", // Set the input text color to white
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Tailwind bg-black/50
            backdropFilter: "blur(12px)",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)", // Tailwind shadow-lg
            borderColor: "#e5e7eb", // Tailwind border-gray-200
            borderRadius: "0.5rem", // Tailwind rounded-md
            marginTop: "0.5rem", // Tailwind mt-2
          }),
          option: (base, state) => ({
            ...base,
            paddingLeft: "1rem", // Tailwind px-4
            paddingRight: "1rem",
            backdropFilter: "blur(12px)",
            paddingTop: "0.5rem", // Tailwind py-2
            paddingBottom: "0.5rem",
            backgroundColor: state.isFocused
              ? "rgba(72, 99, 130, 0.5)"
              : "rgba(0, 0, 0, 0.5)", // Dropdown values hover / normal
            color: "#ffffff", // text-white
          }),
          placeholder: (base) => ({
            ...base,
            color: "#ffffff", // Tailwind text-white
          }),
          singleValue: (base) => ({
            ...base,
            color: "#ffffff", // Tailwind text-gray-700
          }),
        }}
      />
    </div>
  );
};

export default Search;
