import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../firebase-app/firebase-config";
import { addDoc, collection } from "firebase/firestore";

const SignInPageStyles = styled.div`
  width: 1180px;
  height: 750px;
  margin: 100px auto;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 35px;
    border: 1px solid #eee;
    border-radius: 1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    &-left {
      width: 50%;
    }
    &-right {
      width: 50%;
    }
  }
  .heading-page {
    padding-left: 50px;
    font-weight: 600;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.primary};
  }

  .form {
    padding: 50px;
    width: 100%;
  }

  .field {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    gap: 10px;
    label {
      color: ${(props) => props.theme.blackMain};
      font-weight: 500;
    }
    input {
      width: 100%;
      padding: 12px;
      border: 1px solid ${(props) => props.theme.gray2};

      &:focus {
        border: 1px solid ${(props) => props.theme.primary};
      }
    }
    button {
      width: 100%;
      background-color: ${(props) => props.theme.primary};
      color: #fff;
      padding: 13px;
      font-weight: 500;
      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

const schema = yup.object({}).required();

const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const userRef = collection(db, "users");

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth);
  }, []);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmitSignIn = (values) => {
    console.log(values);
  };

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
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const handleLoginWithGoogle = async () => {
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
        navigate("/");
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
    <SignInPageStyles>
      <div className="container">
        <div className="container-left">
          <div className="heading-page">
            <svg
              viewBox="0 0 36 36"
              class="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0"
              fill="currentColor"
              height="38"
              width="38"
            >
              <path
                clipRule="evenodd"
                d="M29 17.504c0 6.103-4.606 10.57-11 10.57-1.065 0-2.08-.095-3.032-.327a4.26 4.26 0 00-2.39.09L8.91 28.962c-.59.202-1.164-.372-.964-.985l.729-2.411a3.007 3.007 0 00-.291-2.5C7.414 21.484 7 19.596 7 17.504v-.002c0-6.103 4.607-10.498 11-10.498s11 4.395 11 10.498v.002z"
                fillRule="evenodd"
              ></path>
            </svg>
            <h1>Messenger App</h1>
          </div>
          <form
            action=""
            className="form"
            onSubmit={handleSubmit(onSubmitSignIn)}
          >
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                {...register("email")}
                placeholder="Enter your email ... "
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                {...register("password")}
                placeholder="Enter your password ... "
              />
            </div>
            <div className="field">
              <button type="submit" className="btn">
                Sign in
              </button>
            </div>
            <div className="field">
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
            </div>
            <div className="forgot">
              <p className="text-center">
                Don't have account ?{" "}
                <NavLink to="/sign-up" className="text-blue-500 font-semibold">
                  Sign up here
                </NavLink>
              </p>
            </div>
          </form>
        </div>
        <div className="container-right">
          <img src="Privacy policy-rafiki.png" alt="" />
        </div>
      </div>
    </SignInPageStyles>
  );
};

export default SignIn;
