import defaultImage from "../assets/nocover.png"
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils";

const MyBookItem = ({noCover, bookId, title}) => {
  return (
    <Link to={`/book/${bookId}`} >
      <span style={{ position: "relative" }}>
        {noCover && (
          <span className="position-absolute d-flex py-5 justify-content-center w-100">
            <p className="text-primary opacity-75">{title}</p>
          </span>
        )}
        <Image
          style={{ width: "100px" }}
          className={`${noCover && "opacity-50"}`}
          src={!noCover ? getImageUrl(bookId) : defaultImage}
        />
      </span>
    </Link>
  );
};
export default MyBookItem;
