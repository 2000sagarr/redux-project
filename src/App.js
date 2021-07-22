import { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  // create dispatch function object
  const dispatch = useDispatch();

  // get show cart or not , cart and notifcation from store
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // whenever cart data changes useEffect ( ) executed and data add to firebase
  useEffect(() => {
    const sendCartData = async () => {

      // set notification
      dispatch(
        // this are action creators
        uiActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending cart data!",
        })
      );

      // send response to backend
      const response = await fetch(
        "https://redux-practice-project-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) } // method : put override the existing cart with current cart
      );

      // if response failed then send error
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      // if response is success then set notification success
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Send cart data",
        })
      );
    };

    if(isInitial){
      isInitial = false;
      return
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Send cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
