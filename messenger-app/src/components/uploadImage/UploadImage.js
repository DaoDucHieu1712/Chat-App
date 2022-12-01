import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";
import { useWatch } from "react-hook-form";
import styled from "styled-components";
import { useEffect } from "react";

const UploadImageStyles = styled.div`
  width: 100%;

  .hidden-input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }

  .trash {
    width: 50px;
    margin: 10px auto;
    cursor: pointer;
    z-index: 999999;
    svg,
    path {
      width: 100%;
    }
  }
`;

const UploadImage = ({ setValue, getValues, name, control, ...props }) => {
  const [image, setImage] = useState("");
  const [percent, setPercent] = useState(0);
  const [imageName, setImageName] = useState("");

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "boxs/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setPercent(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("nothing");
            break;
        }
      },
      (error) => {
        toast.error("Upload Image failed !!", {
          delay: 0,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          console.log(image);
        });
      }
    );
  };

  useEffect(() => {
    setValue(name, image);
  }, [image]);

  const onSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleUploadImage(file);
    setImageName(file.name);
    setPercent(0);
  };

  const handleRemoveImage = () => {
    const storage = getStorage();
    const desertRef = ref(storage, "images/" + imageName);
    deleteObject(desertRef)
      .then(() => {
        toast.success("Image deleted successfully ! ");
        setImage("");
        setImageName("");
      })
      .catch((error) => {
        toast.error("Uh-oh, an error occurred!");
      });
  };

  return (
    <UploadImageStyles>
      <label className="min-h-[300px] w-full overflow-hidden flex items-center justify-center border border-dashed cursor-pointer rounded-lg">
        <input
          type="file"
          className="hidden-input"
          onChange={onSelectImage}
          {...props}
        />
        <div className="flex flex-col items-center text-center pointer-events-none">
          {!image && (
            <img
              src="/img-upload.png"
              alt="upload-img"
              className="max-w-[80px] mb-5"
            />
          )}
          {image && <img src={image} alt="abc" className="w-full h-[300px]" />}
          {!image && <p className="font-semibold">Choose photo</p>}
        </div>
      </label>
      {percent != 100 && (
        <div
          className="h-[3px] bg-blue-400"
          style={{ width: `${percent}%` }}
        ></div>
      )}

      {image && (
        <div className="trash">
          <svg
            onClick={handleRemoveImage}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      )}
    </UploadImageStyles>
  );
};

export default UploadImage;
