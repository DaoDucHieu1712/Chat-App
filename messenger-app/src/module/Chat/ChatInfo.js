import React, { useState } from "react";
import styled from "styled-components";
import IconArrowClose from "../../components/icon/IconArrowClose";
import IconArrowOpen from "../../components/icon/IconArrowOpen";

const ChatInfoStyles = styled.div`
  padding: 15px;
  width: 20%;
  .chat-info {
    &__icon {
      span {
        padding: 5px;
        cursor: pointer;
        border-radius: 50%;
        &:hover {
          background-color: ${(props) => props.theme.gray2};
        }
      }
    }
  }
`;

const ChatInfo = () => {
  const [setting, setSetting] = useState(false);
  const [person, setPerson] = useState(false);

  return (
    <ChatInfoStyles>
      <div className="chat-info__header w-full flex flex-col items-center justify-center mx-auto">
        <div className="flex items-center justify-center mb-5">
          <img
            src="https://images.unsplash.com/photo-1669570094762-828f3dfaf675?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="w-[100px] h-[100px] rounded-full"
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <span className="text-lg font-semibold">New Box Chat</span>
          <span className="text-gray-300">Content Box</span>
        </div>
      </div>
      <div className="chat-info__icon flex items-center justify-center gap-x-3 my-3">
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
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
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </span>
      </div>
      <div className="chat-info__list">
        <div className="item">
          <div
            className="flex items-center justify-between mx-auto w-[100%] cursor-pointer p-2 hover:bg-slate-100"
            onClick={() => setSetting(!setting)}
          >
            <span>Setting chat</span>
            {!setting ? (
              <IconArrowClose></IconArrowClose>
            ) : (
              <IconArrowOpen></IconArrowOpen>
            )}
          </div>
          <div className={`${setting ? "hidden" : ""}`}>
            <div className="flex items-center gap-x-4 p-2 hover:bg-gray-100 cursor-pointer">
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </span>
              <span>Rename the chat</span>
            </div>
            <div className="flex items-center gap-x-4 p-2 hover:bg-gray-100 cursor-pointer">
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
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </span>
              <span>Change photo</span>
            </div>
          </div>
        </div>
        <div className="item">
          <div
            className="flex items-center justify-between mx-auto w-[100%] cursor-pointer p-2 hover:bg-slate-100"
            onClick={() => setPerson(!person)}
          >
            <span>Member in ChatBox</span>
            {!person ? (
              <IconArrowClose></IconArrowClose>
            ) : (
              <IconArrowOpen></IconArrowOpen>
            )}
          </div>
          <div className={`${person ? "hidden" : ""}`}>
            <div className="flex items-center gap-x-2 p-2">
              <img
                src="https://images.unsplash.com/photo-1669555514519-261ee068c278?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <span>Dao Duc Hieu</span>
            </div>
            <div className="flex items-center gap-x-2 p-2">
              <img
                src="https://images.unsplash.com/photo-1669555514519-261ee068c278?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <span>Dao Duc Hieu</span>
            </div>
          </div>
        </div>
      </div>
    </ChatInfoStyles>
  );
};

export default ChatInfo;
