import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "../features/userBooksSlice/userBooksSlice";
import { useEffect } from "react";
import MyBookList from "../components/MyBookList";
import LoadingSpinner from "../components/UI/Spinner";
import AlertMessage from "../components/UI/Alert";
import UpArrow from "../components/UpArrow";

const MyBooks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { userBooks, isBooksLoading, errorMessage } = useSelector(
    (store) => store.userBooks
  );

  useEffect(() => {
    if (!userBooks) dispatch(getBooks(user));
  }, []);

  return (
    <>
      {!isBooksLoading ? (
        !errorMessage ? (
          <section className="smoothLittle mb-3 d-flex flex-column align-items-center w-100">
            <div>
              <MyBookList userBooks={userBooks} shelf="will_be_read" />
              <MyBookList userBooks={userBooks} shelf="has_been_read" />
              <MyBookList userBooks={userBooks} shelf="noted_books" />
            </div>
          </section>
        ) : (
          <AlertMessage
            variant={"danger"}
            message={errorMessage}
            title="Something went wrong!"
          />
        )
      ) : (
        <LoadingSpinner />
      )}
      <UpArrow />
    </>
  );
};
export default MyBooks;
