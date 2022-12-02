import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Message from "../../components/chat/Message";
import ChatInput from "../../components/chat/ChatInput";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

const ChatBoxStyles = styled.div`
  width: 55%;
  height: 100vh;
  border-right: 1px solid ${(props) => props.theme.gray2};
  .chat-box {
    &__header {
      border-bottom: 1px solid ${(props) => props.theme.gray2};
    }
    &__action {
      span {
        padding: 5px;
        color: ${(props) => props.theme.primary};
        border-radius: 8px;
        cursor: pointer;
        &:hover {
          background-color: ${(props) => props.theme.gray2};
        }
      }
    }
    &__main {
      height: 85%;
      overflow-y: scroll;
    }
    &__realtime {
      padding: 15px;
    }
    &__send {
      padding: 15px 15px 35px 15px;
      span {
        cursor: pointer;
        color: ${(props) => props.theme.primary};
        &:hover {
          background-color: ${(props) => props.theme.gray2};
        }
      }
    }
  }
  @media (max-width: 767px) {
    width: 95%;
    .chat-box__main {
      height: 79%;
    }
  }

  @media (max-width: 1023px) {
    width: 55%;
    .chat-box__main {
      height: 80%;
    }
  }
`;

const IconAction = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
      </svg>
    ),
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

const IconInput = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
    ),
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
        />
      </svg>
    ),
  },
  {
    icon: (
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
      </span>
    ),
  },
];

const MessageRef = collection(db, "Messages");
const BoxRef = collection(db, "boxs");

const ChatBox = () => {
  const { boxId } = useParams();
  const { userInfo } = useAuth();
  const [box, setBox] = useState({});
  const [isIcon, setIsIcon] = useState(false);
  const [messages, setMessages] = useState([]);
  const mesRef = useRef(null);

  useEffect(() => {
    const unscribe = onSnapshot(MessageRef, (snapshot) => {
      const getAllMessageWithBox = async () => {
        const q = query(MessageRef, orderBy("createAt", "asc"));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        const final = result.filter((item) => item.box_id === boxId);
        console.log(final);
        setMessages(final);
      };
      getAllMessageWithBox();
    });

    return unscribe;
  }, [boxId, userInfo]);

  useEffect(() => {
    const docRefSingle = doc(db, "boxs", boxId);
    onSnapshot(docRefSingle, (doc) => {
      setBox({ id: doc.id, ...doc.data() });
    });
  }, [boxId, userInfo]);

  useEffect(() => {
    if (mesRef?.current) {
      mesRef.current.scrollTop = mesRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <ChatBoxStyles>
      <div className="chat-box__header flex justify-between items-center p-3">
        <div className="flex gap-x-3">
          <div>
            <img
              src={box.image_url}
              alt=""
              className="w-[50px] h-[50px] rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{box.boxName}</span>
            <span className="text-gray-400">{box.contentBox}</span>
          </div>
        </div>
        <div className="chat-box__action flex items-center gap-x-3">
          {IconAction.map((item) => (
            <span key={item.icon}>{item.icon}</span>
          ))}
        </div>
      </div>
      <div
        className="chat-box__main flex justify-between flex-col"
        ref={mesRef}
      >
        <div className="chat-box__realtime flex flex-col gap-y-4">
          {messages.map((item) => (
            <Message
              message={item.content}
              isUserCurrent={userInfo.uid === item.user ? true : false}
              photoURL={item.avatar}
              displayName={item.author}
            ></Message>
          ))}
        </div>
      </div>
      <ChatInput isIcon={isIcon} setIsIcon={setIsIcon}></ChatInput>
    </ChatBoxStyles>
  );
};

export default ChatBox;
