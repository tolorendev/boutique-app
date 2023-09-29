import React from "react";

import classes from "./ProductItem.module.css";

function ProductItem(props) {
  const price = (+props.price).toLocaleString("en-US").replaceAll(",", ".");

  return (
    <React.Fragment>
      <div className={classes.product}>
        <img src={props.imgUrl} alt={props.name} />
        <div className="p-3 pt-0 ">
          <p className={classes.name}>{props.name}</p>
          <p className={classes.price}>{price} VND</p>
        </div>
        <div className={classes.overlay}></div>
      </div>
    </React.Fragment>
  );
}

export default ProductItem;
