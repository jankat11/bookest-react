import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../features/bookSlice/bookSlice";
import { bookActions } from "../features/bookSlice/bookSlice";
import { Container } from "react-bootstrap";
import LoadingSpinner from "../components/UI/Spinner";
import AlertMessage from "../components/UI/Alert";

const BookDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { book, isLoading, isError, message } = useSelector((store) => store.book);
  const { setBookEmpty } = bookActions;

  useEffect(() => {
    dispatch(getBook(params.bookISBN));
    return () => {
      dispatch(setBookEmpty());
    };
  }, [dispatch]);

  if (isError) {
    return (
      <AlertMessage
        variant={"danger"}
        message={message}
        title="Something went wrong!"
      />
    );
  }

  return (
    <>
      {!isLoading ? (
        <img src={book?.volumeInfo?.imageLinks.thumbnail} alt="" />
      ) : (
        <Container className="d-flex justify-content-center w-100 h-100">
          <LoadingSpinner variant={"primary"} size={"xl"} />
        </Container>
      )}
    </>
  );
};
export default BookDetails;
