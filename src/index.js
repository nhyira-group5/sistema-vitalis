import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import RootRoute from "./routes/Root.jsx";
import ErrorPage from "./error-page.jsx";
import LoginRoute from "./routes/LoginRoute.jsx";

const router = createBrowserRouter([
    {
      path: "/",
      element: <RootRoute />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login/:tipo",
      element: <LoginRoute />,
      errorElement: <ErrorPage />,
    },
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)