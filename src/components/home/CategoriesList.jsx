import { NavLink } from "react-router-dom";
import productImg1 from "../../images/product_1.png";
import productImg2 from "../../images/product_2.png";
import productImg3 from "../../images/product_3.png";
import productImg4 from "../../images/product_4.png";
import productImg5 from "../../images/product_5.png";

import classes from "./CategoriesList.module.css";

function CategoriesList() {
  const categories = [
    { img: productImg1, name: "iphone" },
    { img: productImg2, name: "mac" },
    { img: productImg3, name: "ipad" },
    { img: productImg4, name: "watch" },
    { img: productImg5, name: "airpod" },
  ];

  const categoryJSXList = categories.map((cat) => (
    <div className={classes.item}>
      <NavLink to={`/shop/${cat.name}`}>
        <img src={cat.img} alt={cat.name} />
        <div className={classes.overlay}></div>
      </NavLink>
    </div>
  ));
  return (
    <section className={classes.categories}>
      <div className="container ">
        <div className="text-center">
          <span>CAREFULLY CREATED COLLECTIONS</span>
          <h3>BROWSE OUR CATEGORIES</h3>
        </div>

        <div className="row g-3 text-center">
          <div className="col-6 ">{categoryJSXList[0]}</div>
          <div className="col-6">{categoryJSXList[1]}</div>
          <div className="col-4">{categoryJSXList[2]}</div>
          <div className="col-4 ">{categoryJSXList[3]}</div>
          <div className="col-4 ">{categoryJSXList[4]}</div>
        </div>
      </div>
    </section>
  );
}

export default CategoriesList;
