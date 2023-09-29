import { NavLink, useNavigate } from "react-router-dom";
import classes from "./SignUpForm.module.css";
import { useRef, useState } from "react";

function SignUpForm() {
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();
  const navigate = useNavigate();
  const [formInputsValidity, setFormInputsValidity] = useState({
    fullName: true,
    email: true,
    password: true,
    phone: true,
  });
  const [userIsAlreadyExists, setUserIsAlreadyExists] = useState(false);

  //===========================================
  // Handle Form Authentication
  //===========================================
  const signupHandler = (e) => {
    e.preventDefault();
    console.log(111);
    const enteredFullName = fullNameInputRef.current.value.trim();
    const enteredEmail = emailInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value.trim();
    const enteredPhone = phoneInputRef.current.value.trim();

    // validate
    const fullNameIsValid = enteredFullName !== "";
    const emailIsValid = enteredEmail !== "";
    const passwordIsValid = enteredPassword.length > 8;
    const phoneIsValid = enteredPhone !== "";
    setFormInputsValidity({
      fullName: fullNameIsValid,
      email: emailIsValid,
      password: passwordIsValid,
      phone: phoneIsValid,
    });
    const userArray = JSON.parse(localStorage.getItem("userArray")) || [];
    let isUserExists = false;
    userArray.forEach((user) => {
      if (user.email === enteredEmail) {
        isUserExists = true;
        setUserIsAlreadyExists(true);
      }
    });

    // Handle when form is valid
    const formIsValid =
      fullNameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      phoneIsValid &&
      !isUserExists;

    if (formIsValid) {
      setUserIsAlreadyExists(false);
      // save user info to localStorage
      userArray.push({
        fullName: enteredFullName,
        email: enteredEmail,
        password: enteredPassword,
        phone: enteredPhone,
      });
      localStorage.setItem("userArray", JSON.stringify(userArray));
      // Clear All input fields
      fullNameInputRef.current.value = "";
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      phoneInputRef.current.value = "";
      // Navigate to Login page
      navigate("/login");
    }
  };

  //===========================================
  // Handle Error Alert
  //===========================================
  const errorAlertsContent = (
    <div
      className="row g-0 fst-italic text-danger mb-2"
      style={{ fontSize: "14px" }}
    >
      {!formInputsValidity.fullName && (
        <span className="col-6">* Full Name is Invalid !</span>
      )}
      {!formInputsValidity.email && (
        <span className="col-6">* Email is Invalid !</span>
      )}
      {!formInputsValidity.password && (
        <span className="col-6">* Password is Invalid !</span>
      )}
      {!formInputsValidity.phone && (
        <span className="col-6">* Phone is Invalid !</span>
      )}
      {userIsAlreadyExists && (
        <span className="col-12">
          * User is already exists, Please choose another Email !
        </span>
      )}
    </div>
  );

  return (
    <div className={`card p-5  ${classes.card}`}>
      <h3 className="fst-italic fs-2 fw-normal text-center mt-2 mb-5 ">
        Sign up
      </h3>
      <form action="" className={classes.form} onSubmit={signupHandler}>
        {errorAlertsContent}
        <div className=" mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            ref={fullNameInputRef}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            ref={emailInputRef}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            ref={passwordInputRef}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            ref={phoneInputRef}
          />
        </div>

        <div className="d-grid mb-4">
          <button
            className="btn btn-dark fst-italic"
            style={{ padding: "12px", borderRadius: "0" }}
          >
            SIGN UP
          </button>
        </div>
        <p className="fst-italic text-center mb-0 text-secondary">
          Login?{" "}
          <NavLink to="/login" style={{ textDecoration: "none" }}>
            Click
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
