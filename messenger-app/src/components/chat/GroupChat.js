import React from "react";
import { NavLink } from "react-router-dom";
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

const GroupChat = ({
  BoxName = "",
  ContentBox = "",
  image = "",
  slug = "",
  box_id = "",
}) => {
  return (
    <NavLink to={`/box/${box_id}`}>
      <GroupChatStyles>
        <div>
          <img src={image} alt="" className="w-[40px] h-[40px] rounded-full" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold w-full text-overflow">
            {BoxName}
          </span>
          <span className="text-gray-400 text-overflow">{ContentBox}</span>
        </div>
      </GroupChatStyles>
    </NavLink>
  );
};

export default GroupChat;
