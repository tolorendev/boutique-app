import classes from "./OtherInformation.module.css";
function OtherInformation() {
  return (
    <section className={classes.otherInfo}>
      <div className={`container text-center ${classes.info}`}>
        <div className="row g-3">
          <div className="col-sm-4 col-12">
            <div>
              <h4>FREE SHIPPING</h4>
              <span>Free shipping worldwide</span>
            </div>
          </div>
          <div className="col-sm-4 col-6">
            <div>
              <h4>24 X 7 SERVICE</h4>
              <span>Free shipping worldwide</span>
            </div>
          </div>
          <div className="col-sm-4 col-6">
            <div>
              <h4>FESTIVAL OFFER</h4>
              <span>Free shipping worldwide</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 ">
        <div className="row  ">
          <div className="col-sm-6 col-12">
            <div className="mb-3 text-sm-start text-center">
              <h3>LET'S BE FRIENDS!</h3>
              <span>Lorem, ipsum dolor sit amet consectetur adipisicing.</span>
            </div>
          </div>
          <div className="col-sm-6 col-12">
            <form className="px-sm-0 px-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "0" }}
                />
                <button className="btn btn-dark">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default OtherInformation;
