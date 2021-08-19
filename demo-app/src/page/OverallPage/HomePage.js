import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/Header/Header";
import MenuComponent from "../../components/Menu/Menu";
import Layout, { Content } from "antd/lib/layout/layout";
import Home from "../../components/Home";
import { getDataClientAsync } from "../../actions/clientAction";

HomePage.propTypes = {};

function HomePage(props) {
  return (
    <Layout>
      <MenuComponent />
      <Layout>
        <Header />
        <Content style={{ marginLeft: "325px" }}>
          <Home />
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomePage;
