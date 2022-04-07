import { createContext, useContext, useState } from "react";

const FilterContext = createContext();
export function FilterProvider(props) {
  const [filter, setFilter] = useState("");
  const hanldeFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const values = { filter, hanldeFilterChange };
  return (
    <FilterContext.Provider value={values} {...props}></FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (typeof context == "undefined") throw new Error("co loi");
  return context;
}
