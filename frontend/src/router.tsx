import { RouteObject, Navigate } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SidebarLayout from "./layouts/SidebarLayout";
import UserSettings from "./pages/UserSettings";
import useNetworkStatus from "./hooks/useNetworkStatus";
import Error from "./pages/Error";
import Maintaince from "./pages/Error/Maintaince";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import HomePage from "./pages/home";
import EcoLabelPage from "./pages/eco-label";
import QuickPathPage from "./pages/quick-path";
import InventoryOptimizerPage from "./pages/inventory-optimizer";

function Route(isLogined: true | false) {
  const isOnline = useNetworkStatus();
  const routes: RouteObject[] = [
    {
      path: "auth",
      element: isLogined ? <Navigate to={"/"} /> : <BaseLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password/:token",
          element: <ResetPassword />,
        }
      ],
    },
    {
      path: "/",
      element: isLogined ? <SidebarLayout /> : <Navigate to="/auth/login" />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          
        },
        {
          path: "setting",
          children: [
            {
              path: "personal-info",
              element: <UserSettings />,
            },
            {
              path: "security",
              element: <UserSettings />,
            }
          ]
        },
        {
          path: "eco-label-verifier",
          element:<EcoLabelPage/>
        },
        {
          path: "quick-path",
          element:<QuickPathPage/>
        },
        {
          path: "inventory-optimizer",
          element:<InventoryOptimizerPage/>
        }
      ],
    },
    {
      path: "*",
      element: <BaseLayout children={<Error />}/>,
    },
    {
      path: "/Maintaince",
      element: <BaseLayout children={<Maintaince />}/>,
    },
  ];
  if (!isOnline) {
    return [
      {
        path: "*",
        element: <Maintaince />,
      },
    ];
  }
  return routes;
}
export default Route;
