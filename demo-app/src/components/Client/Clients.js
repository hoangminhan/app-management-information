import React, { useState } from "react";
import PropTypes from "prop-types";
import ClientItem from "./ClientItem";
import {
  Button,
  Col,
  Input,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Checkbox,
  Form,
  Modal,
} from "antd";
import Icon, {
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const { Option } = Select;

Clients.propTypes = {};

const data = [
  {
    stt: 1,
    name: "Hoangan",
    type: "Vip",
    address: "ĐăkLak",
  },
  {
    stt: 1,
    name: "Hoangan",
    type: "Vip",
    address: "ĐăkLak",
  },
];

function Clients(props) {
  const [showModal, setShowModal] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);

  const hiddenModal = () => {
    setShowModal(false);
    setShowModalProduct(false);
  };
  const PopUpModal = () => {
    setShowModal(true);
    setCheckEdit(false);
  };
  const showModalEdit = () => {
    setCheckEdit(true);
    setShowModal(true);
  };
  const onFinish = () => {
    setShowModal(false);
  };
  const onFinishFailed = () => {
    console.log("fail");
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại khách hàng",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Quận huyện",
      dataIndex: "address",
      key: "address",
      render: (dataIndex) => {
        return (
          <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
            {dataIndex}
          </span>
        );
      },
    },

    {
      title: "Action",
      with: "400px",
      render: () => {
        return (
          <Space size="middle">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setShowModalProduct(true)}
            >
              Thêm sản phẩm
            </Button>
            <Button icon={<DeleteOutlined />} type="primary" danger>
              Xoá
            </Button>
            <Button
              icon={<FormOutlined />}
              style={{ backgroundColor: "#ffc021", color: "#fff" }}
              onClick={showModalEdit}
            >
              Sửa
            </Button>
          </Space>
        );
      },
    },
  ];

  const columnProduct = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Thêm",
      align: "center",
      render: () => {
        return <PlusOutlined style={{ color: "blue" }} />;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (dataIndex) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {dataIndex}
        </span>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (dataIndex) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {dataIndex}
        </span>
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "type",
      key: "type",
      render: (dataIndex) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {dataIndex}
        </span>
      ),
    },
  ];
  const dataProduct = [
    {
      stt: 1,
      name: "chuộtaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      price: 12000,
      type: "Phụ kiện",
    },
  ];
  return (
    <div style={{ marginTop: "32px", height: "40px" }}>
      <Col>
        <Row>
          <Col span={6}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ height: "40px" }}
              onClick={PopUpModal}
            >
              Thêm khách hàng
            </Button>
          </Col>
          <Col
            span={18}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Col span={6}>
              <Input
                size="large"
                placeholder="Tìm kiến khách hàng"
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={6}>
              <Select
                defaultValue="Tất cả"
                size="large"
                style={{
                  width: "150px",
                  textAlign: "left",
                  height: "40px",
                  lineHeight: "40px",
                  marginLeft: "10px",
                }}
              >
                <Option
                  value="lucy"
                  style={{
                    width: "150px",
                    textAlign: "left",
                    height: "40px",
                    lineHeight: "40px",
                  }}
                >
                  Vãng lai
                </Option>
                <Option
                  value="lucy"
                  style={{
                    width: "150px",
                    textAlign: "left",
                    height: "40px",
                    lineHeight: "40px",
                  }}
                >
                  Tiềm năng
                </Option>
                <Option
                  value="lucy"
                  style={{
                    width: "150px",
                    textAlign: "left",
                    height: "40px",
                    lineHeight: "40px",
                  }}
                >
                  Vip
                </Option>
                <Option
                  value="lucy"
                  style={{
                    width: "150px",
                    textAlign: "left",
                    height: "40px",
                    lineHeight: "40px",
                  }}
                >
                  Đặc biệt
                </Option>
              </Select>
            </Col>
          </Col>
        </Row>

        <Row style={{ marginTop: "32px", marginRight: "30px" }}>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={data}
              bordered
              //   pagination={false}
            ></Table>
            {/* <Pagination
              current={1}
              total={50}
              size="large"
              style={{ textAlign: "right", marginTop: "10px" }}
            /> */}
          </Col>
        </Row>
      </Col>

      {/* Modal */}
      <Modal
        visible={showModal}
        footer={null}
        onCancel={hiddenModal}
        width={400}
      >
        <h2 style={{ textAlign: "center", fontWeight: 650 }}>
          {checkEdit ? "Cập nhập thông tin khách hàng" : "Thêm khách hàng"}
        </h2>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          //   initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: "Please input name product!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CMND"
            name="cmnd"
            rules={[{ required: true, message: "Please input cmnd!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="phone"
            rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Please input address!" }]}
          >
            <Select defaultValue="Quận/Huyện">
              <Option value="1">Quận 1</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 24 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal product */}
      <Modal
        footer={null}
        visible={showModalProduct}
        width={1200}
        onCancel={hiddenModal}
      >
        <h2 style={{ textAlign: "center", fontWeight: 650 }}>
          Tất cả sản phẩm
        </h2>
        <Row style={{ display: "felx", justifyContent: "flex-end" }}>
          <Col span={6}>
            <Input
              size="large"
              placeholder="Nhập tên sản phẩm"
              prefix={<SearchOutlined />}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columnProduct}
              dataSource={dataProduct}
              pagination={false}
            ></Table>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default Clients;
