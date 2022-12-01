import EmojiPicker from "emoji-picker-react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import { db } from "../../firebase-app/firebase-config";
import IconSearch from "../icon/IconSearch";

const ChatInputStyles = styled.div`
  .chat-box__send {
    padding: 15px 15px 35px 15px;
    span {
      cursor: pointer;
      color: ${(props) => props.theme.primary};
      &:hover {
        background-color: ${(props) => props.theme.gray2};
      }
    }
  }
`;
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
const ChatInput = ({ isIcon, setIsIcon }) => {
  const { boxId } = useParams();
  console.log(boxId);
  const [text, setText] = useState("");
  const { userInfo } = useAuth();
  const onEmojiClick = ({ emoji }, e) => {
    setText(text + emoji);
    setIsIcon(false);
  };

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

  const onHandleSubmit = async (values) => {
    await addDoc(MessageRef, {
      content: text,
      avatar: userInfo.photoURL,
      createAt: serverTimestamp(),
      author: userInfo.displayName,
      user: userInfo.uid,
      box_id: boxId,
    });
    setText("");
  };

  return (
    <ChatInputStyles>
      <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="chat-box__send flex items-center gap-x-2">
          <div className="flex flex-center gap-x-2">
            {IconInput.map((item) => (
              <span key={item.icon}>{item.icon}</span>
            ))}
          </div>
          <div className="flex items-center gap-x-2  bg-gray-100 w-full p-2 rounded-2xl">
            <IconSearch></IconSearch>
            <input
              type="text"
              className="w-full bg-gray-100"
              placeholder="Aa"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="relative">
              <div
                className={`absolute -top-32 right-0 -translate-y-72 ${
                  isIcon ? "" : "hidden"
                }`}
              >
                <EmojiPicker
                  width={300}
                  height={400}
                  onEmojiClick={onEmojiClick}
                />
              </div>
              <span onClick={() => setIsIcon(!isIcon)}>
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
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <button
            className="p-2 rounded-full text-blue-400 hover:bg-slate-200"
            type={text.length === 0 ? "button" : "submit"}
          >
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
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </form>
    </ChatInputStyles>
  );
};

export default ChatInput;
