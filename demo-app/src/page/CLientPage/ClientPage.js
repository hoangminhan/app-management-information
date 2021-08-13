import React from "react";
import Clients from "../../components/Client/Clients";
import Layout, { Content } from "antd/lib/layout/layout";
import Header from "../../components/Header/Header";
import MenuComponent from "../../components/Menu/Menu";

ClientPage.propTypes = {};

function ClientPage(props) {
  return (
    <Layout>
      <MenuComponent />
      <Layout>
        <Header />
        <Content style={{ marginLeft: "325px", height: "100vh" }}>
          <Clients />
        </Content>
      </Layout>
    </Layout>
  );
}

export default ClientPage;
