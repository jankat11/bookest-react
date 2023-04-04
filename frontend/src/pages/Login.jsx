import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice/userSlice";

const Login = () => {
  const navigate = useNavigate("/");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUser()).then((data) => console.log(data.meta.requestStatus));
  };

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <input className="btn btn-info" type="submit" />
      </Form>

      <h1>{user.user?.user}</h1>
      <h1>{user.user?.email}</h1>
    </div>
  );
};

export default Login;
