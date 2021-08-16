import React, { useEffect, useState } from "react";
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
  Form,
  Modal,
  Spin,
} from "antd";
import Icon, {
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClientAsync,
  getDataClientAsync,
  addClientAsync,
} from "../../actions/clientAction";
import convertSearch from "./../../utils/search";
import typeClient from "../../utils/getTypeClient";
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
  const [modalDelete, setModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState();
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.listClient);
  const location = useSelector((state) => state.clients.location);
  const [loadingTable, setLoadingTable] = useState(true);
  const [filter, setFilter] = useState({
    page: 1,
    search: "",
  });

  // useEffect(() => {
  //   let dataChange = clients.reduce((acc, item, index) => {
  //     let data = { ...item, stt: index + 1 };
  //     return [...acc, data];
  //   }, []);
  //   setDataTable([...dataChange]);
  //   setLoadingTable(false);
  // }, []);
  // const handleChangePage = (page, pageSize) => {
  //   dispatch(getDataClientAsync({ page: page }));
  // };
  useEffect(() => {
    dispatch(getDataClientAsync({ page: filter.page, search: filter.search }));
  }, [filter]);
  useEffect(() => {
    setTimeout(() => {
      setLoadingTable(false);
    }, 500);
  }, [filter]);

  const hiddenModal = () => {
    setShowModal(false);
    setShowModalProduct(false);
    setModalDelete(false);
  };
  const PopUpModal = () => {
    setShowModal(true);
    form.setFieldsValue({
      fullName: "",
      cmnd: "",
      phone: "",
      address: "",
    });
    setCheckEdit(false);
  };
  const showModalEdit = () => {
    setCheckEdit(true);
    setShowModal(true);
  };
  const onFinish = (value) => {
    const { fullName, phone, address, cmnd } = value;
    let checkAdress = location.find((item, index) => {
      return item.id === address;
    });
    const dataAdd = {
      fullName,
      phone,
      address: { ...checkAdress },
      cmnd,
      text: convertSearch(fullName),
    };
    dispatch(addClientAsync(dataAdd));
    setShowModal(false);
  };
  const onFinishFailed = () => {
    console.log("fail");
  };
  const showModalDelete = (id) => {
    console.log(id);
    setModalDelete(true);
    setDataDelete(id);
  };
  const confirmDeleteClient = () => {
    dispatch(deleteClientAsync(dataDelete));
    setModalDelete(false);
  };
  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      key: "stt",
      render: (stt) => {
        return <span>{stt}</span>;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName) => {
        return <span>{fullName}</span>;
      },
    },
    {
      title: "Loại khách hàng",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (totalMoney) => {
        return <span>{typeClient(totalMoney)}</span>;
      },
    },
    {
      title: "Quận huyện",
      dataIndex: "address",
      key: "address",
      render: (address) => {
        return (
          <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
            {address.name}
          </span>
        );
      },
    },

    {
      title: "Action",
      with: "400px",
      dataIndex: "_id",

      render: (_id) => {
        return (
          <Space size="middle">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setShowModalProduct(true)}
            >
              Thêm sản phẩm
            </Button>
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              onClick={() => showModalDelete(_id)}
            >
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

  const [form] = Form.useForm();
  // useEffect(() => {
  //   console.log(form);
  //   form.setFieldsValue({
  //     name: "",
  //     cmnd: "",
  //     phone: "",
  //     address: "Quận/Huyện",
  //   });
  // }, []);

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
                onChange={(event) => {
                  setFilter({
                    ...filter,
                    search: convertSearch(event.target.value),
                  });
                }}
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
            <Spin spinning={loadingTable}>
              <Table
                columns={columns}
                dataSource={clients}
                bordered
                pagination={false}
                // loading={{
                //   indicator: !clients ? <Spin></Spin> : "",
                // }}
                //   pagination={false}
              />
            </Spin>
            <Pagination
              current={filter.page}
              total={50}
              size="large"
              style={{ textAlign: "right", marginTop: "10px" }}
              onChange={(page) =>
                setFilter({
                  ...filter,
                  page: page,
                })
              }
            />
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
          form={form}
          name="form-1"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          //   initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Họ tên"
            name="fullName"
            initialValue="An"
            rules={[{ required: true, message: "Please input name client!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CMND"
            name="cmnd"
            rules={[{ required: true, message: "Please input identify!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="phone"
            rules={[
              { required: true, message: "Please input phone number!" },
              {
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "Sai định dạng số điện thoại",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Please chose address!" }]}
          >
            <Select defaultValue="Quận/Huyện" placeholder="Quận/Huyện">
              {location?.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
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

      {/* Modal Delete */}
      <Modal
        visible={modalDelete}
        onCancel={hiddenModal}
        width={450}
        closable={false}
        onOk={confirmDeleteClient}
      >
        <h3 style={{ marginTop: "32px" }}>
          Bạn có chắc muốn xoá thông tin khách hàng không?
        </h3>
      </Modal>
    </div>
  );
}

export default Clients;
