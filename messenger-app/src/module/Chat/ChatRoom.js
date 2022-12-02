import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GroupChat from "../../components/chat/GroupChat";
import ModalBase from "../../portal/ModalBase";
import CreateBox from "./CreateBox";
import { useAuth } from "../../contexts/auth-context";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import ShareKeyBox from "../../components/chat/ShareKeyBox";
import JoinBox from "../../components/chat/JoinBox";
const ChatRoomStyles = styled.div`
  width: 20%;
  padding: 15px;
  border-right: 1px solid ${(props) => props.theme.gray2};
  background-color: #fff;
  .chat-room {
    h1 {
      font-size: 28px;
      font-weight: 600;
    }
    &__list {
      height: 100vh;
      overflow-y: scroll;
      padding-bottom: 150px;
    }
    &__header {
      margin-bottom: 15px;
    }
    &__heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      span {
        padding: 5px;
        background-color: ${(props) => props.theme.gray2};
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
  @media (max-width: 767px) {
    display: none;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;
const boxRef = collection(db, "boxs");

const ChatRoom = () => {
  const { userInfo } = useAuth();
  console.log(userInfo.uid);
  const [openModal, setOpenModal] = useState(false);
  const [modalShareKey, setModalShareKey] = useState(false);
  const [modalJoin, setModalJoin] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unscribe = onSnapshot(boxRef, (snapshot) => {
      const getAllBoxOfUserCurrent = async () => {
        const q = query(
          boxRef,
          where("members", "array-contains", userInfo.uid)
        );
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setRooms(result);
      };
      getAllBoxOfUserCurrent();
    });
    return unscribe;
  }, [userInfo]);

  return (
    <ChatRoomStyles>
      <div className="chat-room__header">
        <div className="chat-room__heading flex justify-between items-center">
          <h1 className="text-xl font-semibold">Chat</h1>
          <div className="flex items-center gap-x-2">
            <span
              onClick={() => {
                setModalShareKey(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
            </span>
            <span onClick={() => setOpenModal(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
            </span>
            <span onClick={() => setModalJoin(true)}>join chat</span>
          </div>
        </div>
        <div className="chat-room__search">
          <div className="chat-room__input flex items-center p-2 gap-x-2 border border-gray-300 rounded-lg">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="search chat room ...."
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="chat-room__list flex flex-col gap-y-2">
        {rooms.map((item) => (
          <GroupChat
            key={item.box_key}
            BoxName={item.boxName}
            ContentBox={item.ContentBox}
            image={item.image_url}
            slug={item.slug}
            box_id={item.id}
          ></GroupChat>
        ))}
      </div>
      <ModalBase visible={openModal} onClose={() => setOpenModal(false)}>
        <CreateBox setOpenModal={setOpenModal}></CreateBox>
      </ModalBase>
      <ModalBase
        visible={modalShareKey}
        onClose={() => setModalShareKey(false)}
      >
        <ShareKeyBox></ShareKeyBox>
      </ModalBase>
      <ModalBase visible={modalJoin} onClose={() => setModalJoin(false)}>
        <JoinBox setModalJoin={setModalJoin}></JoinBox>
      </ModalBase>
    </ChatRoomStyles>
  );
};

export default ChatRoom;
