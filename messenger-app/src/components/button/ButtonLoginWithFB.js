import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase-app/firebase-config";

const fbProvider = new FacebookAuthProvider();
const userRef = collection(db, "users");

const ButtonLoginWithFB = () => {
  const navigate = useNavigate();

  const handleLoginWithFacebook = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(user, result);
        if (result._tokenResponse.isNewUser) {
          addDoc(userRef, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        }
        toast("Login successful !!!!");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        toast.error(
          "Email aleardy exist , please choose another email !!!! <3"
        );
        console.log(error.message);
      });
  };

  return (
    <div className="btn-log w-full flex items-center mx-auto gap-x-2 p-3 border border-gray-300 hover:bg-gray-100 cursor-pointer">
      <div
        onClick={handleLoginWithFacebook}
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
            <g clipPath="url(#clip0_17_24)">
              <path
                d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z"
                fill="#1877F2"
              />
              <path
                d="M33.3422 30.9375L34.4062 24H27.75V19.5C27.75 17.602 28.68 15.75 31.6613 15.75H34.6875V9.84375C34.6875 9.84375 31.9411 9.375 29.3152 9.375C23.8331 9.375 20.25 12.6975 20.25 18.7125V24H14.1562V30.9375H20.25V47.7084C22.7349 48.0972 25.2651 48.0972 27.75 47.7084V30.9375H33.3422Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_17_24">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        <span>Log in with Facebook</span>
      </div>
    </div>
  );
};

export default ButtonLoginWithFB;
