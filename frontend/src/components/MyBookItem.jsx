import defaultImage from "../assets/nocover.png";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils";

const MyBookItem = ({ noCover, bookId, title }) => {
  return (
    <Link className="shelf-book-link" to={`/book/${bookId}`}>
      <span className="shelf-book">
        {noCover && (
          <span className="shelf-book-fallback-title">
            <p>{title}</p>
          </span>
        )}
        <Image
          className={`shelf-book-image ${noCover ? "opacity-50" : ""}`}
          src={!noCover ? getImageUrl(bookId) : defaultImage}
        />
      </span>
    </Link>
  );
};
export default MyBookItem;
