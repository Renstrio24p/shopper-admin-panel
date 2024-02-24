import { Props } from "./types/Navbar";
import './Navbar.css'
import { images } from "../assets/images";

export default function Navbar({}: Props) {
  return (
    <div className="navbar">
        <img className="nav-logo" src={images.nav_logo} alt="nav logo" />
        <img className="nav-profile" src={images.nav_profile} alt="nav profile logo" />
    </div>
  )
}