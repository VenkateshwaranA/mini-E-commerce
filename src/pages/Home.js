import React, { Fragment, useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
console.log("search", search);

  useEffect(() => {
    fetch(process.env.REACT_APP_PRODUCT_API_URL + "products?" + search)
      .then((data) => data.json())
      .then((data) => setProducts(data.products));
  }, [search]);
  console.log("prrrr", products);
  return (
    <Fragment>
      <h1 id="products_heading">Latest Products</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {products.map((x) => (
            <ProductCard product={x} />
          ))}
        </div>
      </section>
    </Fragment>
  );
}
