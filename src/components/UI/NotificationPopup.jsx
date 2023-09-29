import { CircleCheckIcon } from "./Icons";
import classes from "./NotificationPopup.module.css";
function NotificationPopup(props) {
  return (
    <section>
      <div className={classes.popup}>
        <div className="text-center">
          <CircleCheckIcon className={classes.icon} />
          <h3>{props.heading}</h3>
          <p>{props.text}</p>
        </div>
      </div>
    </section>
  );
}

export default NotificationPopup;
