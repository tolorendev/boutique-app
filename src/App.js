import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import ShopPage from "./pages/Shop";
import CartPage from "./pages/Cart";

import CheckoutPage from "./pages/Checkout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import RootLayout from "./components/layout/RootLayout";
import DetailPage from "./pages/Detail";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/UI/ScrollToTop";

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Navigate to="/shop/all" />} />
          <Route path="/shop/:productCategory" element={<ShopPage />} />
          <Route path="/detail/:productId" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
export default App;

//===================================================
// Solution 2:  Make Router with Object
//===================================================
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { path: "/", element: <HomePage /> },
//       { path: "/shop", element: <Navigate to="/shop/all" /> },
//       { path: "/shop/:productCategory", element: <ShopPage /> },
//       { path: "/detail/:productId", element: <DetailPage /> },
//       { path: "/cart", element: <CartPage /> },
//       { path: "/checkout", element: <CheckoutPage /> },
//       { path: "/login", element: <LoginPage /> },
//       { path: "/register", element: <RegisterPage /> },
//     ],
//   },
// ]);

// function App() {
//   const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
//   console.log(isLoggedIn);
//   return <RouterProvider router={router}></RouterProvider>;
// }
// export default App;
