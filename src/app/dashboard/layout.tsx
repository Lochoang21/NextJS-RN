'use client';
import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from '@/components/dashboard/layout/SidebarAdmin';
import Header from '@/components/dashboard/layout/HeaderAdmin';
import Footer from '@/components/dashboard/layout/FooterAdmin';

const { Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <Content
          style={{
            margin: '10px 10px',
            padding: 14,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;