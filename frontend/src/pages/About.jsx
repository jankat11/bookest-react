
import { Container, Image, Button } from "react-bootstrap";



const About = () => {

  return (
    <div>
      <Container className="blockquote my-3">
        <p className="display-6">Welcome to your humble library</p>
        <p>
          THE BOOKEST is the ultimate destination for book lovers everywhere! As
          an avid reader and book enthusiast, I created THE BOOKEST to share my
          passion for literature and make it easy for you to find the books
          you're looking for.
        </p>
        <p>
          Whether you're searching for the latest bestsellers, timeless
          classics, or hidden gems, my user-friendly interface lets you search
          by genre, author, title, or any other keyword to find your next
          favorite read. You'll have access to an extensive collection of books
          in all genres, with a bestsellers section that's constantly updated
          with the latest and most popular books.
        </p>
        <p className="display-6">Don't Get Confused with Your Books</p>
        <p>
          One of the most exciting features of my website is the ability to
          create your own library of books. You can track your reading journey
          and keep a record of the books you've read, plan to read, and those
          you've taken notes on.
        </p>
        <p className="display-6">No Need for a Pen or Paper</p>
        <p>
          I know that many readers like to take notes while they're reading,
          whether it's to jot down their thoughts or to remember important
          details. That's why I've created a tool that lets you take notes right
          on my website, without the need for a pen or paper. With the
          note-taking tool, you can write notes for any book you're reading and
          save them to your "books with notes" shelf. This makes it easy to go
          back and reference your thoughts and observations about a book.
        </p>
        <p>
          At THE BOOKEST, my goal is to make the reading experience as enjoyable
          and seamless as possible. Whether you're a lifelong book lover or just
          getting started, I hope you'll find my website to be a valuable
          resource and a fun place to explore. Happy reading!
        </p>
      </Container>
    </div>
  );
};
export default About; 

/* import FbLogin from "react-facebook-login";


const responseFacebook = (response) => {
  console.log(response);
}


const About = () => {
  return (
    <div>
      <FbLogin
        appId="742581190893537"
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
};
export default About; */
