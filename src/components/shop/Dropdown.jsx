import React, { useEffect, useRef, useState } from "react";
import classes from "./Dropdown.module.css";
import { DownAngleIcon } from "../UI/Icons";

export const DROPDOWN_VALUES = {
  default: "Default Sorting",
  price_increase: "Price: Low to High",
  price_decrease: "Price: High to Low",
};

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(DROPDOWN_VALUES.default);
  const dropdownToggleRef = useRef();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectValueHandler = (val) => {
    setValue(val);
    setIsOpen(false);
  };

  useEffect(() => {
    props.getValue(value);
  }, [value, props]);

  useEffect(() => {
    const clickHandler = (e) => {
      console.log("click");
      if (e.target !== dropdownToggleRef.current) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", clickHandler);
    } else {
      document.removeEventListener("click", clickHandler);
    }
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [isOpen]);

  const dropdownMenuClasses = isOpen
    ? `${classes["dropdown-menu"]} ${classes.active}`
    : classes["dropdown-menu"];

  return (
    <div className={`${classes.dropdown} ${props.className}`}>
      <button
        className={`${classes["dropdown-toggle"]} btn btn-sm btn-outline-dark d-flex`}
        onClick={toggleDropdown}
        ref={dropdownToggleRef}
      >
        {value}

        <DownAngleIcon />
      </button>
      {isOpen && (
        <ul className={dropdownMenuClasses}>
          <li onClick={selectValueHandler.bind(null, DROPDOWN_VALUES.default)}>
            {DROPDOWN_VALUES.default}
          </li>
          <li
            onClick={selectValueHandler.bind(
              null,
              DROPDOWN_VALUES.price_increase
            )}
          >
            {DROPDOWN_VALUES.price_increase}
          </li>
          <li
            onClick={selectValueHandler.bind(
              null,
              DROPDOWN_VALUES.price_decrease
            )}
          >
            {DROPDOWN_VALUES.price_decrease}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
