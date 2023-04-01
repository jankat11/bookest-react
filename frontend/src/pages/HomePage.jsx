import React from "react";
import BookList from "../components/BookList";

const HomePage = () => {
  return (
    <>
      <p className="display-6 px-2">BESTSELLER:</p>
      <BookList />
    </>
  );
};
export default HomePage;
