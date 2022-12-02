import { FieldValue } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Input from "../../components/Input/Input";
import Label from "../../components/label/Label";
import UploadImage from "../../components/uploadImage/UploadImage";
import { useAuth } from "../../contexts/auth-context";
import Field from "../../components/field/Field";

const ProfileStyles = styled.div`
  width: 800px;
  padding: 35px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Profile = () => {
  const { userInfo } = useAuth();
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
  });
  const onHandleSubmit = (values) => {
    console.log(values);
  };
  return (
    <ProfileStyles>
      <div>
        <h1 className="text-xl text-blue-400 mb-4">Profile</h1>
      </div>
      <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
        <Field>
          <Label htmlFor="displayName" labelContent="Display Name"></Label>
          <Input
            type="text"
            control={control}
            name="displayName"
            placeholder="Enter your Display Name ...."
            value={userInfo.displayName}
          ></Input>
        </Field>
        <Field>
          <UploadImage
            setValue={setValue}
            getValues={getValues}
            control={control}
            name="avatar"
            folder="avatar"
          ></UploadImage>
        </Field>
        <Field>
          <Button type="submit" buttonContent="Update"></Button>
        </Field>
      </form>
    </ProfileStyles>
  );
};

export default Profile;
