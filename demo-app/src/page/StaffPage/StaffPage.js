import React from "react";
import PropTypes from "prop-types";
import Staff from "../../components/Staff/Staff";
import Layout, { Content } from "antd/lib/layout/layout";
import MenuComponent from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";

StaffPage.propTypes = {};

function StaffPage(props) {
  return (
    <Layout>
      <MenuComponent />
      <Layout>
        <Header />
        <Content style={{ marginLeft: "325px" }}>
          <Staff />
        </Content>
      </Layout>
    </Layout>
  );
}

export default StaffPage;
