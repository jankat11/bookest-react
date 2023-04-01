import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, {loader as bookLoader} from "./pages/HomePage";
import Layout from "./components/UI/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>THIS WILL BE ERROR PAGE</h1>,
    children: [
      { index: true, element: <HomePage />, loader: bookLoader},
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/book", element: <BookDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
