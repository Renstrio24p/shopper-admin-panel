import { Product, Props } from "./types/ListProduct";
import "./ListProduct.css";
import { useEffect, useState } from "react";
import { images } from "../assets/images";

export default function ListProduct({}: Props) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5100/allofflineproducts");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      setError((error as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5100/removeofflineproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ id })
      });
      if (!response.ok) {
        throw new Error("Failed to remove product");
      }
      await fetchInfo();
    } catch (error) {
      setError((error as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {allProducts.map((product, i) => (
          <div key={i} className="listproduct-format-main listproduct-format">
            <img className="listproduct-product-icon" src={product.image} alt="product image" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img
              className="listproduct-remove-icon"
              src={images.cross_icon}
              alt="remove icon"
              onClick={() => removeProduct(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
