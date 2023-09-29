import React from "react";
import ShoppingCart from "../components/cart/ShoppingCart";
import BannerSub from "../components/layout/BannerSub";

function CartPage() {
  return (
    <React.Fragment>
      <BannerSub name="CART" />
      <section>
        <div className="container">
          <div className="row">
            {/* =========================
              Shopping Cart
              ========================= */}
            <ShoppingCart />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
export default CartPage;
