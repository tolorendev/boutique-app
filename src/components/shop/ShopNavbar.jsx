import { NavLink } from "react-router-dom";
import classes from "./ShopNavbar.module.css";
function ShopNavbar() {
  return (
    <nav className={classes.navMenu}>
      <h5 className="mb-4">CATEGORIES</h5>
      <ul className="list-group ">
        <li className="list-group-item bg-dark text-white">APPLE</li>
        <li className="list-group-item ">
          <NavLink
            to="/shop/all"
            style={({ isActive }) =>
              isActive ? { color: "#e67700" } : undefined
            }
          >
            ALL
          </NavLink>
        </li>
        <li className={`${classes.heading} list-group-item`}>IPHONE & MAC</li>
        <li className="list-group-item">
          <NavLink
            to="/shop/iphone"
            style={({ isActive }) =>
              isActive ? { color: "#e67700" } : undefined
            }
          >
            iPhone
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/shop/ipad"
            style={({ isActive }) =>
              isActive ? { color: "#e67700" } : undefined
            }
          >
            iPad
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/shop/macbook"
            style={({ isActive }) =>
              isActive ? { color: "#e67700" } : undefined
            }
          >
            MacBook
          </NavLink>
        </li>
        <li className={`${classes.heading} list-group-item`}>WIRELESS</li>
        <li className="list-group-item ">
          <NavLink
            to="/shop/airpod"
            style={({ isActive }) =>
              isActive ? { color: "#e67700" } : undefined
            }
          >
            AirPod
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/shop/watch"
            style={({ isActive }) =>
              isActive ? { color: "#e67700" } : undefined
            }
          >
            Watch
          </NavLink>
        </li>
        <li className={`${classes.heading} list-group-item`}>OTHER</li>
        <li className="list-group-item">
          <NavLink
            to="/shop/mouse"
            style={({ isActive }) =>
              isActive ? { color: "#e67700" } : undefined
            }
          >
            Mouse
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/shop/keyboard"
            style={({ isActive }) =>
              isActive ? { color: "#e67700" } : undefined
            }
          >
            Keyboard
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/shop/other"
            style={({ isActive }) =>
              isActive ? { color: "#e67700" } : undefined
            }
          >
            Other
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default ShopNavbar;
