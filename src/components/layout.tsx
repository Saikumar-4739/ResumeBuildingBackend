// src/components/Layout.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import "./css/layout.css";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const location = useLocation();
  
  // Determine the current route
  const currentRoute = location.pathname;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo">Resume Generator</div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentRoute]} // Highlight the selected route
          >
            <Menu.Item key="/user-form">
              <Link to="/user-form">User Form</Link>
            </Menu.Item>
            <Menu.Item key="/experience">
              <Link to="/experience">Experience</Link>
            </Menu.Item>
            <Menu.Item key="/academics">
              <Link to="/academics">Academics</Link>
            </Menu.Item>
            <Menu.Item key="/skills">
              <Link to="/skills">Skills</Link>
            </Menu.Item>
            <Menu.Item key="/personal-details">
              <Link to="/personal-details">Personal Details</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px', minHeight: 280 }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
