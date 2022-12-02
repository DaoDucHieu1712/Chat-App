import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import { db } from "../../firebase-app/firebase-config";

const JoinBoxStyles = styled.div`
  width: 800px;
  background-color: #fff;
  padding: 12px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 8px;

  input {
    width: 100%;
    border: 1px solid #eee;
    padding: 8px;
    border-radius: 8px;
  }
  span {
    padding: 8px;
    color: white;
    background-color: ${(props) => props.theme.primary};
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
`;

const JoinBox = ({ setModalJoin }) => {
  const { userInfo } = useAuth();
  const [box, setBox] = useState({});
  const [keyText, setKeyText] = useState("");
  const boxRef = collection(db, "boxs");

  useEffect(() => {
    const getAllBoxOfUserCurrent = async () => {
      const q = query(boxRef, where("box_key", "==", keyText));
      const querySnapshot = await getDocs(q);
      console.log(keyText, querySnapshot);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(result[0]);
      setBox(result[0]);
    };
    getAllBoxOfUserCurrent();
  }, [keyText, userInfo]);

  const handleJoinBox = async (e) => {
    console.log("ok");
    if (keyText !== box.box_key) {
      toast.error("Key Box not correct !!");
      return;
    }
    const docRefSingle = doc(db, "boxs", box.id);

    //check member exist
    const isExist = true;
    box.members.forEach((item) => {
      if (item === userInfo.uid) {
        isExist = false;
      }
    });

    // Check chat exist
    if (isExist) {
      await updateDoc(docRefSingle, {
        members: [...box.members, userInfo.uid],
      });
      toast(`Join ${box.boxName} successful !!!`);
      setModalJoin(false);
    }
  };

  return (
    <JoinBoxStyles>
      <h1 className="text-blue-400 mb-3 font-semibold">Join Box Chat</h1>
      <div className="flex items-center justify-center gap-x-3">
        <input
          type="text"
          onChange={(e) => setKeyText(e.target.value)}
          placeholder="Enter key box you want join ..."
        />
        <span onClick={handleJoinBox}>Join</span>
      </div>
    </JoinBoxStyles>
  );
};

export default JoinBox;
