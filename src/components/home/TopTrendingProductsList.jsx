import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { popupActions } from "../../store/redux-store";
import ProductItem from "./ProductItem";
import Popup from "./Popup";
import Loader from "../UI/Loader";
import classes from "./TopTrendingProductsList.module.css";
import { getAllProducts } from "../../lib/api";
import useHttp from "../../hooks/use-http";

function TopTrendingProducts() {
  const { data: products, httpError, isLoading, sendRequest } = useHttp();
  const { isShow, popupData } = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  //====================================
  //  Fetch Products
  //====================================
  useEffect(() => {
    sendRequest(getAllProducts);

    return () => {
      dispatch(popupActions.hidePopup());
    };
  }, [dispatch, sendRequest]);
  const shownProducts = products ? products.slice(0, 8) : [];

  //====================================
  //  Handle Popup
  //====================================
  const openPopupHandler = (prod) => {
    const price = (+prod.price).toLocaleString("en-US").replaceAll(",", ".");
    const data = {
      name: prod.name,
      price: price,
      short_desc: prod.short_desc,
      imgUrl: prod.img1,
      id: prod._id.$oid,
    };
    dispatch(popupActions.showPopup(data));
  };
  const closePopupHandler = () => {
    dispatch(popupActions.hidePopup());
  };

  // Handle UI Loading  & Error
  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Loader />
      </div>
    );
  }
  if (httpError) {
    return (
      <div className="container text-center my-5 py-5 text-danger">
        {httpError}
      </div>
    );
  }

  return (
    <section className={classes.products}>
      <div className="container">
        <div className="text-sm-start text-center">
          <span>MADE THE HARD WAY</span>
          <h3>TOP TRENDING PRODUCTS</h3>
        </div>
        <div className="row g-2">
          {shownProducts.map((prod) => (
            <div
              className="col-sm-3 col-6"
              key={prod._id.$oid}
              onClick={openPopupHandler.bind(null, prod)}
            >
              <ProductItem
                imgUrl={prod.img1}
                name={prod.name}
                price={prod.price}
                short_desc={prod.short_desc}
              />
            </div>
          ))}
          {isShow && <Popup {...popupData} onClose={closePopupHandler} />}
        </div>
      </div>
    </section>
  );
}
export default TopTrendingProducts;
