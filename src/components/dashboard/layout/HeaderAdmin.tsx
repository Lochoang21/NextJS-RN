import React from 'react';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { theme } from 'antd';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const HeaderAdmin: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntHeader style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </AntHeader>
  );
};

export default HeaderAdmin;