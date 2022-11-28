import { signOut } from "firebase/auth";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/auth-context";
import { auth } from "../firebase-app/firebase-config";
import styled from "styled-components";

const HomeStyles = styled.div`
  display: flex;
  .sidebar {
    width: 5%;
    padding: 15px;
    height: 100vh;
    width: auto;
    border: 1px solid ${(props) => props.theme.gray2};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    &-list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    &-item {
      padding: 5px;
      border-radius: 5px;
      &:hover {
        background-color: ${(props) => props.theme.gray2};
      }
    }
    &-user {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      &__item {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
  }

  .chat-room {
    width: 20%;
    padding: 15px;
    border-right: 1px solid ${(props) => props.theme.gray2};
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

  .chat-box {
    width: 55%;
    height: 100vh;
    border-right: 1px solid ${(props) => props.theme.gray2};
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

  .chat-info {
    padding: 15px;
    width: 20%;
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

const listAction = [
  {
    title: "chat",
    url: "/my-chat",
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
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
        />
      </svg>
    ),
  },
  {
    title: "my-friend",
    url: "/my-friend",
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
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
  },
  {
    title: "send",
    url: "/send",
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
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
    ),
  },
  {
    title: "storage",
    url: "/storage",
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
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
    ),
  },
  {
    title: "setting",
    url: "/setting",
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
          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const handleSignOut = () => {
    signOut(auth);
    toast("Sign out successful !!!!!!!!!!!!!!! <3");
    navigate("/sign-in");
  };

  return (
    <HomeStyles>
      <div className="sidebar">
        <div className="sidebar-list">
          {listAction.map((item) => (
            <div className="sidebar-item" key={item.title}>
              <NavLink to={item.url}>{item.icon}</NavLink>
            </div>
          ))}
        </div>
        <div className="sidebar-user">
          <div className="sidebar-user__item">
            <NavLink to="/profile">
              <img src={userInfo?.photoURL} alt="" />
            </NavLink>
          </div>
          <div className="sidebar-user__item">
            <div onClick={handleSignOut} className="cursor-pointer">
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-room">
        <div className="chat-room__header">
          <div className="chat-room__heading flex justify-between items-center">
            <h1>Chat</h1>
            <div className="flex items-center gap-x-2">
              <span>
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
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
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
          <div className="chat-room__item p-2 flex items-center gap-x-12 hover:bg-slate-100 rounded-lg cursor-pointer">
            <div>
              <img
                src="https://images.unsplash.com/photo-1669469053221-093ec2c153f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold w-full text-overflow">
                New Box Chat
              </span>
              <span className="text-gray-400 text-overflow">last send</span>
            </div>
          </div>
          <div className="chat-room__item p-2 flex items-center gap-x-12 hover:bg-slate-100 rounded-lg cursor-pointer">
            <div>
              <img
                src="https://images.unsplash.com/photo-1669469053221-093ec2c153f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold w-full text-overflow">
                New Box Chat
              </span>
              <span className="text-gray-400 text-overflow">last send</span>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-box">
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
            <span>
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
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
              </svg>
            </span>
            <span>
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
            </span>
          </div>
        </div>
        <div className="chat-box__main flex justify-between flex-col">
          <div className="chat-box__realtime flex flex-col gap-y-4">
            <div className="chat-box__mess flex items-center gap-x-3">
              <img
                src="https://images.unsplash.com/photo-1669469053221-093ec2c153f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <span className="chat-box__tn max-w-[70%] bg-slate-300 p-2 rounded-lg text-black">
                Hello , asdfasd asfsadfadsfasdf asndjfsadnf asndfnjasndf
                ajsdnfkjasndfj asdnfjansdf jasndfjn ajsdfnjas hanfjsdanj
                asndjfsadnfasdj ajsdnfjsda jasdfn
              </span>
            </div>
            <div className="chat-box__mess flex flex-row-reverse items-center gap-x-3">
              <img
                src="https://images.unsplash.com/photo-1669469053221-093ec2c153f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <span className="chat-box__tn max-w-[70%] bg-slate-300 p-2 rounded-lg text-black">
                Hello , asdfasd asfsadfadsfasdf asndjfsadnf asndfnjasndf
              </span>
            </div>
            <div className="chat-box__mess flex items-center gap-x-3">
              <img
                src="https://images.unsplash.com/photo-1669469053221-093ec2c153f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <span className="chat-box__tn max-w-[70%] bg-slate-300 p-2 rounded-lg text-black">
                Hello , asdfasd asfsadfadsfasdf asndjfsadnf asndfnjasndf
                ajsdnfkjasndfj asdnfjansdf jasndfjn ajsdfnjas hanfjsdanj
                asndjfsadnfasdj ajsdnfjsda jasdfn
              </span>
            </div>
            <div className="chat-box__mess flex flex-row-reverse items-center gap-x-3">
              <img
                src="https://images.unsplash.com/photo-1669469053221-093ec2c153f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <span className="chat-box__tn max-w-[70%] bg-slate-300 p-2 rounded-lg text-black">
                Hello , asdfasd asfsadfadsfasdf asndjfsadnf asndfnjasndf
              </span>
            </div>
          </div>
        </div>
        <div className="chat-box__send flex items-center gap-x-2">
          <div className="flex flex-center gap-x-2">
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
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
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
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
                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
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
                  d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            </span>
          </div>
          <div className="flex items-center gap-x-2  bg-gray-100 w-full p-2 rounded-2xl">
            <span>
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              type="text"
              className="w-full bg-gray-100"
              placeholder="Aa"
            />
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
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
            </span>
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
      </div>
      <div className="chat-info">
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
            <div className="flex items-center justify-between mx-auto w-[100%] cursor-pointer p-2 hover:bg-slate-100">
              <span>Setting chat</span>
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
                    d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            <div></div>
          </div>
          <div className="item">
            <div className="flex items-center justify-between mx-auto w-[100%] cursor-pointer p-2 hover:bg-slate-100">
              <span>Moi nguoi</span>
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
                    d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </HomeStyles>
  );
};

export default Home;
{
  /* <button onClick={handleSignOut}>Logout</button>
<h1>{userInfo?.displayName}</h1>
<img src={userInfo?.photoURL} alt="" /> */
}
