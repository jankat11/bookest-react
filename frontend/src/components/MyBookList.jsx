import defaultImage from "../assets/nocover.png";
import MyBookItem from "../components/MyBookItem";
import { Image } from "react-bootstrap";

const MyBookList = ({ userBooks, shelf }) => {
  const shelfTitle =
    shelf === "noted_books"
      ? "Books with Notes"
      : shelf.replaceAll("_", " ") === "will be read"
      ? "To Be Read"
      : "Finished Reading";
  const books = userBooks?.[shelf] || [];

  return (
    <section className="shelf-container shelf-panel my-4">
      <div className="shelf-heading">
        <p className="my-0 blockquote shelf-title">{shelfTitle}</p>
        <span className="shelf-count">{books.length}</span>
      </div>
      <div className="shelf-grid">
        {books.length ? (
          books.map((book, i) => (
            <MyBookItem
              key={i}
              title={book.title}
              noCover={book.cover}
              bookId={book.id}
            />
          ))
        ) : (
          <div className="empty-shelf">
            <Image className="defaultImage empty-shelf-image" src={defaultImage} />
            <span>No books yet</span>
          </div>
        )}
      </div>
    </section>
  );
};
export default MyBookList;
