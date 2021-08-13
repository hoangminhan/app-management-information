import React from "react";
import PropTypes from "prop-types";
import Products from "../../components/Product/Products";
import Layout, { Content } from "antd/lib/layout/layout";
import MenuComponent from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";

ProductPage.propTypes = {};

function ProductPage(props) {
  return (
    <Layout>
      <MenuComponent />
      <Layout>
        <Header />
        <Content style={{ marginLeft: "325px" }}>
          <Products />
        </Content>
      </Layout>
    </Layout>
  );
}

export default ProductPage;
