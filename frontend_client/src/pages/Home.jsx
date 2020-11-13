import React from "react";

const Home = ({ user, history }) => {
  return (
    <div>
      <h1>Hello from the home {user.email} </h1>
    </div>
  );
};

export default Home;
