import { createBrowserRouter } from "react-router-dom";
import Layout from "../../pages/Layouts/Layout";
import Admin from "../../pages/Admin/Admin";
import Error from "./error/ErrorElement";
import NotFound from "../../pages/404/NotFound";
import AddProduct from "../AddProduct/AddProduct";
import ListProduct from "../ListProduct/ListProduct";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Admin />,
                errorElement: <Error />,
                children: [ 
                    {
                        path: 'addproduct',
                        element: <AddProduct />,
                        errorElement: <Error />
                    },
                    {
                        path: 'listproduct',
                        element: <ListProduct />,
                        errorElement: <Error />
                    },
                ]
            },
            {
                path: '*',
                element: <NotFound />,
                errorElement: <Error />
            }
        ]
    },
])

export const router_admin = createBrowserRouter([
    {
        path: '/AddProducts',
        element: <AddProduct />,
        errorElement: <Error />
    }
])