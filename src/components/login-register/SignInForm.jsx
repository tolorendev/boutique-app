import { NavLink, useNavigate } from "react-router-dom";
import classes from "./SignInForm.module.css";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/redux-store";
import NotificationPopup from "../UI/NotificationPopup";
function SignInForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const [formInputsValidity, setFormInputsValidity] = useState({
    email: true,
    password: true,
    userIsNotExists: false,
  });
  const navigate = useNavigate();

  const [isShowNotification, setIsShowNotification] = useState(false);

  //===========================================
  // Handle Form Authentication
  //===========================================
  const signinHandler = (e) => {
    e.preventDefault();
    console.log(111);

    const enteredEmail = emailInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value.trim();

    // Validate step 1: Input values
    let emailIsValid = enteredEmail !== "";
    let passwordIsValid = enteredPassword.length > 8;

    setFormInputsValidity({
      email: emailIsValid,
      password: passwordIsValid,
      userNotFound: false,
    });

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    // Validate step 2: User
    const userArray = JSON.parse(localStorage.getItem("userArray")) || [];
    emailIsValid = userArray.some((user) => user.email === enteredEmail);
    passwordIsValid = userArray.some(
      (user) => user.password === enteredPassword
    );

    setFormInputsValidity({
      email: true,
      password: true,
      userIsNotExists: !emailIsValid,
    });
    if (!emailIsValid) {
      passwordInputRef.current.value = "";
    }

    // Hanlde when form is valid
    const formIsValid = emailIsValid && passwordIsValid;
    if (formIsValid) {
      setIsLoggedIn(true);

      const index = userArray.findIndex((user) => user.email === enteredEmail);
      dispatch(loginActions.userLogin(userArray[index]));

      // Clear All input fields
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";

      //Show notification
      setIsShowNotification(true);
      setTimeout(() => {
        setIsShowNotification(false);
        navigate("/");
      }, 1000);
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
      {isLoggedIn && <div className="text-success">Login successfull !</div>}
      {formInputsValidity.userIsNotExists && (
        <div className=""> * User does not exist! Please try again</div>
      )}
      {!formInputsValidity.email && (
        <span className="col-6">* Email is Invalid !</span>
      )}
      {!formInputsValidity.password && (
        <span className="col-6">* Password is Invalid !</span>
      )}
    </div>
  );

  return (
    <div className={`card p-5  ${classes.card}`}>
      {isShowNotification && (
        <NotificationPopup
          text="You was logged in successfull"
          heading="Success!"
        />
      )}
      <h3 className="fst-italic fs-2 fw-normal text-center mt-3 mb-5">
        Sign in
      </h3>
      <form action="" className={classes.form} onSubmit={signinHandler}>
        {errorAlertsContent}
        <div className=" mb-4">
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
        </div>
        <div className="d-grid mb-4">
          <button
            className="btn btn-dark fst-italic"
            style={{ padding: "12px", borderRadius: "0" }}
          >
            SIGN IN
          </button>
        </div>
        <p className="fst-italic text-center mb-0 text-secondary">
          Create an account?
          <NavLink to="/register" style={{ textDecoration: "none" }}>
            {" "}
            Sign up
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default SignInForm;
