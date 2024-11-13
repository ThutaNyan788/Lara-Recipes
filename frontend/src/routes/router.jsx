import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import CreatePage from "../pages/CreatePage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Details from "../pages/Details";
import EditPage from "../pages/EditPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path:"/register",
                element: <Register />
            },
            {
                path:"/login",
                element: <Login />
            },
            {
                path:"/recipes/:id",
                element:<Details/>
            },
            {
                path:"/recipes/:id/edit",
                element:<EditPage/>
            }
           
        ],

    },
    {
        path: "/createPage",
        element: <CreatePage />
    }
]);



export default function RouteProvide() {
    return (
        <RouterProvider router={router} />
    )
}