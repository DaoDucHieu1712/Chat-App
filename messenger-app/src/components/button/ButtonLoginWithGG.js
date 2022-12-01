import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase-app/firebase-config";

const googleProvider = new GoogleAuthProvider();
const userRef = collection(db, "users");
const ButtonLoginWithGG = () => {
  const navigate = useNavigate();

  const handleLoginWithGoogle = () => {
    console.log("Login with google");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Accounts successfully linked.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user, result);
        if (result._tokenResponse.isNewUser) {
          addDoc(userRef, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        }
        toast("Login successful !!!!");
        navigate("/box/q");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="btn-log w-full flex items-center mx-auto gap-x-2 p-3 border border-gray-300 hover:bg-gray-100 cursor-pointer">
      <div
        onClick={handleLoginWithGoogle}
        className="mx-auto flex flex-items gap-x-2"
      >
        <span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <svg clipPath="url(#clip0_17_40)">
              <path
                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                fill="#4285F4"
              />
              <path
                d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                fill="#34A853"
              />
              <path
                d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                fill="#FBBC04"
              />
              <path
                d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                fill="#EA4335"
              />
            </svg>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        <span>Log in with Google</span>
      </div>
    </div>
  );
};

export default ButtonLoginWithGG;
