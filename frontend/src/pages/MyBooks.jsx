import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "../features/userBooksSlice/userBooksSlice";
import { useEffect } from "react";
import MyBookList from "../components/MyBookList";

const MyBooks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { userBooks } = useSelector((store) => store.userBooks);

  useEffect(() => {
    if (!userBooks) dispatch(getBooks(user));
  }, []);

  return (
    <div className="smoothLittle">
      <MyBookList userBooks={userBooks} shelf="will_be_read" />
      <MyBookList userBooks={userBooks} shelf="has_been_read" />
      
    </div>
  );
};
export default MyBooks;
