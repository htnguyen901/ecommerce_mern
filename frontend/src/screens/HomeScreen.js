import "./HomeScreen.css";
import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Product from '../components/Product';

//Actions
import { getProducts as listProducts } from "../redux/actions/productActionss";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { loading, error } = getProducts;
  const { products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Explore Our Latest Products</h2>
      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          //console.log(products)
          products.map((product) => (
            <Product
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              fileName={product.fileName}
              productId={product._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;