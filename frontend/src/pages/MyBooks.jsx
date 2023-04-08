import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "../features/userBooksSlice/userBooksSlice";
import { useEffect } from "react";
import { Container, Button, Spinner, Row, Col, Image } from "react-bootstrap";
import { getImageUrl } from "../utils";
import { Link } from "react-router-dom";

const MyBooks = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((store) => store.user);
  const { userBooks } = useSelector((store) => store.userBooks);

  useEffect(() => {
    if (!userBooks) dispatch(getBooks(user));
  }, []);

  return (
    <div className="smooth">
      <p className="my-3 display-6 shelfItem">will be read</p>
      <div className="d-flex flex-wrap container shelfItem">
        {userBooks?.will_be_read?.map((book, i) => (
          <Link to={`/book/${book.id}`} key={i}>
            <Image style={{width: "100px"}} src={getImageUrl(book.id)} />
          </Link>
        ))}
      </div>
      <p className="my-3 mt-5 display-6 shelfItem">has been read</p>
      <div className="d-flex flex-wrap container shelfItem">
        {userBooks?.has_been_read?.map((book, i) => (
          <Link to={`/book/${book.id}`} key={i}>
            <Image style={{width: "100px"}} src={getImageUrl(book.id)} />
          </Link> 
        ))}
      </div>
    </div>
  );
};
export default MyBooks;
