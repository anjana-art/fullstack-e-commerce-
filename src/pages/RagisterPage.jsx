import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

const RagisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);


 
   
  const ragisterUser = async(e)=>{
    e.preventDefault();
   
    try{
     await axios.post('/api/users/register', {
        firstName,
        lastName,
        email,
        password,
      });
      alert('Successful Ragistration. Now you can log in.');

      setRedirect(true);

      
    }catch(err){
 alert('Ragistration failed. Please try again.')
 console.log(err);
    }
  }
  
  if (redirect) {
    return <Navigate to={"/api/users/login"}></Navigate>;
  }
   

  return (
    <div className="flex items-center  justify-around grow mt-4  ">
      <div className="mb-64">
        <h1 className="text-4xl text-center m-4">Ragister</h1>
        <form className="mx-auto mt-5 max-w-md " onSubmit={ragisterUser}>
          <input
            type="text"
            placeholder=" first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
           <input
            type="text"
            placeholder=" last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Submit</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?
            <Link className="underline text-black" to="/api/users/login">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RagisterPage;
