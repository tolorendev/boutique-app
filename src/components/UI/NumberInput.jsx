import React, { useEffect, useState } from "react";
import classes from "./NumberInput.module.css";

const NumberInput = (props) => {
  const [value, setValue] = useState(props.initialValue);

  useEffect(() => {
    props.getValue(value);
  }, [value, props]);

  const decreaseHandler = () => {
    if (value <= props.min) return;
    setValue((prevVal) => prevVal - 1);
  };

  const increaseHandler = () => {
    setValue((prevVal) => prevVal + 1);
  };

  const onChangeHandler = (e) => {
    if (e.target.value.trim() === "") {
      setValue("");
      return;
    }
    const enteredValue = Number(e.target.value);
    if (enteredValue < props.min) {
      return;
    }
    setValue(e.target.value);
  };

  const onBlurHandler = (e) => {
    const enteredValue = Number(e.target.value);
    if (enteredValue < props.min) {
      setValue(props.min);
      return;
    }
    setValue(enteredValue);
  };
  return (
    <div className={`${classes["number-input"]} ${props.className}`}>
      <button type="button" onClick={decreaseHandler}>
        ◀
      </button>
      <input
        type="number"
        min={props.min}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
      <button type="button" onClick={increaseHandler}>
        ▶
      </button>
    </div>
  );
};

export default React.memo(NumberInput);
