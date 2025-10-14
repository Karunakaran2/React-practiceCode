import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

function Home() {
  const { user } = useContext(AppContext);

  if (!user) {
    return <p className="text-danger"> Your not logged in</p>;
  }
  return (
    <div>
      <p>
        Welcome, <span>{user.name}</span>
      </p>
      <p>Successfully Logged In</p>
    </div>
  );
}

export default Home;
