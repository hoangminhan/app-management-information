import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ClientItem from "./ClientItem";
import * as API from "./../../services/index";

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
  updateClientAsync,
  purchaseAsync,
} from "../../actions/clientAction";
import convertSearch from "./../../utils/search";
import typeClient from "../../utils/getTypeClient";
import { getDataProductAsync } from "../../actions/productAction";
import formatPrice from "../../utils/formatPrice";
const { Option } = Select;

Clients.propTypes = {};

function Clients(props) {
  const [showModal, setShowModal] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [dataDelete, setDataDelete] = useState();
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.listClient);
  const products = useSelector((state) => state.products);
  const location = useSelector((state) => state.clients.location);
  const [loadingTable, setLoadingTable] = useState(true);
  const [filter, setFilter] = useState({
    page: 1,
    search: "",
    start: "",
    end: "",
  });
  const [totalPageProduct, setTotalPageProduct] = useState(0);
  const [filterProduct, setFilterProduct] = useState({
    page: 1,
    search: "",
  });
  const [dataDetailClient, setDataDetailClient] = useState();

  const [form] = Form.useForm();
  useEffect(() => {
    const getDataProduct = async () => {
      API.getDataProducts({ page: -1 }).then((res) => {
        if (res.data && res.data.status) {
          setTotalPageProduct(res.data.products.length);
        }
      });
    };
    getDataProduct();
  }, []);

  useEffect(() => {
    dispatch(
      getDataClientAsync({
        page: filter.page,
        search: filter.search,
        start: filter.start,
        end: filter.end,
      })
    );
    setTimeout(() => {
      setLoadingTable(false);
    }, 1000);
  }, [filter]);

  useEffect(() => {
    const { page, search } = filterProduct;
    dispatch(getDataProductAsync({ page, search }));
  }, [filterProduct]);

  const hiddenModal = () => {
    setShowModal(false);
    setShowModalProduct(false);
    setModalDelete(false);
    setModalDetail(false);
  };

  const PopUpModal = () => {
    setShowModal(true);
    form.setFieldsValue({
      fullName: "",
      cmnd: "",
      phone: "",
      id: "",
    });
    setCheckEdit(false);
  };

  const handleUpdate = (client) => {
    const { fullName, _id, cmnd, phone, address } = client;
    setShowModal(true);
    form.setFieldsValue({
      _id: _id,
      fullName,
      cmnd,
      phone,
      address: address.id,
    });
    setCheckEdit(true);
  };

  const onFinish = (value) => {
    const { fullName, phone, address, cmnd, _id } = value;
    let checkAdress = location.find((item, index) => {
      return item.id === address;
    });
    if (!_id) {
      const dataAdd = {
        fullName,
        phone,
        address: { ...checkAdress },
        cmnd,
        text: convertSearch(fullName),
      };
      dispatch(addClientAsync(dataAdd));
    } else {
      const dataUpdate = {
        // _id,
        fullName,
        phone,
        address: { ...checkAdress },
        cmnd,
        text: convertSearch(fullName),
      };
      dispatch(updateClientAsync(dataUpdate, _id));
    }

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
  const [dataPurchase, setDataPurchase] = useState();
  const handlePurchaseProduct = (client) => {
    console.log(client);
    setShowModalProduct(true);
    setDataPurchase(client);
  };
  const handleAddProduct = (record) => {
    console.log(dataPurchase);

    const { _id, price } = record;
    console.log(record);
    const dataAdd = {
      productId: _id,
      totalMoney: price + dataPurchase.totalMoney,
      quantity: 1,
    };
    dispatch(purchaseAsync(dataAdd, dataPurchase._id));
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      key: "stt",
      render: (stt) => {
        return <span style={{ cursor: "pointer" }}>{stt}</span>;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName) => {
        return <span style={{ cursor: "pointer" }}>{fullName}</span>;
      },
    },
    {
      title: "Loại khách hàng",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (totalMoney) => {
        return (
          <span style={{ cursor: "pointer" }}>{typeClient(totalMoney)}</span>
        );
      },
    },
    {
      title: "Quận huyện",
      dataIndex: "address",
      key: "address",
      render: (address) => {
        return (
          <span
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              cursor: "pointer",
            }}
          >
            {address?.name || "Chưa cập nhập"}
          </span>
        );
      },
    },

    {
      title: "Action",
      with: "400px",
      dataIndex: "_id",

      render: (_id, client) => {
        return (
          <Space size="middle">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => handlePurchaseProduct(client)}
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
              onClick={() => handleUpdate(client)}
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
      render: (record) => {
        return (
          <PlusOutlined
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => handleAddProduct(record)}
          />
        );
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {name}
        </span>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {`${formatPrice(price)} đ`}
        </span>
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {category.title}
        </span>
      ),
    },
  ];
  const [tableDetail, setTableDetail] = useState([]);

  const columnDetail = [
    {
      title: "STT",
      align: "center",
      width: "50px",
      dataIndex: "stt",
      key: "stt",
      className: "cursor",
      render: (stt) => {
        return <span>{stt}</span>;
      },
    },

    {
      title: "Tên",
      dataIndex: "name",
      align: "center",

      key: "name",
      render: (name) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {name}
        </span>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      align: "center",

      key: "price",
      render: (price) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {`${formatPrice(price)} đ`}
        </span>
      ),
    },
    {
      title: "Ngày mua",
      dataIndex: "createdAt",
      align: "center",

      key: "createdAt",
      render: (createdAt) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {createdAt}
        </span>
      ),
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
                placeholder="Tìm kiếm khách hàng"
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
                placeholder="Tất cả"
                size="large"
                style={{
                  width: "150px",
                  textAlign: "left",
                  height: "40px",
                  lineHeight: "40px",
                  marginLeft: "10px",
                }}
                onChange={(value) => {
                  if (value === 0) {
                    setFilter({
                      ...filter,
                      start: 0,
                      end: 0,
                    });
                  } else if (value === 1) {
                    setFilter({
                      ...filter,
                      start: 0,
                      end: 5000000,
                    });
                  } else if (value === 2) {
                    setFilter({
                      ...filter,
                      start: 5000000,
                      end: 10000000,
                    });
                  } else if (value === 3) {
                    setFilter({
                      ...filter,
                      start: 10000000,
                      end: 49999999,
                    });
                  } else {
                    setFilter({
                      ...filter,
                      start: 50000000,
                      end: 500000000000,
                    });
                  }
                }}
              >
                <Option
                  value={0}
                  style={{
                    width: "150px",
                    textAlign: "left",
                    height: "40px",
                    lineHeight: "40px",
                  }}
                >
                  Tất cả
                </Option>
                <Option
                  value={1}
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
                  value={2}
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
                  value={3}
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
                  value={4}
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
                rowClassName="cursor:pointer"
                columns={columns}
                dataSource={clients}
                bordered
                pagination={false}
                onRow={(record, rowIndex) => {
                  return {
                    onDoubleClick: (event) => {
                      const {
                        address,
                        bought,
                        cmnd,
                        createdAt,
                        fullName,
                        phone,
                        setTotalPageProduct,
                        stt,
                        text,
                        totalMoney,
                        updateAdd,
                        _id,
                      } = record;
                      const newBought = bought.reduce((acc, item, index) => {
                        // console.log(item.bought);
                        return [...acc, { ...item.product, stt: index + 1 }];
                      }, []);
                      const data = {
                        address,
                        bought,
                        cmnd,
                        createdAt,
                        fullName,
                        phone,
                        setTotalPageProduct,
                        stt,
                        text,
                        totalMoney,
                        updateAdd,
                        _id,
                      };
                      setDataDetailClient(data);
                      setTableDetail(newBought);
                      setModalDetail(true);
                    }, // click row
                  };
                }}

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
          <Form.Item name="_id"></Form.Item>
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
            rules={[
              { required: true, message: "Please input identify!" },
              {
                pattern: /\d{9}/,
                message: "ID card must have 9 characters",
              },
            ]}
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
                message: "wrong phone number format",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            initialValue="Quận/Huyện"
            rules={[{ required: true, message: "Please chose address!" }]}
          >
            <Select initialValue="Quận/Huyện" placeholder="Quận/Huyện">
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
              onChange={(event) => {
                console.log(event.target.value);
                setFilterProduct({
                  ...filterProduct,
                  search: convertSearch(event.target.value),
                });
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "32px" }}>
          <Col span={24}>
            <Table
              columns={columnProduct}
              dataSource={products.listProduct}
              pagination={false}
            ></Table>
            <Pagination
              current={filterProduct.page}
              total={totalPageProduct}
              size="large"
              style={{ textAlign: "right", marginTop: "10px" }}
              onChange={(page) =>
                setFilterProduct({
                  ...filterProduct,
                  page: page,
                })
              }
            />
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

      {/* Modal detail */}
      <Modal
        visible={modalDetail}
        footer={null}
        width={1100}
        onCancel={hiddenModal}
      >
        <Row>
          <Col span={24}>
            <h2 style={{ textAlign: "center", fontWeight: "650" }}>
              Thông tin khách hàng
            </h2>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={8} style={{ marginTop: "12px" }}>
                <h3 style={{ marginBottom: "32px" }}>Thông tin</h3>
                <ul style={{ listStyle: "none", padding: "0 10px" }}>
                  <li>
                    <Row>
                      <Col span={9}>
                        <span style={{ fontWeight: 650 }}>Họ tên: </span>
                      </Col>
                      {dataDetailClient?.fullName}
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col span={9}>
                        <span style={{ fontWeight: 650 }}>
                          {" "}
                          Loại khách hàng:{" "}
                        </span>
                      </Col>
                      {typeClient(dataDetailClient?.totalMoney)}
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col span={9}>
                        <span style={{ fontWeight: 650 }}>Khu vực: </span>
                      </Col>
                      {dataDetailClient?.address.name}
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col span={9}>
                        <span style={{ fontWeight: 650 }}>CMND: </span>
                      </Col>
                      {dataDetailClient?.cmnd}
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col span={9}>
                        <span style={{ fontWeight: 650 }}>Số điện thoại: </span>
                      </Col>
                      {dataDetailClient?.phone}
                    </Row>
                  </li>
                  <li>
                    <Row>
                      {" "}
                      <Col span={9}>
                        <span style={{ fontWeight: 650 }}>Tổng chi tiêu</span>
                      </Col>
                      {formatPrice(dataDetailClient?.totalMoney)} đ
                    </Row>
                  </li>
                </ul>
              </Col>
              <Col span={16} style={{ marginTop: "12px" }}>
                <h3 style={{ marginBottom: "32px" }}>
                  Danh sách mặt hàng đã mua
                </h3>
                <Table
                  columns={columnDetail}
                  dataSource={tableDetail}
                  pagination={false}
                  bordered
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default Clients;
