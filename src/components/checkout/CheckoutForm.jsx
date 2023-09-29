import { useRef, useState } from "react";
import classes from "./CheckoutForm.module.css";

function CheckOutForm(props) {
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const addressInputRef = useRef();
  const phoneInputRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    fullName: true,
    email: true,
    address: true,
    phone: true,
  });

  //===========================================
  // Handle Form Authentication
  //===========================================
  const submitHandler = (e) => {
    e.preventDefault();

    const enteredFullName = fullNameInputRef.current.value.trim();
    const enteredEmail = emailInputRef.current.value.trim();
    const enteredAddress = addressInputRef.current.value.trim();
    const enteredPhone = phoneInputRef.current.value.trim();

    // validate
    const fullNameIsValid = enteredFullName !== "";
    const emailIsValid = enteredEmail !== "";
    const addressIsValid = enteredAddress !== "";
    const phoneIsValid = enteredPhone !== "";
    setFormInputsValidity({
      fullName: fullNameIsValid,
      email: emailIsValid,
      address: addressIsValid,
      phone: phoneIsValid,
    });

    // Handle when form is valid
    const formIsValid =
      fullNameIsValid && emailIsValid && addressIsValid && phoneIsValid;
    if (formIsValid) {
      const customerInfo = {
        fullNam: enteredFullName,
        email: enteredEmail,
        phone: enteredPhone,
        address: enteredAddress,
      };

      props.onSubmitForm(customerInfo);
      fullNameInputRef.current.value = "";
      emailInputRef.current.value = "";
      phoneInputRef.current.value = "";
      addressInputRef.current.value = "";
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["form-group"]}>
        <label htmlFor="fullname" className="form-label">
          FULL NAME:
        </label>
        <input
          type="text"
          className="form-control"
          id="fullname"
          placeholder="Enter Your Full Name Here!"
          ref={fullNameInputRef}
        />
        {!formInputsValidity.fullName && (
          <span className={classes.error}>* Full Name is Invalid !</span>
        )}
      </div>
      <div className={classes["form-group"]}>
        <label htmlFor="email" className="form-label">
          EMAIL:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter Your Email Here!"
          ref={emailInputRef}
        />
        {!formInputsValidity.email && (
          <span className={classes.error}>* Email is Invalid !</span>
        )}
      </div>
      <div className={classes["form-group"]}>
        <label htmlFor="phone" className="form-label">
          PHONE NUMBER:
        </label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          placeholder="Enter Your Phone Number Here!"
          ref={phoneInputRef}
        />
        {!formInputsValidity.phone && (
          <span className={classes.error}>* Phone Number is Invalid !</span>
        )}
      </div>
      <div className={classes["form-group"]}>
        <label htmlFor="address" className="form-label">
          ADDRESS:
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          placeholder="Enter Your Address Here!"
          ref={addressInputRef}
        />
        {!formInputsValidity.address && (
          <span className={classes.error}>* Address is Invalid !</span>
        )}
      </div>
      <button className="btn btn-dark">Place order</button>
    </form>
  );
}

export default CheckOutForm;
