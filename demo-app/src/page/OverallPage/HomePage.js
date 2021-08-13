import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/Header/Header";
import MenuComponent from "../../components/Menu/Menu";
import Layout, { Content } from "antd/lib/layout/layout";

HomePage.propTypes = {};

function HomePage(props) {
  return (
    <Layout>
      <MenuComponent />
      <Layout>
        <Header />
        <Content style={{ marginLeft: "325px" }}>
          Home Page
          {/* <Clients /> */}
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomePage;
