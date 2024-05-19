import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Container className="blockquote my-md-5 my-4 about-container">
        <h1 className="about-title mb-md-5 mb-4">Welcome to your library!</h1>
        <p className="about-text">
          The Bookest is the ultimate destination for book lovers everywhere! As
          an avid reader and book enthusiast, I created The Bookest to share my
          passion for literature and make it easy for you to find the books
          you're looking for.
        </p>
        <p className="">
          <span className="bullet ">• </span>Don't Get Confused with Your
          Books
        </p>
        <p className="about-text">
          One of the most exciting features of this website is the ability to
          create your own library of books. You can track your reading journey
          and keep a record of the books you've read, plan to read, and those
          you've taken notes on.
        </p>
        <p className="about-text">
          Whether you're searching for the latest bestsellers, timeless
          classics, or hidden gems, user-friendly interface lets you search
          by genre, author, title, or any other keyword to find your next
          favorite read. You'll have access to an extensive collection of books
          in all genres, with a bestsellers section that's constantly updated
          with the latest and most popular books.
        </p>
        <p>
          <span className="bullet">• </span>No Need for a Pen or Paper
        </p>
        <p className="about-text">
          I know that many readers like to take notes while they're reading,
          whether it's to jot down their thoughts or to remember important
          details. That's why I've created a tool that lets you take notes right
          on this site, without the need for a pen or paper. With the
          note-taking tool, you can write notes for any book you're reading and
          save them to your "books with notes" shelf. This makes it easy to go
          back and reference your thoughts and observations about a book.
        </p>
        <p className="about-text">
          At The Bookest, my goal is to make the reading experience as enjoyable
          and seamless as possible. Whether you're a lifelong book lover or just
          getting started, I hope you'll find The Bookest to be a valuable
          resource and a fun place to explore. Happy reading!
        </p>
      </Container>
    </>
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
