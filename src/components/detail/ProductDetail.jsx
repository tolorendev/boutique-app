import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./ProductDetail.module.css";
import Loader from "../UI/Loader";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/redux-store";
import NumberInput from "../UI/NumberInput";
import NotificationPopup from "../UI/NotificationPopup";
import { getSingleProduct } from "../../lib/api";
import RelatedProductList from "./RelatedProductList";
import useHttp from "../../hooks/use-http";

function ProductDetail() {
  const { data: resData, httpError, isLoading, sendRequest } = useHttp();

  const productId = useParams().productId;
  const [productQuantity, setProductQuantity] = useState(1);
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);

  //=============================================
  // Fetch Product and Related Products
  //=============================================

  const productData = resData ? resData.product : {};
  const relatedProducts = resData ? resData.relatedProducts : [];
  const productImages = resData ? resData.productImages : [];
  useEffect(() => {
    sendRequest(getSingleProduct, productId);
    setSelectedImageId("img1");
  }, [productId, sendRequest]);

  const price = (+productData.price)
    .toLocaleString("en-US")
    .replaceAll(",", ".");

  //=========================================
  // Handle Selected Image Changing
  //=========================================
  const [selectedImageId, setSelectedImageId] = useState("img1");
  const selectedImageUrl = resData
    ? productImages.find((img) => img.id === selectedImageId).url
    : "";
  const clickImageHandler = (imgId) => {
    setSelectedImageId(imgId);
  };

  //=========================================
  // Handle Add to cart
  //=========================================
  const addToCartHandler = (e) => {
    e.preventDefault();
    console.log(productQuantity);

    if (productQuantity === 0) {
      window.alert("Please enter product's quantity !");

      return;
    }
    const cartData = { ...productData, quantity: productQuantity };
    dispatch(cartActions.addCart(cartData));
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1500);
  };

  //=========================================
  // Handle Long description content
  //=========================================
  let longDescriptionContent = <p></p>;
  if (productData.long_desc) {
    const descString = productData.long_desc;
    let strings = descString.split("\n");
    longDescriptionContent = (
      <>
        {strings.map((str) => (
          <p key={Math.random()}>{str}</p>
        ))}
      </>
    );
  }

  // Handle Loading UI
  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ height: "100vh" }}
      >
        <Loader />
      </div>
    );
  }
  if (httpError) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-danger "
        style={{ height: "100vh" }}
      >
        {httpError}
      </div>
    );
  }
  return (
    <React.Fragment>
      {showNotification && (
        <NotificationPopup text="Product has been added to your cart" />
      )}
      {/* =======================================
          Product Basic Information
          ===================================== */}
      <section className={classes.basicInfo}>
        <div className="container pt-5 mt-5 fst-italic">
          <div className="row g-3 p-2">
            <div className="col-md-6 col-12 ">
              <div className="row align-items-stretch">
                <div className="col-2">
                  <div className="d-flex flex-column justify-content-around h-100">
                    {productImages &&
                      productImages.map((img) => (
                        <div
                          className={`${classes["imgSmall-container"]} ${
                            img.id === selectedImageId ? classes.active : ""
                          }`}
                          key={img.id}
                        >
                          <img
                            loading="lazy"
                            src={img.url}
                            alt=""
                            className={classes.imgSmall}
                            onClick={clickImageHandler.bind(null, img.id)}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="col-10">
                  <img src={selectedImageUrl} alt={productData.name} />
                </div>
              </div>
            </div>
            <div className="col">
              <h2 className={classes.name}>{productData.name}</h2>
              <p className={classes.price}>{price} VND</p>
              <p className={classes.description}>{productData.short_desc}</p>
              <p className={classes.category}>
                <b>CATEGORY:</b> <span>{productData.category}</span>
              </p>

              <form action="" onSubmit={addToCartHandler}>
                <div className=" d-flex">
                  <div className="border d-flex align-items-center px-2 py-1">
                    <span className="me-3">QUANTITY</span>
                    <NumberInput
                      min={1}
                      initialValue={1}
                      getValue={(value) => setProductQuantity(value)}
                      className={classes.numberInput}
                    />
                  </div>

                  <button className="btn btn-sm btn-dark">Add to cart</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* ======================================
           Product Long Description
          ===================================== */}
      <section className={classes["long-decs"]}>
        <div className="container fst-italic">
          <div className="row mb-5">
            <div className="col-md-7 col-12">
              <div className="p-2">
                <button className="btn btn-dark fs-5 mb-4">DESCRIPTION</button>
                <h4 className="fs-4 mb-4">PRODUCT DESCRIPTION</h4>
                <div>{longDescriptionContent}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =======================================
          Related Products
          ======================================= */}
      <RelatedProductList productList={relatedProducts} />
    </React.Fragment>
  );
}
export default ProductDetail;
