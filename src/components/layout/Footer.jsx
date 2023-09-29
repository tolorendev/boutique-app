import { NavLink } from "react-router-dom";
import classes from "./Footer.module.css";
function Footer() {
  const footerData = {
    services: [
      "Help & Contact Us",
      "Returns & Refunds",
      "Online Stores",
      "Terms & Conditions",
    ],
    company: ["What We Do ", "Available Services ", "Latest Posts ", "FAQs"],
    socialMedia: ["Twitter", "Instagram", "Facebook", "Pinterest"],
  };
  return (
    <footer className={`${classes.footer} bg-black text-white`}>
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-6 ">
            <div className="my-3">
              <p>CUSTOMER SERVICES</p>
              <ul>
                {footerData.services.map((text) => (
                  <li key={Math.random()}>
                    <NavLink>{text}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-sm-4 col-6">
            <div className="my-3">
              <p>COMPANY</p>
              <ul>
                {footerData.company.map((text) => (
                  <li key={Math.random()}>
                    <NavLink>{text}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-sm-4 col-6">
            <div className="my-3">
              <p>SOCIAL MEDIA</p>
              <ul>
                {footerData.socialMedia.map((text) => (
                  <li key={Math.random()}>
                    <NavLink>{text}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
