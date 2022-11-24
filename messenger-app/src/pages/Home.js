import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { auth } from "../firebase-app/firebase-config";

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const handleSignOut = () => {
    signOut(auth);
    navigate("/sign-in");
  };

  return (
    <div>
      <button onClick={handleSignOut}>Logout</button>
      <h1>{userInfo.displayName}</h1>
      <img src={userInfo.photoURL} alt="" />
    </div>
  );
};

export default Home;
