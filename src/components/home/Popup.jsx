import { useNavigate } from "react-router-dom";
import classes from "./Popup.module.css";
import { CartIcon, CloseIcon } from "../UI/Icons";
import React from "react";
function Popup(props) {
  const navigate = useNavigate();
  function closePopupHandler() {
    props.onClose();
  }

  const navigateToDetailPage = (prodId) => {
    navigate(`/detail/${prodId}`);
  };
  return (
    <div>
      {/* Overlay */}
      <div className={classes.overlay} onClick={closePopupHandler}></div>

      {/* Popup */}
      <div className={classes.popup}>
        <div onClick={closePopupHandler}>
          <CloseIcon className={classes["close-icon"]} />
        </div>
        <div className={classes.popupInner}>
          <div className="row ">
            <div className="col-sm-6 col-12 d-flex align-items-center ">
              <div className={classes.imgContainer}>
                <img src={props.imgUrl} alt={props.name} />
              </div>
            </div>
            <div className="col-sm-6 col-12">
              <div className={classes["text-box"]}>
                <div className="px-3 py-4 mt-4">
                  <h4 className={classes.name}>{props.name}</h4>
                  <p className={classes.price}>{props.price} VND</p>
                  <div className={classes.description}>{props.short_desc}</div>
                  <button
                    className="btn btn-dark"
                    onClick={navigateToDetailPage.bind(null, props.id)}
                  >
                    <CartIcon className={classes["cart-icon"]} /> View Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
