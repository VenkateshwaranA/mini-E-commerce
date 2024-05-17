import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function ProductDetails({ cartItems, setCartItems }) {
  const [singleProduct, setSingleProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_PRODUCT_API_URL + "product/" + id)
      .then((data) => data.json())
      .then((data) => setSingleProduct(data.product));
  }, []);

  const addToCart = () => {
    const itemdExsit = cartItems.find(
      (item) => item.singleProduct._id == singleProduct._id
    );
    if (!itemdExsit) {
      const netItem = { singleProduct, qty };
      setCartItems((state) => [...state, netItem]);
      toast.success("Product added successfully");
    }
  };
  const addQty = () => {
    if (singleProduct.stock == qty) {
      return;
    }
    setQty((state) => state + 1);
  };
  const decreaseQty = () => {
    if (qty > 1) {
      setQty((state) => state - 1);
    }
  };
  return (
    singleProduct && (
      <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={singleProduct.images[0].image}
              alt="sdf"
              height="500"
              width="500"
            />
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{singleProduct.name}</h3>
            <p id="product_id">Product # {singleProduct._id}</p>

            <hr />

            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{
                  width: `${(singleProduct.ratings / 5) * 100}%`,
                }}
              ></div>
            </div>

            <hr />

            <p id="product_price">${singleProduct.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQty}>
                -
              </span>

              <input
                type="number"
                className="form-control count d-inline"
                value={qty}
                readOnly
              />

              <span className="btn btn-primary plus" onClick={addQty}>
                +
              </span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              onClick={addToCart}
              disabled={singleProduct.stock == 0}
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status:
              <span
                id="stock_status"
                style={{
                  color: singleProduct.stock == 0 ? "red" : "green",
                }}
              >
                {singleProduct.stock == 0 ? "Outof stock" : "In stock"}
              </span>
            </p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>{singleProduct.description}</p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>{singleProduct.seller}</strong>
            </p>

            <div className="rating w-50"></div>
          </div>
        </div>
      </div>
    )
  );
}
