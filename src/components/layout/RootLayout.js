import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import LiveChat from "../UI/LiveChat.jsx";
import { useLocation } from "react-router-dom";

function RootLayout(props) {
  const location = useLocation();
  const [isChangeRoute, setIsChangeRoute] = useState(false);

  useEffect(() => {
    setIsChangeRoute((prev) => !prev);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <Navbar />
      <main>{props.children}</main>

      {isChangeRoute && <LiveChat />}
      {!isChangeRoute && <LiveChat />}

      <Footer />
    </React.Fragment>
  );
}
export default RootLayout;
