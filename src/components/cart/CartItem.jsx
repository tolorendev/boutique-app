import { useEffect, useState } from "react";
import { TrashCanIcon } from "../UI/Icons";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/redux-store";
import NumberInput from "../UI/NumberInput";
import classes from "./CartItem.module.css";

function CartItem(props) {
  console.log("RENDER CARTITEM--");
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(props.quantity);

  const priceContent = (+props.price)
    .toLocaleString("en-US")
    .replaceAll(",", ".");
  const totalContent = (+props.price * props.quantity)
    .toLocaleString("en-US")
    .replaceAll(",", ".");

  useEffect(() => {
    const updatedData = {
      productId: props._id.$oid,
      quantity: quantity,
    };
    dispatch(cartActions.updateCart(updatedData));
  }, [dispatch, props._id.$oid, quantity]);

  const removeProductHandler = () => {
    if (window.confirm("Are you sure ?")) {
      const productId = props._id.$oid;
      dispatch(cartActions.deleteCart({ productId }));
    }
  };
  return (
    <div
      className={`${classes.cartItem} d-flex justify-content-between gap-2 mb-3 py-2`}
    >
      {/* ========================
        Image (Screen width < 768px) */}
      <div className="col-md-2 col-4 text-md-center d-flex align-items-center  d-md-none d-block  ">
        <img src={props.img1} alt={props.name} />
      </div>
      {/* ===========End========= */}

      <div className={"row align-items-center gx-2 p-2 mb-md-3 w-100"}>
        {/* ==========================
           Image (Screen width >= 768px) */}
        <div className="col-md-2 col-4 text-md-center d-md-block d-none">
          <img src={props.img1} alt={props.name} />
        </div>
        {/* ===========End================ */}

        <div className="col-md-3 text-md-center fw-semibold   ">
          <h4> {props.name}</h4>
        </div>
        <div className="col-md-2 text-md-center text-secondary ">
          <p>{priceContent} VND</p>
        </div>

        <div className="col-md-2  text-md-center order-md-0 order-1 ">
          <div className="d-flex  ">
            <NumberInput
              min={1}
              initialValue={quantity}
              getValue={(value) => setQuantity(value)}
              className={classes.numberInput}
            />
          </div>
        </div>

        <div className="col-md-2 text-md-center  text-secondary ">
          <p className={classes.total}> {totalContent} VND</p>
        </div>

        {/* ==============================
             Delete Icon (>= 768px )*/}
        <div className="col-1 text-center  d-md-block d-none">
          <button className="btn btn-white " onClick={removeProductHandler}>
            <TrashCanIcon />
          </button>
        </div>
        {/* ===========End================ */}
      </div>

      {/* ==============================
             Delete Icon (< 768px )*/}
      <div className="col-1 text-center d-flex align-items-center justify-content-end d-md-none d-block">
        <button className="btn btn-white" onClick={removeProductHandler}>
          <TrashCanIcon />
        </button>
      </div>
      {/* ================End============== */}
    </div>
  );
}
export default CartItem;
