import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  // name of slice
  name: 'cart',

  // initial state of slice
  initialState: {
    items: [],    //items in carts
    totalQuantity: 0,     //total items in cart
  },

  //reducers fuctions
  reducers: {
    // add item to cart
    addItemToCart(state, action) {
      //get new item from action
      const newItem = action.payload;

      // if item is already  present to list then get that item
      const existingItem = state.items.find((item) => item.id === newItem.id);

      // as we add item increase total quantity by 1
      state.totalQuantity++;

      // if item is not present to list
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        });
      } 
      //if item present to list increase quantity and total price of existing item
      else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    // remove item from cart list
    removeItemFromCart(state, action) {
      // get id from action
      const id = action.payload;

      // get the item if already present to list
      const existingItem = state.items.find(item => item.id === id);

      // decrease the total quantity of state
      state.totalQuantity--;

      // if quantity of required item is 1 then remove item from list
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } 
      
      //if quantity of item > 1 then decrease quantity by 1
      else {
        existingItem.quantity--;
      }
    },
  },
});

// export actions for to dispatch action
export const cartActions = cartSlice.actions;

export default cartSlice;