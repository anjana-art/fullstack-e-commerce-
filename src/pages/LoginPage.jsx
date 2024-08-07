import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function userLogin(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post("/api/users/login", { email, password });
      alert("Successful Login!!");
      console.log('user info:',data);
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.log(error);
      alert("login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <div className="flex items-center  justify-around grow mt-4  ">
      <div className="mb-64">
        <h1 className="text-4xl text-center m-4">Login</h1>
        <form className="mx-auto mt-5 max-w-md " onSubmit={userLogin}>
          <input
            type="email"
            placeholder="your@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have account yet?
            <Link className="underline text-black" to="/api/users/register">
              Ragister here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
