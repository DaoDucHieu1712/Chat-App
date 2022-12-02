import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase-app/firebase-config";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const ShareKeyBoxStyles = styled.div`
  width: 800px;
  background-color: #fff;
  padding: 14px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;
`;

const ShareKeyBox = () => {
  const { boxId } = useParams();
  const [box, setBox] = useState({});
  const docRefSingle = doc(db, "boxs", boxId);

  useEffect(() => {
    onSnapshot(docRefSingle, (doc) => {
      setBox({ id: doc.id, ...doc.data() });
    });
  }, [boxId]);

  const handleUpdateKeyBox = async () => {
    await updateDoc(docRefSingle, {
      box_key: uuidv4(),
    });
    toast("Generate key box successful !!");
  };

  return (
    <ShareKeyBoxStyles>
      <h1 className="text-blue-400 font-semibold mb-3">Key Box</h1>
      <div className="flex items-center justify-evenly gap-x-3">
        <span className="p-3 border border-gray-200 rounded-lg w-full">
          {box.box_key}
        </span>
        <span
          className="inline-block p-3 bg-blue-400 text-white font-semibold rounded-lg hover:opacity-90 cursor-pointer"
          onClick={handleUpdateKeyBox}
        >
          Gen
        </span>
      </div>
    </ShareKeyBoxStyles>
  );
};

export default ShareKeyBox;
