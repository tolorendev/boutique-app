import SignUpForm from "../components/login-register/SignUpForm";
import bannerImg from "../images/banner1.jpg";
import classes from "./Resgister.module.css";

function RegisterPage() {
  return (
    <div
      className={classes.register}
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div className="container ">
        <div className={classes.form}>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
