import React from "react";
import { Outlet } from "react-router-dom";

import { Col, Flex, Layout, theme, Row } from "antd";

import MenuSider from "../../Components/Common/MenuSider"
import useAuth from "../../Hooks/useAuth";

const { Header, Content } = Layout;

const mainLayoutStyle = {
  minHeight: "calc(100vh)",
};
const contentStyle = {
  maxHeight: "calc(100vh - 112px)",
};

const MainLayout: React.FC = () => {
  useAuth()

  const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

  return (
    <Layout style={mainLayoutStyle}>
      <MenuSider />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row justify="end">
            <Col span={4}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -20%)",
                }}
              >
                <Flex gap="middle" align="end" vertical>
                  <h2>DataValidator</h2>
                </Flex>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={contentStyle}>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
							margin: "24px 16px 0",
              minHeight: "calc(100vh - 112px)",
              padding: 24,
							overflowY: "auto",
            }}
          >
						<Outlet />
					</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
