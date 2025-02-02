import React from "react";
import { Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";

interface DropDownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ onEdit, onDelete }) => {
  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={onEdit}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" onClick={onDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <button>
        <MoreOutlined className="scale-[1.5] cursor-pointer" />
      </button>
    </Dropdown>
  );
};

export default DropDownMenu;
