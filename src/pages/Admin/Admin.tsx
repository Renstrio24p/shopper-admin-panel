import { Props } from "./types/Admin";
import './Admin.css'
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Admin({}: Props) {

  return (
    <div className="admin">
        <Sidebar />
        <Outlet />
    </div>
  )

}