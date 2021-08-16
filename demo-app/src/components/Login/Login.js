import React from "react";
import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import { login } from "../../services";
import { useDispatch } from "react-redux";
import { loginReducer } from "../../actions/loginAction";
import { useHistory } from "react-router-dom";
const { Title } = Typography;

Login.propTypes = {};

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSbumit = (value) => {
    const { username, password } = value;
    const data = {
      username,
      password,
    };
    login(data)
      .then((res) => {
        debugger;
        if (res.data && res.data.status) {
          localStorage.setItem("accessToken", res.data.token);
          dispatch(loginReducer(res.data.user));
          message.success("Đăng nhập thành công");
          history.push("/");
        } else {
          message.error("Sai tên đăng nhập hoặc tài khoản!!");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Col span={10}>
          <Title
            levet={3}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            Đăng nhập
          </Title>

          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            // initialValues={{ remember: true }}
            onFinish={handleSbumit}
            //   onFinishFailed={onFinishFailed}
            // onValuesChange={handleChangeValue}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 24 }}
              style={{ textAlign: "center" }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
