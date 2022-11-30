import React, { useState } from "react";
import styled from "styled-components";
import IconSearch from "../../components/icon/IconSearch";
import EmojiPicker from "emoji-picker-react";
import Message from "../../components/chat/Message";

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

const ChatBox = () => {
  const [isIcon, setIsIcon] = useState(false);
  const [text, setText] = useState("");

  const onEmojiClick = ({ emoji }, e) => {
    setText(text + emoji);
    setIsIcon(false);
  };

  return (
    <ChatBoxStyles>
      <div className="chat-box__header flex justify-between items-center p-3">
        <div className="flex gap-x-3">
          <div>
            <img
              src="https://images.unsplash.com/photo-1669469053221-093ec2c153f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="w-[50px] h-[50px] rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">New Chat Box</span>
            <span className="text-gray-400">last send</span>
          </div>
        </div>
        <div className="chat-box__action flex items-center gap-x-5">
          {IconAction.map((item) => (
            <span>{item.icon}</span>
          ))}
        </div>
      </div>
      <div className="chat-box__main flex justify-between flex-col">
        <div className="chat-box__realtime flex flex-col gap-y-4">
          <Message message="Hello" isUserCurrent></Message>
          <Message message="Hi"></Message>
          <Message message="What the fuck ?? " isUserCurrent></Message>
        </div>
      </div>
      <div className="chat-box__send flex items-center gap-x-2">
        <div className="flex flex-center gap-x-2">
          {IconInput.map((item) => (
            <span>{item.icon}</span>
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
        <span className="p-2 rounded-full">
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
        </span>
      </div>
    </ChatBoxStyles>
  );
};

export default ChatBox;
