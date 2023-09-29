import classes from "./BannerSub.module.css";
function BannerSub(props) {
  return (
    <section className={classes.banner}>
      <div className="container fst-italic mb-4">
        <div className="d-flex justify-content-between align-items-center px-md-5 px-3 gap-5">
          <h2 className="fs-1">{props.name}</h2>
          <h5 className="fs-6">
            <span className="text-dark">{props.subtext}</span> {props.name}
          </h5>
        </div>
      </div>
    </section>
  );
}
export default BannerSub;
