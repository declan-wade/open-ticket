"use client";
import React from "react";
import { Button, Layout, Menu, Typography, theme, Flex, Space } from "antd";
const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;
import NewTicket from '@/components/NewTicket'
import MyTickets from "@/components/MyTickets";
import ViewTicket from "@/components/ViewTicket";
import { SquarePlus } from 'lucide-react';
import { TicketCheck } from 'lucide-react';

export default function Page() {
  const [collapsed, setCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Layout style={{height:"100vh"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Flex gap="middle" align="center" vertical>
          <Title level={3} style={{ paddingTop: 15, color: "#fff" }}>
            OpenTicket
          </Title>
        </Flex>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <SquarePlus />,
              label: "New Ticket",
            },
            {
              key: "2",
              icon: <TicketCheck />,
              label: "My Tickets",
            },
            {
              key: "3",
              icon: "",
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header></Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <NewTicket />
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}
