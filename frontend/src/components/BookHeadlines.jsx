import { Container } from "react-bootstrap";


const BookHeadlines = ({book}) => {
  return (
    <Container className="mx-3">
      <p>
        {book?.authors?.map((author, index, authorsArr) => (
          <li className="list-unstyled" key={index}>
            {author}
            {index !== authorsArr.length - 1 && ","}
          </li>
        ))}
      </p>
      <p className="text-smaller">published: {book?.publishedDate?.slice(0,4)}</p>
      <p>{book?.categories}</p>
    </Container>
  );
};
export default BookHeadlines;
