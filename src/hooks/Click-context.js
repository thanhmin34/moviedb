// import { createContext, useContext } from "react";
// import useClickOutSide from "./useClickOutSide";

// const ClickContext = createContext();
// export default function ClickProvider({ props }) {
//   const { show, setShow, nodeRef } = useClickOutSide;
//   const values = { show, setShow, nodeRef };
//   return (
//     <ClickContext.Provider value={values} {...props}></ClickContext.Provider>
//   );
// }
// export function useClick() {
//   const context = useContext(ClickContext);
//   if (typeof context === "undefined") throw new Error("loi");
//   return context;
// }
