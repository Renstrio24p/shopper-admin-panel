import { ChangeEvent, useState } from "react";
import { Product, Props } from "./types/AddProduct";
import { images } from "../assets/images";
import "./AddProduct.css";

export default function AddProduct({}: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "men",
    new_price: 0,
    old_price: 0,
  });

  const sanitizeInput = (input: string): string => {
    return input.replace(/<[^>]*>?/gm, ''); 
  };

  const imageHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductDetails(prevState => ({
      ...prevState,
      [e.target.name]: sanitizeInput(e.target.value),
    }));
  };

  const categoryChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    setProductDetails(prevState => ({
      ...prevState,
      [e.target.name]: sanitizeInput(e.target.value),
    }));
  };

  const add_product = async () => {
    console.log(productDetails);
    let product = { ...productDetails };
    let responseData: Product[] = [];

    let formData = new FormData();
    if (image) {
      formData.append("product", image);
    }

    

    await fetch("https://ecommerce-backend-7fnr0mqga-renstrio24p.vercel.app/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res: Response) => res.json())
      .then((data: any) => {
        responseData.push(data);
        if (responseData && responseData[0].success) {
          product.image = responseData[0].img_url;
          console.log(product);
          console.log(responseData[0]);

        }
      });

      if(responseData[0].success){
         await fetch('https://ecommerce-backend-7fnr0mqga-renstrio24p.vercel.app/addproduct',({
            method: 'POST',
            headers: {
               Accept: 'application/json',
                'Content-Type':'application/json',
              },
              body: JSON.stringify(product)
         })).then((res: Response) => res.json()).then((data: any)=>{
             data.success ? alert('Offline Product Added') : alert('Failed')
         })
      }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="$0"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="$0"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          name="category"
          className="add-product-selector"
          onChange={categoryChangeHandler}
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : images.upload_area}
            className="addproduct-thumbnail-img"
            alt="upload"
          />
          <input
            value={productDetails.image}
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </label>
      </div>
      <button onClick={add_product} className="addproduct-btn">
        Add
      </button>
    </div>
  );
}
