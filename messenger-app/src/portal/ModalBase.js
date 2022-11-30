import React from "react";
import Portal from "./Portal";
import { CSSTransition } from "react-transition-group";

const ModalBase = ({ visible, onClose, children, bodyClassName = "" }) => {
  return (
    <>
      <CSSTransition in={visible} unmountOnExit timeout={250} classNames="zoom">
        {(status) => (
          <Portal
            visible={status !== "exited"}
            onClose={onClose}
            containerClassName="flex items-center justify-center fixed z-[9999] inset-0"
            bodyStyle={{ transition: "all 250ms" }}
            bodyClassName={`relative z-10 content ${bodyClassName}`}
          >
            {children}
          </Portal>
        )}
      </CSSTransition>
    </>
  );
};

export default ModalBase;
