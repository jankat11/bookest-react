import { useEffect, useState } from "react";
import axios from "axios"

const URL = "https://bookest.up.railway.app/api"

const Login = () => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    const {data} = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      }
    })
    console.log(data);
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, []);

  return <div>
    <h1>{user.user}</h1>
    <h1>{user.email}</h1>
    </div>;
};
export default Login;
