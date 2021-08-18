import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Space,
  Table,
  Pagination,
  message,
  Form,
  Select,
} from "antd";
import convertSearch from "./../../utils/search";
import {
  DeleteOutlined,
  FormOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAsync,
  deleteProductAsync,
  getDataCategoriesAsync,
  getDataProductAsync,
  updateProductAsync,
} from "../../actions/productAction";
import formatPrice from "../../utils/formatPrice";
import Modal from "antd/lib/modal/Modal";

const Products = (props) => {
  const { Option } = Select;
  const [filter, setFliter] = useState({
    page: 1,
    search: "",
  });

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    const { page, search } = filter;
    dispatch(getDataProductAsync({ page, search }));
  }, [filter]);
  const [itemDelete, setItemDelete] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAction, setModalAction] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [dataCategories, setDataCategories] = useState([]);
  const hiddenModal = () => {
    setModalDelete(false);
    setModalAction(false);
    setUpdate(false);
  };
  const [form] = Form.useForm();
  const showModalAcion = () => {
    form.setFieldsValue({
      _id: "",
      name: "",
      price: "",
      category: "",
    });
    setModalAction(true);
    setUpdate(false);
  };
  const showModalDelete = (id) => {
    setItemDelete(id);
    setModalDelete(true);
  };
  const handleDeleteProduct = () => {
    setModalDelete(false);
    dispatch(deleteProductAsync(itemDelete));
  };
  useEffect(() => {
    getDataCategoriesAsync().then((res) => {
      setDataCategories(res.data.categories);
    });
  }, []);

  const handleSubmit = (value) => {
    const { category, name, price, _id } = value;
    if (!_id) {
      dispatch(addProductAsync({ name, price, category }));
    } else {
      dispatch(
        updateProductAsync({
          category,
          name,
          price,
          _id,
        })
      );
    }
    setModalAction(false);
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      align: "center",
      dataIndex: "stt",
      key: "stt",
      render: (stt) => {
        return <span style={{ cursor: "pointer" }}>{stt}</span>;
      },
    },
    {
      title: "Tên sản phẩm",
      align: "center",
      dataIndex: "name",
      key: "name",
      render: (name) => {
        return <span style={{ cursor: "pointer" }}>{name}</span>;
      },
    },
    {
      title: "Thể loại",
      align: "center",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return <span style={{ cursor: "pointer" }}>{category.title}</span>;
      },
    },
    {
      title: "Giá",
      align: "center",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return (
          <span
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              cursor: "pointer",
            }}
          >
            {formatPrice(price)}đ
          </span>
        );
      },
    },

    {
      title: "Action",
      align: "center",
      maxWidth: "300px",
      dataIndex: "_id",

      render: (_id, product) => {
        return (
          <Space size="middle">
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
              onClick={() => {
                setModalAction(true);
                setUpdate(true);
                console.log(product);
                const { name, price, _id, category } = product;

                form.setFieldsValue({
                  name,
                  price,
                  _id,
                  category: category._id,
                });
              }}
            >
              Sửa
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <Row gutter={[0, 32]} style={{ marginRight: "30px" }}>
        <Col span={24}>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "32px",
            }}
          >
            <Col span={5}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                style={{ height: "40px", minWidth: "200px" }}
                onClick={showModalAcion}
              >
                Thêm sản phẩm
              </Button>
            </Col>
            <Col span={5}>
              <Input
                size="large"
                placeholder="Tìm kiếm sản phẩm"
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  const data = event.target.value;
                  setFliter({
                    ...filter,
                    search: convertSearch(data),
                  });
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={products.listProduct}
            pagination={false}
          />
          <Pagination
            pageSize={8}
            style={{ textAlign: "right", marginTop: "10px" }}
            total={products.productPage.totalPage * 8}
            current={filter.page}
            onChange={(page) => {
              setFliter({
                ...filter,
                page,
              });
            }}
          />
        </Col>
        <Modal
          visible={modalDelete}
          width={500}
          onCancel={hiddenModal}
          onOk={handleDeleteProduct}
        >
          <h3 style={{ textAlign: "center" }}>Bạn có chắc muốn xoá không!</h3>
        </Modal>

        {/* Modal create and update product */}
        <Modal
          footer={null}
          onCancel={hiddenModal}
          visible={modalAction}
          width={500}
        >
          <h2 style={{ textAlign: "center" }}>
            {isUpdate ? "Cập nhập thông tin sản phẩm" : "Thêm sản phẩm"}
          </h2>
          <Row>
            <Col span={24}>
              <Form
                name="form-1"
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 24 }}
                onFinish={handleSubmit}
              >
                <Form.Item name="_id"></Form.Item>
                <Form.Item
                  label="Tên sản phẩm"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Giá"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please input price product!",
                    },
                    {
                      pattern: /^\d+$/,
                      message: "price of product must be number",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Thể loại"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please chose type product!",
                    },
                  ]}
                >
                  <Select placeholder="Product Type">
                    {dataCategories &&
                      dataCategories.map((item, index) => {
                        return <Option value={item._id}>{item.title}</Option>;
                      })}
                  </Select>
                </Form.Item>
                <Col span={24} style={{ textAlign: "center" }}>
                  <Button htmlType="submit">Submit</Button>
                </Col>
              </Form>
            </Col>
          </Row>
        </Modal>
      </Row>
    </>
  );
};

Products.propTypes = {};

export default Products;
