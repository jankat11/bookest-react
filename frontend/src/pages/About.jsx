import { useState, useEffect } from 'react';
import GoogleButton from 'react-google-button';

const GOOGLE_CLIENT_ID = 'your-google-client-id';

function Login() {
  const [error, setError] = useState(null);

  const handleGoogleResponse = (response) => {
    const token = response.tokenId;
    const data = new FormData();
    data.append('token', token);
    fetch('/api/auth/google/callback/', {
      method: 'POST',
      body: data
    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem('token', data.token);
      // Redirect the user to the dashboard or homepage
    }).catch((error) => {
      setError(error);
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => {
      const gapi = window.gapi;
      gapi.load('auth2', function () {
        gapi.auth2.init({
          client_id: GOOGLE_CLIENT_ID
        });
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <GoogleButton
        onClick={() => {
          const gapi = window.gapi;
          if (gapi && gapi.auth2) {
            gapi.auth2.getAuthInstance().signIn().then(handleGoogleResponse);
          } else {
            setError(new Error('Google API client library not loaded.'));
          }
        }}
      />
      {error && (
        <div style={{ color: 'red' }}>
          {error.message || 'Something went wrong.'}
        </div>
      )}
    </div>
  );
}

export default Login;




































/* import React from 'react';
import { GoogleLogin } from 'react-oauth/google';

const GOOGLE_CLIENT_ID = 'your-google-client-id';

function Login() {

  const handleGoogleResponse = (response) => {
    const accessToken = response.accessToken;
    fetch('/api/auth/google/callback/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: accessToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        // Redirect the user to the dashboard or homepage
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={handleGoogleResponse}
        onFailure={(error) => console.error(error)}
      />
    </div>
  );
}

export default Login; */





















































/* import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'react-bootstrap';




const GoogleLoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log("respnse is :", tokenResponse),
    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
  });

  const onSuccess = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    console.log(user);
  };

  const onFailure = (error) => {
    console.log(error);
    // Handle the error
  };

  const config = {
    clientId: '567487559274-4kmrb337m167lvpsc9j7ja89lm1rkek9.apps.googleusercontent.com',
    redirectUri: "http://127.0.0.1:8000/api/auth/google/callback/",
    scope: 'email',
  };

  return (
    <>
      <Button onClick={() => login()}>login</Button>
      {!isLoggedIn ? (
        <GoogleLogin
          config={config}
          onSuccess={onSuccess}
          onFailure={onFailure}
          render={(renderProps) => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
              Login with Google
            </button>
          )}
        />
      ) : (
        <div>
          <p>You have successfully logged in with Google!</p>
          <p>User: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </>
  );
};

export default GoogleLoginButton;
 */
















































/* import { Container, Image, Button } from "react-bootstrap";
import axios from "axios";

const About = () => {
  const handleRequest = async () => {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/auth/convert-token/",
      {
        "client_id": "client_id",
        "grant_type": "convert_token",
        "client_secret": "client_secret",
        "backend": "google-oauth2",
        "token" : "ya29.a0Ael9sCP4cDIDN81dWirJv506cTFjy1To72TCqCvtUMxA7AARWQr1zWqUrCE-i5Y-KJ9KxV9lIQPjwcRySqMJ3WlxxlKmal0shD_Inc-GKqbRLVItvvMfNOls0Z4rkmIob-iyc1-sXPQqSt7z1s0tmKYttGckwtwaCgYKAZgSARASFQF4udJhmscawWYSmxCDsvL5aaqN7w0166"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("data is: ", data);
  };

  return (
    <div>
      <Button onClick={handleRequest} >send google request </Button>
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
export default About; */




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