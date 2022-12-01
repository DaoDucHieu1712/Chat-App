import React from "react";

const Message = ({
  message = "",
  isUserCurrent,
  displayName,
  photoURL = "",
  createAt = "",
}) => {
  return (
    <div
      className={`flex items-center gap-x-3 ${
        isUserCurrent ? "flex-row-reverse" : ""
      }`}
    >
      <img
        src={photoURL}
        alt="avatar"
        className="w-[50px] h-[50px] rounded-full"
      />
      <div className="flex flex-col gap-1 max-w-[70%]">
        <span className="text-base">
          {displayName}
          <span className="text-xs text-gray-400">Today at 9:15</span>
        </span>
        <span className="chat-box__tn max-w-[100%] bg-slate-200 p-2 rounded-lg text-black">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Message;
