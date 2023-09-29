import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductItem from "../home/ProductItem";
import Dropdown, { DROPDOWN_VALUES } from "./Dropdown";
import { AnglesLeftIcon, AnglesRightIcon, MenuBarIcon } from "../UI/Icons";
import classes from "./ProductList.module.css";
import Loader from "../UI/Loader";
import { getAllProducts } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import ShopNavbar from "./ShopNavbar";

function ProductList() {
  const { data: products, httpError, isLoading, sendRequest } = useHttp();
  const [sortValue, setSortValue] = useState(DROPDOWN_VALUES.default);
  const searchInputRef = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const categoryParams = params.productCategory || "";
  const [showMenu, setShowMenu] = useState(false);

  //=============================================
  // Fetch products
  // (- API: getAllProduct  - custom hook: useHttp)
  //=============================================
  useEffect(() => {
    sendRequest(getAllProducts);
  }, [sendRequest]);
  const productsSize = 8;
  const shownProducts = products ? products.slice(0, productsSize) : [];

  //=============================================
  // Handle Searching
  //=============================================
  const searchHandler = (e) => {
    e.preventDefault();
    const searchEnteredValue = searchInputRef.current.value.trim();
    if (searchEnteredValue === "") {
      return;
    }
    navigate(`/shop/${searchEnteredValue}`);
  };
  let filteredProducts = []; // show all products as first load

  const searchKeyWord = categoryParams.toLocaleLowerCase();
  if (searchKeyWord.includes("all")) {
    filteredProducts = shownProducts.slice();
  } else {
    filteredProducts = shownProducts.filter((prod) =>
      searchKeyWord.includes(prod.category)
    );
  }

  //=============================================
  // Handle Sorting
  //=============================================
  const getSortValueHandler = (val) => {
    setSortValue(val);
  };
  let sortedProuducts = [];
  switch (sortValue) {
    case DROPDOWN_VALUES.default:
      sortedProuducts = filteredProducts.slice();
      break;
    case DROPDOWN_VALUES.price_increase:
      sortedProuducts = filteredProducts
        .slice()
        .sort((a, b) => a.price - b.price);
      break;
    case DROPDOWN_VALUES.price_decrease:
      sortedProuducts = filteredProducts
        .slice()
        .sort((a, b) => b.price - a.price);
      break;
    default:
  }
  const isNoProductFound = sortedProuducts.length === 0;

  //=============================================
  // navigate to ProductDetail Page
  //=============================================
  const switchToProductDetail = (productId) => {
    navigate(`/detail/${productId}`);
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh", maxHeight: "100%" }}
      >
        <Loader />
      </div>
    );
  }

  if (httpError) {
    return <div className="text-center text-danger mt-5 ">{httpError}</div>;
  }

  return (
    <section>
      {/* ===========================
       // SEARCH AREA 
       =========================== */}
      <div className="row g-2 mb-4 align-items-center ">
        <div className="col-sm-6">
          <div className={classes.searchInput}>
            <form onSubmit={searchHandler}>
              <input
                type="text"
                placeholder="Enter search here..."
                ref={searchInputRef}
                className="form-control"
              />
            </form>
          </div>
        </div>
        {/* ====================== 
          Category Menu Toggler */}
        <div className="col-6 d-sm-none ">
          <div className={classes.menuToggler}>
            <button
              className="btn btn-outline-dark  btn-sm "
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <MenuBarIcon className="me-2" />
              Category
            </button>
          </div>
        </div>
        {/* ====================== 
            Sorting Dropdown    */}
        <div className="col-6 text-end">
          <div className="">
            <Dropdown getValue={getSortValueHandler} />
          </div>
        </div>
      </div>
      {/* ====================== 
            Category Menu  */}
      {showMenu && (
        <div
          className="bg-light p-3 d-sm-none border mb-3"
          onClick={() => setShowMenu(false)}
        >
          <ShopNavbar />
        </div>
      )}
      {/* =========================== 
       // PRODUCTS AREA 
       =========================== */}
      <div className="row g-2 mb-4">
        {isNoProductFound && (
          <div className="text-center text-secondary mt-5">
            <div className="fs-5">No products found!</div>
            <div>Please try again.</div>
          </div>
        )}
        {sortedProuducts.map((prod) => (
          <div
            className="col-sm-4 col-6"
            key={prod._id.$oid}
            onClick={switchToProductDetail.bind(null, prod._id.$oid)}
          >
            <ProductItem
              id={prod._id.$oid}
              imgUrl={prod.img1}
              name={prod.name}
              price={prod.price}
              short_desc={prod.short_desc}
            />
          </div>
        ))}
      </div>
      {/* =========================== 
       // PAGINATION AREA 
      =========================== */}
      <nav className="mb-4">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <span className="page-link ">
              <AnglesLeftIcon className={classes.icon} />
            </span>
          </li>
          <li className="page-item">
            <span className="page-link bg-dark text-white mx-1">1</span>
          </li>
          <li className="page-item">
            <span className="page-link">
              <AnglesRightIcon className={classes.icon} />
            </span>
          </li>
        </ul>
        <div className="text-end fst-italic text-secondary">
          Showing {sortedProuducts.length} / {productsSize} results
        </div>
      </nav>
    </section>
  );
}

export default ProductList;
