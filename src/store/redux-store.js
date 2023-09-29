import { createSlice, configureStore } from "@reduxjs/toolkit";

//====================================
// 1. Popup states
//====================================
const popupInitialState = { isShow: false, popupData: {} };
const popupSlice = createSlice({
  name: "popup",
  initialState: popupInitialState,
  reducers: {
    hidePopup(state) {
      state.isShow = false;
      state.popupData = {};
    },
    showPopup(state, action) {
      state.isShow = true;
      state.popupData = action.payload;
    },
  },
});

//====================================
// 2. Login/ Logout state
//====================================

const initUser = JSON.parse(localStorage.getItem("currentUser")) || {};
const initIslogin = Object.keys(initUser).length > 0;

const loginInitialSate = {
  isLoggedIn: initIslogin,
  user: initUser,
};
const loginSlice = createSlice({
  name: "login",
  initialState: loginInitialSate,
  reducers: {
    userLogin(state, action) {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    userLogout(state) {
      localStorage.removeItem("currentUser");
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});
//====================================
// 3. Cart states
//====================================

const cartInitialState = {
  cartList: JSON.parse(localStorage.getItem("cartList")) || [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addCart(state, action) {
      const newAddProduct = action.payload;
      //  If current Cart list is Empty
      if (state.cartList.length === 0) {
        state.cartList.push(newAddProduct);
        localStorage.setItem("cartList", JSON.stringify(state.cartList));
        return;
      }

      // If added Product has already Exists
      const isProductAlreadyExist = state.cartList.some(
        (prod) => prod._id.$oid === newAddProduct._id.$oid
      );
      if (isProductAlreadyExist) {
        const productIndex = state.cartList.findIndex(
          (prod) => prod._id.$oid === newAddProduct._id.$oid
        );
        state.cartList[productIndex].quantity += newAddProduct.quantity;

        // If added Product has not Exists yet
      } else {
        state.cartList.push(newAddProduct);
      }

      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },

    updateCart(state, action) {
      const productId = action.payload.productId;
      const updatedQuantity = action.payload.quantity;

      const updatedProductIndex = state.cartList.findIndex(
        (prod) => prod._id.$oid === productId
      );

      state.cartList[updatedProductIndex].quantity = updatedQuantity;

      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    deleteCart(state, action) {
      const productId = action.payload.productId;
      const updatedProductIndex = state.cartList.findIndex(
        (prod) => prod._id.$oid === productId
      );
      console.log(updatedProductIndex);

      state.cartList.splice(updatedProductIndex, 1);

      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    clearCart(state) {
      state.cartList = [];

      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
  },
});

//===================================
//  Store & Actions
//===================================
const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
    login: loginSlice.reducer,
    cart: cartSlice.reducer,
  },
});
export const popupActions = popupSlice.actions;
export const loginActions = loginSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
