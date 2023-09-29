import React from "react";
import Banner from "../components/home/Banner";
import CategoriesList from "../components/home/CategoriesList";
import TopTrendingProducts from "../components/home/TopTrendingProductsList";
import OtherInformation from "../components/home/OtherInformation";

function HomePage() {
  return (
    <React.Fragment>
      <Banner />
      <CategoriesList />
      <TopTrendingProducts />
      <OtherInformation />
    </React.Fragment>
  );
}
export default HomePage;
