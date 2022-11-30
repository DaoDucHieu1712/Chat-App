import React from "react";

const Message = ({ message = "", ...props }) => {
  console.log(props.isUserCurrent);
  return (
    <div
      className={`flex items-center gap-x-3 ${
        props.isUserCurrent ? "flex-row-reverse" : ""
      }`}
    >
      <img
        src="https://images.unsplash.com/photo-1669469053221-093ec2c153f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        alt=""
        className="w-[50px] h-[50px] rounded-full"
      />
      <span className="chat-box__tn max-w-[70%] bg-slate-200 p-2 rounded-lg text-black">
        {message}
      </span>
    </div>
  );
};

export default Message;
