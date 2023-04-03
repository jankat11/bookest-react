import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/UI/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails";
import BookList from "./components/BookList";

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
            element: <BookList />,
          },
        ],
      },
      { path: "/about", element: <h1>about page</h1> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/book/:bookISBN", element: <BookDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
