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
          sellerCart: [sellerCartItem],
        });
      } else {
        const sellerCart = state.cart[sellerCartItemIndex].sellerCart;
        // check if seller cart products exists
        const sellerProductIndex = sellerCart.findIndex(
          (item) => item.product._id === productId
        );
        if (sellerProductIndex === -1) {
          sellerCart.push(sellerCartItem);
        }
      }
    },
    changeQuantity(state, action) {
      const { sellerId, productId, increment } = action.payload;

      // find seller cart
      const sellerCartItemIndex = state.cart.findIndex(
        (item) => item.sellerId === sellerId
      );
      if (sellerCartItemIndex !== -1) {
        const sellerCart = state.cart[sellerCartItemIndex].sellerCart;
        // check if seller cart products exists
        const sellerProductIndex = sellerCart.findIndex(
          (item) => item.product._id === productId
        );
        if (sellerProductIndex !== -1) {
          const newQty = sellerCart[sellerProductIndex].quantity + increment;
          if (newQty <= 0) {
            sellerCart[sellerProductIndex].quantity = 1;
          } else {
            sellerCart[sellerProductIndex].quantity = newQty;
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
        const sellerCart = state.cart[sellerCartItemIndex].sellerCart;
        // check if seller cart products exists
        const sellerProductIndex = sellerCart.findIndex(
          (item) => item.product._id === productId
        );
        if (sellerProductIndex !== -1) {
          sellerCart.splice(sellerProductIndex, 1);
        }

        // cleanup
        if (sellerCart.length === 0) {
          state.cart.splice(sellerCartItemIndex, 1);
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
