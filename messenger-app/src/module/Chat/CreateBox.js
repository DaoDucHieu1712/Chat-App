import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Input from "../../components/Input/Input";
import Label from "../../components/label/Label";
import { db } from "../../firebase-app/firebase-config";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

const CreateBoxStyles = styled.div`
  background-color: #fff;
  padding: 35px;
  width: 500px;
  height: auto;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const schema = yup.object({
  boxName: yup
    .string()
    .required("Please enter your name box !!")
    .min(8, "Name box is 8 character or greater !!!"),
  boxContent: yup
    .string()
    .required("Please enter your content box !!")
    .min(8, "Content box is 8 character or greater !!!"),
});
const boxRef = collection(db, "boxs");

const CreateBox = ({ setOpenModal }) => {
  const { userInfo } = useAuth();
  console.log(userInfo);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const onHandleSubmit = async (values) => {
    addDoc(boxRef, {
      boxName: values.boxName,
      contentBox: values.boxContent,
      adminBox: userInfo.uid,
      members: [userInfo.uid],
      createAt: serverTimestamp(),
    })
      .then(() => {
        toast("Create new box successful !!");
      })
      .catch((err) => {
        toast("Oh ah, cant not create box !");
      });
    setOpenModal(false);
  };

  return (
    <CreateBoxStyles>
      <div className="create-header mb-8">
        <h1 className="text-blue-500 font-semibold text-2xl italic uppercase">
          Create Box
        </h1>
      </div>
      <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
        <Field>
          <Label htmlFor="boxName" labelContent="Chat Box"></Label>
          <Input
            type="text"
            control={control}
            name="boxName"
            placeholder="Enter your name chat box ...."
          ></Input>
          {errors.boxName && (
            <p className="text-red-500 font-medium text-sm">
              {errors.boxName.message}
            </p>
          )}
        </Field>
        <Field>
          <Label htmlFor="boxContent" labelContent="Content Box"></Label>
          <Input
            type="text"
            control={control}
            name="boxContent"
            placeholder="Enter your name content box ...."
          ></Input>
          {errors.boxContent && (
            <p className="text-red-500 font-medium text-sm">
              {errors.boxContent.message}
            </p>
          )}
        </Field>
        <Field>
          <Button type="submit" buttonContent="Create"></Button>
        </Field>
      </form>
    </CreateBoxStyles>
  );
};

export default CreateBox;
