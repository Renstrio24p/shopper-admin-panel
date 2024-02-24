import { Props } from "./types/Sidebar";
import './Sidebar.css'
import { Link } from "react-router-dom";
import { images } from "../assets/images";

export default function Sidebar({}: Props) {
  return (
    <div className="sidebar">
        <Link to={'/addproduct'}>
            <div className="sidebar-item">
                <img src={images.product_cart} alt="add icon" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproduct'}>
            <div className="sidebar-item">
                <img src={images.product_list_icon} alt="list icon" />
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}