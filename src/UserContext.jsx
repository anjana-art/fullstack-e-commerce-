import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState('');
  const [ready, setReady]= useState(false);

  useEffect(() => {
    if (!user) {
       axios.get("/api/users/profile").then(({data})=>{
           setUser(data);
           setReady(true);
           console.log("settinUser", data);

      });
    }
  
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
