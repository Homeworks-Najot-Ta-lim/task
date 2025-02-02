import React from "react";
import { Modal } from "antd";
import { ModalType } from "../types/ModalType";

const CustomModal: React.FC<ModalType> = ({ open, title, text, onOk, onCancel, children, isAlert }) => {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={isAlert ? onOk : undefined} 
      footer={isAlert ? undefined : null} 
    >
      {isAlert && text ? <p>{text}</p> : children}
    </Modal>
  );
};

export default CustomModal;
