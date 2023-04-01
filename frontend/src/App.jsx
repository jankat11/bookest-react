import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/UI/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails";
import BookList from "./components/BookList";
import { loader as bookLoader } from "./components/BookList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            index: true,
            loader: bookLoader,
            errorElement: <h1>THIS WILL BE ERROR PAGE</h1>,
            element: <BookList />,
          },
        ],
      },
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
