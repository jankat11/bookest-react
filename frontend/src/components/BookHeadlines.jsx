import { Container, Col, Image } from "react-bootstrap";
import { useRef, useEffect } from "react";
import defaultImage from "../assets/nocover.png";

const imageDesignHeight = 195; // 12.18rem * 16 -> 13 * 16px

const BookHeadlines = ({ book, show, setShow }) => {
  const imageRef = useRef();

  useEffect(() => {
    if (imageRef?.current?.offsetHeight === imageDesignHeight) {
      setShow(true);
    }
  }, [imageRef?.current?.offsetHeight, imageRef?.current?.offsetWidth, show]);

  return (
    <>
      <p className="display-6">
      <strong>{book?.volumeInfo?.title}</strong>
        </p>
        <Col className="d-flex w-100 mt-3 " sm={12}>
      <span style={{ width: "128px", height: "195px" }}>
        <Image
          className="detailImage"
          ref={imageRef}
          src={
            book?.volumeInfo?.imageLinks?.thumbnail || defaultImage
          }
        />
      </span>
        <Container className="mx-3">
          <p>
            {book?.volumeInfo?.authors?.map((author, index, authorsArr) => (
              <li className="list-unstyled" key={index}>
                {author}
                {index !== authorsArr.length - 1 && ","}
              </li>
            ))}
          </p>
          <p className="text-smaller">
            published: {book?.volumeInfo?.publishedDate?.slice(0, 4)}
          </p>
          <p>{book?.volumeInfo?.categories?.slice(0, 1)}</p>
        </Container>
      </Col>
    </>
  );
};
export default BookHeadlines;
