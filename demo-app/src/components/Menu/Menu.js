import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  BarChartOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;
MenuComponent.propTypes = {};

const SliderStyled = styled(Sider)`
  /* .ant-layout-sider .ant-layout-sider-dark{
  position: 'fixed';
  top:0;
  bottom:0
} */
  position: fixed !important;
  top: 0;
  left: 0;
  bottom: 0;
  padding-top: 60px;
`;

function MenuComponent(props) {
  const location = useLocation();
  return (
    // collapsed={this.state.collapsed}
    <SliderStyled trigger={null} collapsible width={300}>
      <div className="logo" style={{}} />
      <Menu
        theme="dark"
        mode="vertical "
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item
          style={{ height: "60px", lineHeight: "60px", cursor: "pointer" }}
          key="/"
          icon={<BarChartOutlined />}
        >
          <Link to="/">TỔNG QUAN</Link>
        </Menu.Item>

        <Menu.Item
          style={{ height: "60px", lineHeight: "60px", cursor: "pointer" }}
          key="/clients"
          icon={<TeamOutlined />}
        >
          <Link to="/clients">QUẢN LÝ KHÁCH HÀNG</Link>
        </Menu.Item>

        <Menu.Item
          style={{ height: "60px", lineHeight: "60px", cursor: "pointer" }}
          key="/staffs"
          icon={<UserOutlined />}
        >
          <Link to="/staffs">QUẢN LÝ NHÂN VIÊN</Link>
        </Menu.Item>

        <Menu.Item
          style={{ height: "60px", lineHeight: "60px", cursor: "pointer" }}
          key="/products"
          icon={<ShoppingCartOutlined />}
        >
          <Link to="/products">QUẢN LÝ SẢN PHẨM</Link>
        </Menu.Item>
      </Menu>
    </SliderStyled>
  );
}

export default MenuComponent;
