import React from "react";
import { Dropdown, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { logOut } from "../../actions/loginAction";

Header.propTypes = {};

function Header(props) {
  const { Header, Sider, Content } = Layout;
  const dataLogin = useSelector((state) => state.login.user);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<UserOutlined />}
        onClick={() => {
          localStorage.removeItem("accessToken");
          history.push("/login");
          dispatch(logOut());
        }}
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  // const logOut = () => {

  // };
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
            {location.pathname === "/"
              ? "TRANG CHỦ"
              : location.pathname === "/clients"
              ? "Khách hàng"
              : location.pathname === "/staffs"
              ? "NHÂN VIÊN"
              : "SẢN PHẨM"}
          </p>
          <div style={{ marginRight: "20px", fontSize: "17px" }}>
            <Dropdown.Button
              overlay={menu}
              placement="bottomCenter"
              icon={<UserOutlined />}
            >
              {`${dataLogin.fullName}(${dataLogin.role})`}
            </Dropdown.Button>
          </div>
          {/* <p style={{ marginRight: "20px", fontSize: "17px" }}>
            {`${dataLogin.fullName}(${dataLogin.role})`}
          </p> */}
        </div>
      </Header>
    </Layout>
  );
}

export default Header;
