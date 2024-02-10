import defaultImage from "../assets/nocover.png";
import MyBookItem from "../components/MyBookItem";
import { Image } from "react-bootstrap";

const MyBookList = ({ userBooks, shelf }) => {
  return (

      <section className="shelf-container my-5">
        <p className="my-3 blockquote shelfItem">
          {shelf === "noted_books"
            ? "with notes"
            : shelf.replaceAll("_", " ")}{" "}
          ({userBooks ? userBooks[shelf]?.length : 0})
        </p>
        <div
          style={{ minHeight: "100px" }}
          className="d-flex flex-wrap container shelfItem"
        >
          {userBooks && userBooks[shelf].length ? (
            userBooks[shelf].map((book, i) => (
              <MyBookItem
                key={i}
                title={book.title}
                noCover={book.cover}
                bookId={book.id}
              />
            ))
          ) : (
            <Image className="defaultImage" width={100} src={defaultImage} />
          )}
        </div>
      </section>
  );
};
export default MyBookList;
