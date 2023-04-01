import React from "react";
import BookList from "../components/BookList";
import axios from "axios";

const BASE_URL = "http://localhost:3000/books";

const HomePage = () => {
  
  return (
    <>
      <p className="display-6 px-2">BESTSELLER:</p>
      <BookList />
    </>
  );
};
export default HomePage;

export const loader = async () => {
  const {data} = await axios.get(BASE_URL)
  return data
}
