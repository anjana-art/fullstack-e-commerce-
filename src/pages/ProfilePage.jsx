import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfileNav from "../components/ProfileNav";

const ProfilePage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

   if (!ready) {
    return "Loading...";
  }
   
  if (ready && !user) {
    return <Navigate to={"/api/users/login"}></Navigate>;
  }

  async function logout() {
    await axios.post("/api/users/logout");
    setRedirect(true);
    setUser("");
  }

  if (redirect) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <div>
     <ProfileNav/>
      <div className="text-center mt-10 ">
        <h1>Profile page</h1>
        <div>
          <h3>
            User First Name:<p>{user.firstName}</p>
          </h3>
        </div>
        <div>
          <h3>
            User Last Name:<p>{user.lastName}</p>
          </h3>
        </div>
        <div>
          <h3>
            User Email :<p>{user.email}</p>
          </h3>
        </div>
        <div>
          <h3>
            User ID:<p>{user._id}</p>
          </h3>
        </div>
      </div>
      <div className="flex justify-center ">
        <button
          onClick={logout}
          className="py-2 px-6 bg-gray text-black bg-gray-300 rounded-full mt-9"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
