import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "../features/userBooksSlice/userBooksSlice";
import { useEffect } from "react";
import { Container, Button, Spinner, Row, Col, Image } from "react-bootstrap";
import { getImageUrl } from "../utils";
import { Link } from "react-router-dom";

const MyBooks = () => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((store) => store.user);
  const { userBooks } = useSelector((store) => store.userBooks);

  useEffect(() => {
    if (!userBooks) dispatch(getBooks({ token }));
  }, []);

  /* useEffect(() => {
    
  }, [userBooks]) */

  return (
    <>
      <p className="my-3 display-6">will be read</p>
      <div className="d-flex flex-wrap">
        {userBooks?.will_be_read?.map((book, i) => (
          <Link to={`/book/${book.id}`} key={i}>
            <Image className="w-100 h-100" src={getImageUrl(book.id)} />
          </Link>
        ))}
      </div>
      <p className="my-3 mt-5 display-6">has been read</p>
      <div className="d-flex flex-wrap">
        {userBooks?.has_been_read?.map((book, i) => (
          <Link to={`/book/${book.id}`} key={i}>
            <Image src={getImageUrl(book.id)} />
          </Link> 
        ))}
      </div>
    </>
  );
};
export default MyBooks;
