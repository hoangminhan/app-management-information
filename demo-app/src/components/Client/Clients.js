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
  Tooltip,
} from "antd";
import moment from "moment";
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
  const totalClients = useSelector(
    (state) => state.clients.clientPage.totalPage
  );

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
    page: -1,
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
    dispatch(purchaseAsync(dataAdd, dataPurchase._id, record));
    console.log(dataPurchase._id);
    setShowModalProduct(false);
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: (stt) => {
        return (
          <Tooltip title="Double click to see detail">
            {" "}
            <span style={{ cursor: "pointer" }}>{stt}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "FULL NAME",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",

      render: (fullName) => {
        return (
          <Tooltip title="Double click to see detail">
            <span style={{ cursor: "pointer" }}>{fullName}</span>;
          </Tooltip>
        );
      },
    },
    {
      title: "CUSTOMER TYPE",
      dataIndex: "totalMoney",
      key: "totalMoney",
      align: "center",

      render: (totalMoney) => {
        return (
          <Tooltip title="Double click to see detail">
            <span style={{ cursor: "pointer" }}>{typeClient(totalMoney)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "ADDRESS",
      align: "center",

      dataIndex: "address",
      key: "address",
      render: (address) => {
        return (
          <Tooltip title="Double click to see detail">
            <span
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                cursor: "pointer",
              }}
            >
              {address?.name || "Ch??a c???p nh???p"}
            </span>
          </Tooltip>
        );
      },
    },

    {
      title: "ACTION",
      with: "400px",
      dataIndex: "_id",
      align: "center",

      render: (_id, client) => {
        return (
          <Space size="middle">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => handlePurchaseProduct(client)}
            >
              Th??m s???n ph???m
            </Button>
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              onClick={() => showModalDelete(_id)}
            >
              Xo??
            </Button>
            <Button
              icon={<FormOutlined />}
              style={{ backgroundColor: "#ffc021", color: "#fff" }}
              onClick={() => handleUpdate(client)}
            >
              S???a
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
      title: "ADD",
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
      title: "PRODUCT NAME",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {name}
        </span>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      align: "center",

      render: (price) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {`${formatPrice(price)} ??`}
        </span>
      ),
    },
    {
      title: "TYPE",
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
      title: "T??n",
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
      title: "Gi??",
      dataIndex: "price",
      align: "center",

      key: "price",
      render: (price) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {`${formatPrice(price)} ??`}
        </span>
      ),
    },
    {
      title: "Ng??y mua",
      dataIndex: "createdAt",
      align: "center",

      key: "createdAt",
      render: (createdAt) => (
        <span style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {moment(createdAt).format("MM/DD/YYYY")}
        </span>
      ),
    },
  ];

  console.log(products.listProduct);

  return (
    <div style={{ marginTop: "32px" }}>
      <Col>
        <Row>
          <Col span={6}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ height: "40px" }}
              onClick={PopUpModal}
            >
              Th??m kh??ch h??ng
            </Button>
          </Col>
          <Col
            span={18}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Col span={6}>
              <Input
                size="large"
                placeholder="T??m ki???m kh??ch h??ng"
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setFilter({
                    ...filter,
                    page: 1,
                    search: convertSearch(event.target.value),
                  });
                }}
              />
            </Col>
            <Col span={6}>
              <Select
                placeholder="T???t c???"
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
                  T???t c???
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
                  V??ng lai
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
                  Ti???m n??ng
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
                  ?????c bi???t
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
              total={totalClients}
              pageSize={10}
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
          {checkEdit ? "C???p nh???p th??ng tin kh??ch h??ng" : "Th??m kh??ch h??ng"}
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
            label="H??? t??n"
            name="fullName"
            rules={[
              { required: true, message: "Please input name client!" },
              {
                pattern: /[a-zA-Z- ]+$/,
                message: "Name must be string",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CMND"
            name="cmnd"
            rules={[
              { required: true, message: "Please input identify!" },
              {
                pattern: /[0-9]{9}/,
                message: "ID card must have 9 characters",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="S??T"
            name="phone"
            rules={[
              { required: true, message: "Please input phone number!" },
              {
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "wrong format phone number ",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="?????a ch???"
            name="address"
            initialValue="Qu???n/Huy???n"
            rules={[{ required: true, message: "Please chose address!" }]}
          >
            <Select initialValue="Qu???n/Huy???n" placeholder="Qu???n/Huy???n">
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
          T???t c??? s???n ph???m
        </h2>
        <Row style={{ display: "felx", justifyContent: "flex-end" }}>
          <Col span={6}>
            <Input
              size="large"
              placeholder="Nh???p t??n s???n ph???m"
              prefix={<SearchOutlined />}
              onChange={(event) => {
                setFilterProduct({
                  ...filterProduct,
                  page: 1,
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
              bordered
              scroll={{ y: 400 }}
            ></Table>
            {/* <Pagination
              current={filterProduct.page}
              total={totalPageProduct}
              pageSize={8}
              size="large"
              style={{ textAlign: "right", marginTop: "10px" }}
              onChange={(page) =>
                setFilterProduct({
                  ...filterProduct,
                  page: page,
                })
              }
            /> */}
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
          B???n c?? ch???c mu???n xo?? th??ng tin kh??ch h??ng kh??ng?
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
              Th??ng tin kh??ch h??ng
            </h2>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={8} style={{ marginTop: "12px" }}>
                <h3 style={{ marginBottom: "32px" }}>Th??ng tin</h3>
                <ul style={{ listStyle: "none", padding: "0 10px" }}>
                  <li>
                    <Row>
                      <Col span={9}>
                        <span style={{ fontWeight: 650 }}>H??? t??n: </span>
                      </Col>
                      {dataDetailClient?.fullName}
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col span={9}>
                        <span style={{ fontWeight: 650 }}>
                          {" "}
                          Lo???i kh??ch h??ng:{" "}
                        </span>
                      </Col>
                      {typeClient(dataDetailClient?.totalMoney)}
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col span={9}>
                        <span style={{ fontWeight: 650 }}>Khu v???c: </span>
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
                        <span style={{ fontWeight: 650 }}>S??? ??i???n tho???i: </span>
                      </Col>
                      {dataDetailClient?.phone}
                    </Row>
                  </li>
                  <li>
                    <Row>
                      {" "}
                      <Col span={9}>
                        <span style={{ fontWeight: 650 }}>T???ng chi ti??u</span>
                      </Col>
                      {formatPrice(dataDetailClient?.totalMoney)} ??
                    </Row>
                  </li>
                </ul>
              </Col>
              <Col span={16} style={{ marginTop: "12px" }}>
                <h3 style={{ marginBottom: "32px" }}>
                  Danh s??ch m???t h??ng ???? mua
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
