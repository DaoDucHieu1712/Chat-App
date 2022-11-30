import React from "react";
import styled from "styled-components";

const GroupChatStyles = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 0 48px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const GroupChat = ({ BoxName = "", ContentBox = "" }) => {
  return (
    <GroupChatStyles>
      <div>
        <img
          src="https://images.unsplash.com/photo-1669469053221-093ec2c153f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold w-full text-overflow">
          {BoxName}
        </span>
        <span className="text-gray-400 text-overflow">{ContentBox}</span>
      </div>
    </GroupChatStyles>
  );
};

export default GroupChat;
