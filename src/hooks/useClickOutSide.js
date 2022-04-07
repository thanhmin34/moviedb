import { createContext, useContext, useEffect, useRef, useState } from "react";

export default function useClickOutSide() {
  const [show, setShow] = useState(false);
  const nodeRef = useRef();
  useEffect(() => {
    const hanldeClickOutSide = (e) => {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches("span")
      ) {
        setShow(false);
      }
    };
    document.addEventListener("click", hanldeClickOutSide);
    return () => {
      document.removeEventListener("click", hanldeClickOutSide);
    };
  }, []);
  return { show, setShow, nodeRef };
}
