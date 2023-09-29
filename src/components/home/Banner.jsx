import { NavLink } from "react-router-dom";
import bannerImg from "../../images/banner1.jpg";
import classes from "./Banner.module.css";
function Banner() {
  return (
    <section className={classes.banner}>
      <div
        className="container"
        style={{
          background: `url(${bannerImg})`,
        }}
      >
        <div className="row ">
          <div className=" col-sm-6 col-8">
            <div className="px-md-5 px-2">
              <span>NEW INSPIRATION 2023</span>
              <h3 className="my-2">20 % OFF ON NEW SEASON</h3>
              <NavLink to="/shop">
                <button className="btn btn-dark btn-sm">
                  Browse collections
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
