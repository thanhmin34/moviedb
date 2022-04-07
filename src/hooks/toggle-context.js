import { createContext, useContext } from "react";
import { useToggle } from "./useToggle";

const ShowContext = createContext();
export function ToggleProvider(props) {
  const { hanldeToggleValue, value } = useToggle();
  const values = { hanldeToggleValue, value };
  return (
    <ShowContext.Provider value={values} {...props}></ShowContext.Provider>
  );
}

export function useShow() {
  const context = useContext(ShowContext);
  if (typeof context === "undefined") throw new Error("loi");
  return context;
}
