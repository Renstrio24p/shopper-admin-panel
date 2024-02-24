import { Outlet } from "react-router-dom";
import { Props } from "./types/Layout";
import Navbar from "../../components/Navbar/Navbar";

export default function Layout({}: Props) {
  return (
    <div className="layout">
        <Navbar />
        <Outlet />
    </div>
  )
}