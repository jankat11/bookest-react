import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/UI/Layout";
import Login from "./pages/Login";
import BookDetails from "./pages/BookDetails";
import BookList from "./components/BookList";
import MyPage from "./pages/MyBooks";
import About from "./pages/About";

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
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/mybooks", element: <MyPage /> },
      { path: "/book/:bookISBN", element: <BookDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
