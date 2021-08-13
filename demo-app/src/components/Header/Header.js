import React from "react";
import { Layout } from "antd";

Header.propTypes = {};

function Header(props) {
  const { Header, Sider, Content } = Layout;
  return (
    <Layout>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <p style={{ marginLeft: "325px", textTransform: "uppercase" }}>
            Khách hàng
          </p>
          <p style={{ marginRight: "20px", fontSize: "17px" }}>
            HoangAn (admin)
          </p>
        </div>
      </Header>
    </Layout>
  );
}

export default Header;
