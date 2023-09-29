import { NavLink } from "react-router-dom";
import classes from "./ShoppingCart.module.css";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

function ShoppingCart() {
  const cartList = useSelector((state) => state.cart.cartList);
  const total = cartList.reduce(
    (acc, prod) => acc + Number(prod.price) * prod.quantity,
    0
  );
  const isCartEmpty = cartList.length === 0;

  return (
    <section>
      <div className="container fst-italic">
        <h2 className="fs-4 mb-3">SHOPPING CART</h2>
        <div className="row gx-4">
          <div className="col-lg-8 col-12  ">
            {/* ==========================================
                Product Cart List: 
                ======================================== */}
            <div className={classes.cart}>
              <div className={classes.header}>
                {/* Cart Header: (Width >= 768px) */}
                <div className="d-none d-md-block">
                  <div className="row fw-semibold p-3 gx-0 ">
                    <div className="col-2 text-center">
                      <div>IMAGE</div>
                    </div>
                    <div className="col-3  text-center">
                      <div>PRODUCT</div>
                    </div>
                    <div className="col-2 text-center">
                      <div>PRICE</div>
                    </div>
                    <div className="col-2 text-center">
                      <div>QUANTITY</div>
                    </div>
                    <div className="col-2 text-center">
                      <div>TOTAL</div>
                    </div>
                    <div className="col-1 text-center">
                      <div>REMOVE</div>
                    </div>
                  </div>
                </div>
                {/* Cart Header (Width: < 768px) */}
                <div className="d-md-none d-block p-3 mb-3  ">
                  <h3 className="fs-5 m-0"> PRODUCTS</h3>
                </div>
              </div>

              {/* CartItems */}
              {cartList.map((prod) => (
                <CartItem key={prod._id.$oid} {...prod} />
              ))}
            </div>

            {/*  Alert Empty Cart */}
            {isCartEmpty && (
              <div className="text-center text-secondary my-4">
                <div className="fs-5"> Your cart is empty!</div>
                <div>
                  Shopping now?
                  <NavLink to="/shop"> Click</NavLink>
                </div>
              </div>
            )}

            {/* ===========================
                   Actions
              =========================== */}
            <div className={classes.actions}>
              <div className="d-flex gap-4 justify-content-between align-items-center p-3">
                <button
                  className={`d-flex align-items-center btn ${classes["btn-continueShopping"]}`}
                >
                  <span className="fs-3 me-1">←</span>
                  <NavLink to="/shop"> Continue shopping</NavLink>
                </button>
                <button
                  className={`btn  btn-outline-dark d-flex align-items-center ${classes["btn-checkout"]}`}
                  disabled={isCartEmpty}
                >
                  <NavLink to="/checkout"> Proceed to checkout</NavLink>
                  <span className="fs-3 ms-1">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* ============================
                   Cart Total
            ============================ */}
          <div className="col-lg-4 col-12">
            <CartTotal total={total} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShoppingCart;
