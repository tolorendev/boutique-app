import SignInForm from "../components/login-register/SignInForm";
import bannerImg from "../images/banner1.jpg";
import classes from "./Login.module.css";
function LoginPage() {
  return (
    <div
      className={classes.login}
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div className="container  ">
        <div className={classes.form}>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
