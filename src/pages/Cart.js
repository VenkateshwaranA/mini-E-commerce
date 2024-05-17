import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart({ cartItems, setCartItems }) {
  const [complete, setComplete] = useState(false);

  console.log("cartItems", cartItems);
  const addQty = (item) => {
    if (item.singleProduct.stock == item.qty) {
      return;
    }

    const updatedItems = cartItems.map((i) => {
      if (i.singleProduct._id == item.singleProduct._id) {
        i.qty++;
      }
      return i;
    });
    setCartItems(updatedItems);
  };
  const decreaseQty = (item) => {
    if (item.qty > 1) {
      const updatedItems = cartItems.map((i) => {
        if (i.singleProduct._id == item.singleProduct._id) {
          i.qty--;
        }
        return i;
      });
      setCartItems(updatedItems);
    }
  };

  const removeItem = (item) => {
    const updatedItems = cartItems.filter((i) => {
      if (i.singleProduct._id != item.singleProduct._id) {
        return true;
      }
    });
    setCartItems(updatedItems);
  };

  const handleOrders = () => {
    let data = cartItems.map((i) => ({
      products: i.singleProduct,
      qty: i.qty,
    }));
    console.log(data);

    fetch(process.env.REACT_APP_PRODUCT_API_URL + "order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      setCartItems([]);
      setComplete(true);
      toast.success("Order Placed");
    });
  };
  return cartItems.length > 0 ? (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart: <b>{cartItems.length}</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems.map((item) => (
              <Fragment>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.singleProduct.images[0].image}
                        alt="Laptop"
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={"/product/" + item.singleProduct._id}>
                        {item.singleProduct.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${item.singleProduct.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.qty}
                          readOnly
                        />

                        <span
                          className="btn btn-primary plus"
                          onClick={() => addQty(item)}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={() => removeItem(item)}
                      ></i>
                    </div>
                  </div>
                </div>
                <hr />
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:
                <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)
                </span>
              </p>
              <p>
                Est. total:{" "}
                <span className="order-summary-values">
                  $
                  {cartItems
                    .reduce(
                      (acc, item) => acc + item.singleProduct.price * item.qty,
                      0
                    )
                    .toFixed(2)}{" "}
                </span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                onClick={handleOrders}
                className="btn btn-primary btn-block"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : !complete ? (
    <h2>Your Cart is Empty</h2>
  ) : (
    <>
      <h2>Order Complete!</h2>
      <p>Your order has been placed successfully</p>
    </>
  );
}
