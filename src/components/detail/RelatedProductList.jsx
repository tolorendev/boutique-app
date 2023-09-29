import { useNavigate } from "react-router-dom";
import ProductItem from "../home/ProductItem";

function RelatedProductList(props) {
  const navigate = useNavigate();
  //=========================================
  // Handle Navigate to  related Products
  //=========================================
  const navigateToDetailPage = (prodId) => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      navigate(`/detail/${prodId}`);
    }, 300);
  };
  return (
    <section>
      <div className="container fst-italic">
        <div className="row">
          <h4 className="fs-4 mb-4">RELATED PRODUCTS</h4>
          {props.productList.length > 0 &&
            props.productList.map((prod) => (
              <div
                className="col-sm-3 col-4"
                key={prod._id.$oid}
                onClick={navigateToDetailPage.bind(null, prod._id.$oid)}
              >
                <ProductItem
                  imgUrl={prod.img1}
                  name={prod.name}
                  price={prod.price}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
export default RelatedProductList;
