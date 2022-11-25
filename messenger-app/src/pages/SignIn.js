import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/Input/Input";
import InputPassword from "../components/Input/InputPassword";
import Button from "../components/button/Button";
import ButtonLoginWithFB from "../components/button/ButtonLoginWithFB";
import ButtonLoginWithGG from "../components/button/ButtonLoginWithGG";
import { toast } from "react-toastify";

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

  @media (max-width: 767px) {
    width: 700px;
    .container {
      width: 50%;
      height: 750px;
      margin: 100px auto;
      &-right {
        display: none;
      }
      &-left {
        width: 100%;
      }
    }
  }
  @media (max-width: 1023px) {
    width: 1000px;
    .container {
      width: 50%;
      height: 750px;
      margin: 100px auto;
      &-right {
        display: none;
      }
      &-left {
        width: 100%;
      }
    }
  }
`;

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email invalid !")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Example: abcxyz@gmail.com"
      )
      .required("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password minimum eight characters, at least one letter, one number and one special character"
      ),
  })
  .required();

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
    resolver: yupResolver(schema),
  });

  const onSubmitSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        toast("Login successful !!!!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Email or password not correct !!!");
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
            <Field>
              <Label htmlFor="email" labelContent="Email"></Label>
              <Input
                type="text"
                name="email"
                control={control}
                placeholder="Enter your email ... "
              ></Input>
              {errors.email && (
                <p className="text-red-500 font-medium text-sm">
                  {errors.email.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="password" labelContent="Password"></Label>
              <InputPassword control={control}></InputPassword>
              {errors.password && (
                <p className="text-red-500 font-medium text-sm">
                  {errors.password.message}
                </p>
              )}
            </Field>
            <Field>
              <Button type="submit" buttonContent="SignIn"></Button>
            </Field>
            <Field>
              <ButtonLoginWithFB></ButtonLoginWithFB>
              <ButtonLoginWithGG></ButtonLoginWithGG>
            </Field>
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
