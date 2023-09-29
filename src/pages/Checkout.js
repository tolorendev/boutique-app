import React from "react";
import CheckoutBanner from "../components/layout/BannerSub";
import BillingDetails from "../components/checkout/BillingDetails";

function CheckoutPage() {
  return (
    <React.Fragment>
      <CheckoutBanner name="CHECKOUT" subtext="HOME / CART /" />
      <BillingDetails />
    </React.Fragment>
  );
}
export default CheckoutPage;
