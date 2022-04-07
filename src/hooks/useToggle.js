import React, { useState } from "react";

export const useToggle = () => {
  const [value, setValue] = useState(false);
  const hanldeToggleValue = () => {
    setValue((prev) => !prev);
  };
  return {
    value,
    hanldeToggleValue,
  };
};
