import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./BillingDetails.module.css";
import CheckOutForm from "./CheckoutForm";
import { useState } from "react";
import NotificationPopup from "../UI/NotificationPopup";
import { cartActions } from "../../store/redux-store";

function BillingDetails() {
  const [showPopup, setIsShowPopup] = useState(false);
  const cartList = useSelector((state) => state.cart.cartList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartList.reduce(
    (acc, prod) => acc + +prod.price * prod.quantity,
    0
  );
  const totalString = total.toLocaleString("en-US").replaceAll(",", ".");

  const orderHandler = (customerInfo) => {
    const orderData = { customer: customerInfo, cart: cartList };
    // Send data to backend
    console.log("ORDER DATA: ", orderData);
    // ...

    // Show successfull notification
    setIsShowPopup(true);
    setTimeout(() => {
      setIsShowPopup(false);
      navigate("/");

      // Clear Cart
      dispatch(cartActions.clearCart());
    }, 1500);
  };

  return (
    <section>
      {showPopup && (
        <NotificationPopup heading="Great!" text="Your order was confirmed" />
      )}
      <div className="container fst-italic">
        <div className="row gx-4">
          <div className="col-md-7 col-12 mb-4 order-md-0 order-1 p-4">
            {/* =======================
                Billing Details Form
                ======================= */}
            <h2 className="fs-sm-4 fs-5 mb-sm-4 mb-3">BILLING DETAILS</h2>
            <CheckOutForm onSubmitForm={orderHandler} />
          </div>
          <div className="col-md-5 col-12 ">
            {/* ======================== 
                Your Order 
            ========================== */}
            <div className={`${classes.order} p-lg-4 p-3 `}>
              <h2 className="fs-sm-4 fs-5 mb-4 ">YOUR ORDER</h2>
              <ul>
                {cartList.map((prod) => (
                  <li key={prod._id.$oid}>
                    <div>{prod.name}</div>
                    <span>
                      {(+prod.price)
                        .toLocaleString("en-US")
                        .replaceAll(",", ".")}{" "}
                      VND x {prod.quantity}
                    </span>
                  </li>
                ))}

                <li>
                  <div>TOTAL</div>
                  <span className={classes["total-price"]}>
                    {totalString} VND
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BillingDetails;
