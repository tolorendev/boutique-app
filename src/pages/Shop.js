import React from "react";
import ProductList from "../components/shop/ProductList";
import ShopNavbar from "../components/shop/ShopNavbar";
import BannerSub from "../components/layout/BannerSub";

function ShopPage() {
  return (
    <React.Fragment>
      <BannerSub name="SHOP" />
      <section>
        <div className="container">
          <div className="row">
            {/* =========================
              Shop Menu navbar
              ========================= */}
            <div className="col-sm-3 col-12 d-sm-block d-none ">
              <div className="mb-4">
                <ShopNavbar />
              </div>
            </div>
            {/* =========================
                Product list
              ========================= */}
            <div className="col-sm-9 col-12">
              <div className="">
                <ProductList />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
export default ShopPage;
