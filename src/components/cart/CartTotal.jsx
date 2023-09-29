import { useRef, useState } from "react";
import { GiftIcon } from "../UI/Icons";
import classes from "./CartTotal.module.css";
function CartTotal(props) {
  const [discount, setDiscount] = useState(0);
  const subTotal = props.total;
  const total = subTotal * (1 - discount);

  const subTotalString = subTotal.toLocaleString("en-US").replaceAll(",", ".");
  const totalString = total.toLocaleString("en-US").replaceAll(",", ".");

  const couponInputRef = useRef();

  const applyCouponHandler = (e) => {
    e.preventDefault();
    const enterdCouponValue = couponInputRef.current.value.trim();
    if (enterdCouponValue !== "") {
      // Handle  discount
      setDiscount(0.05);
      // ........... etc.
    }
  };
  return (
    <div className={classes.cartTotal}>
      <h2 className="fs-4 mb-3">CART TOTAL</h2>
      <ul className="list-group list-group-flush mb-3">
        <li className="list-group-item d-flex justify-content-between align-items-center gap-2">
          <div className="fs-5">SUBTOTAL</div>
          <div className="text-secondary">{subTotalString} VND</div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center gap-2">
          <div className=" fs-5">TOTAL</div>{" "}
          <div className="">{totalString} VND</div>
        </li>
      </ul>
      <form onSubmit={applyCouponHandler}>
        {discount > 0 && (
          <div className="my-2 px-3  " style={{ color: "#e67700" }}>
            * Discount: 5%
          </div>
        )}
        <div className="d-grid">
          <input
            type="text"
            placeholder="Enter your coupon"
            className="form-control"
            ref={couponInputRef}
          />
          <button className="btn btn-dark fst-italic">
            <GiftIcon className={classes.icon} />
            Apply coupon
          </button>
        </div>
      </form>
    </div>
  );
}
export default CartTotal;
