import React from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
const { Title } = Typography;

Login.propTypes = {};

function Login(props) {
  //   const handleChangeValue = (change, value) => {
  //     // console.log(change, "=", value);
  //   };
  const handleSbumit = (value) => {
    console.log(value);
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
