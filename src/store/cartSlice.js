import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      const { sellerId, sellerName, productId, productName } = action.payload;

      const sellerCartItem = {
        product: {
          _id: productId,
          name: productName,
        },
        quantity: 1,
      };

      // check if seller cart exists in cart array
      const sellerCartItemIndex = state.cart.findIndex(
        (item) => item.sellerId === sellerId
      );
      if (sellerCartItemIndex === -1) {
        state.cart.push({
          sellerId,
          sellerName,
          deliveryService: "dhl",
          cartItems: [sellerCartItem],
        });
      } else {
        const sellerCartItems = state.cart[sellerCartItemIndex].cartItems;
        // check if seller cart products exists
        const sellerProductIndex = sellerCartItems.findIndex(
          (item) => item.product._id === productId
        );
        if (sellerProductIndex === -1) {
          sellerCartItems.push(sellerCartItem);
        }
      }
    },
    changeQuantity(state, action) {
      const { sellerId, productId, qty } = action.payload;

      // find seller cart
      const sellerCartItemIndex = state.cart.findIndex(
        (item) => item.sellerId === sellerId
      );
      if (sellerCartItemIndex !== -1) {
        const sellerCartItems = state.cart[sellerCartItemIndex].cartItems;
        // check if seller cart products exists
        const sellerProductIndex = sellerCartItems.findIndex(
          (item) => item.product._id === productId
        );
        if (sellerProductIndex !== -1) {
          if (qty <= 0) {
            sellerCartItems[sellerProductIndex].quantity = 1;
          } else {
            sellerCartItems[sellerProductIndex].quantity = qty;
          }
        }
      }
    },
    removeFromCart(state, action) {
      const { sellerId, productId } = action.payload;

      // find seller cart
      const sellerCartItemIndex = state.cart.findIndex(
        (item) => item.sellerId === sellerId
      );
      if (sellerCartItemIndex !== -1) {
        const sellerCartItems = state.cart[sellerCartItemIndex].cartItems;
        // check if seller cart products exists
        const sellerProductIndex = sellerCartItems.findIndex(
          (item) => item.product._id === productId
        );
        if (sellerProductIndex !== -1) {
          sellerCartItems.splice(sellerProductIndex, 1);
        }

        // cleanup
        if (sellerCartItems.length === 0) {
          state.cart.splice(sellerCartItemIndex, 1);
        }
      }
    },
    removeSellerCart(state, action) {
      const sellerId = action.payload;

      // find seller cart
      const sellerCartItemIndex = state.cart.findIndex(
        (item) => item.sellerId === sellerId
      );
      console.log(sellerCartItemIndex);
      if (sellerCartItemIndex !== -1) {
        state.cart.splice(sellerCartItemIndex, 1);
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
