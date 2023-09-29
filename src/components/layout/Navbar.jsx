import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/redux-store";
import {
  CaretDownIcon,
  CartIcon,
  LoginIcon,
  MenuBarIcon,
  XmarkIcon,
} from "../UI/Icons";
import classes from "./Navbar.module.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(0);
  const userFullName = useSelector((state) => state.login.user.fullName);
  const userName = userFullName?.split(" ")[0]; // get first word of full name
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cart.cartList);
  const totalQuantity = cartList.reduce((acc, prod) => acc + prod.quantity, 0);
  const [isAddedCart, setIsAddedCart] = useState(false);
  const location = useLocation();

  //===========================================
  // Handle Navbar background when SCROLL
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  //===========================================
  // Handle UI effect when adding new product to cart
  useEffect(() => {
    if (totalQuantity > 0) {
      setIsAddedCart(true);
    }
    setTimeout(() => {
      setIsAddedCart(false);
    }, 300);
  }, [totalQuantity]);

  const cartIconContainerClasses = `${classes["cart-icon-container"]} ${
    isAddedCart ? classes.bump : ""
  }`;

  //===========================================
  // Handle user logout
  const logoutHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(loginActions.userLogout());
      navigate("/login");
    }
  };

  //=========================================
  // Handle show hamburger menu & userMenu
  const [openMenu, setOpenMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  useEffect(() => {
    setOpenMenu(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  let navClasses = isScrolled
    ? `${classes.navbar} ${classes.scroll}`
    : classes.navbar;
  navClasses = `${navClasses} ${openMenu ? classes.open : ""}`;

  return (
    <nav className={navClasses}>
      <div className="container fst-italic py-2 ">
        <div className="row ">
          <div
            className="d-flex d-sm-none col-1 align-items-center"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <div className={classes.menuIcon}>
              {openMenu ? <XmarkIcon /> : <MenuBarIcon />}
            </div>
          </div>
          {/* LIST 1 */}
          <ul
            className={`d-flex gap-2  align-items-center col-sm-5 col-12  ${
              classes.list_1
            } ${openMenu ? classes.open : ""}`}
            onClick={() => setOpenMenu(false)}
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop/all"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <span>Shop</span>
              </NavLink>
            </li>
          </ul>

          {/* Main LOGO */}

          <div className=" col-sm-2 col-3 d-flex align-items-center">
            <div className={classes.brandContainer}>
              <NavLink to="/">
                <span className={classes.brand}>BOUTIQUE</span>
              </NavLink>
            </div>
          </div>

          {/* LIST 2 */}
          <ul
            className={`${classes.list_2} d-flex gap-2 align-items-center justify-content-end col-sm-5 col-8 position-relative `}
          >
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <div className={cartIconContainerClasses}>
                  <CartIcon className={`${classes.icon} fs-6 me-1`} />

                  {totalQuantity > 0 && (
                    <span className={classes["cart-product-quantity"]}>
                      {totalQuantity}
                    </span>
                  )}
                </div>
                <span className={classes.cartText}>Cart</span>
              </NavLink>
            </li>
            {!isLoggedIn && (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <LoginIcon className={`${classes.icon} fs-6 me-1`} />
                  <span className={classes.loginText}>Login</span>
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li className="">
                <div onClick={() => setShowUserMenu((prev) => !prev)}>
                  <NavLink className="d-flex align-items-center">
                    <LoginIcon className={`${classes.icon} fs-6 me-1`} />

                    <span className="me-1">{userName}</span>
                    <CaretDownIcon className="ms-1" />
                  </NavLink>
                </div>
                <div
                  className={`${classes.userMenu}  ${
                    showUserMenu ? classes.openUserMenu : ""
                  }`}
                  onClick={() => setShowUserMenu(false)}
                >
                  <ul>
                    <li onClick={logoutHandler}>Logout</li>
                    <li>Setting</li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>{" "}
      </div>
    </nav>
  );
}
export default Navbar;
