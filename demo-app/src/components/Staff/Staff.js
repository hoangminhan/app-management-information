import React, { useEffect, useState } from "react";
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
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import search from "./../../utils/search";
import {
  DeleteOutlined,
  FormOutlined,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  addStaffAsync,
  deleteStaffAsync,
  getDataStaffAsync,
} from "../../actions/staffAcion";

function Staff(props) {
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAction, setModalAction] = useState(false);
  const dispatch = useDispatch();
  const staffs = useSelector((state) => state.staffs.listStaff);
  const roleAccount = useSelector((state) => state.login.user.role);
  console.log(roleAccount);
  const [filter, setFilter] = useState({
    page: 1,
    search: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [form] = Form.useForm();
  const [dataDelete, setDataDelete] = useState();
  const hiddenModal = () => {
    setModalAction(false);
    setIsUpdate(false);
    setModalDelete(false);
  };
  const showModalAcion = () => {
    form.setFieldsValue({
      _id: "",
      avatar: "",
      fullName: "",
      phone: "",
      address: "",
      email: "",
      username: "",
      password: "",
    });
    setImageUrl("");
    setModalAction(true);
  };
  const handleDelete = () => {
    setModalDelete(false);
    dispatch(deleteStaffAsync(dataDelete));
  };

  function getBase64(img, callbackImg) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callbackImg(reader.result));
    reader.readAsDataURL(img);
  }
  const handleSubmit = (value) => {
    debugger;
    const {
      _id,
      avatar,
      fullName,
      phone,
      address,
      email,
      username,
      password,
    } = value;
    if (!_id) {
      const dataAdd = {
        fullName,
        phone,
        address,
        email,
        username,
        password,
        image: imageUrl,
      };
      dispatch(addStaffAsync(dataAdd));
    } else {
      console.log(value);
    }
    setModalAction(false);
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      key: "stt",
      width: "30px",
      render: (stt) => {
        return <span style={{ cursor: "pointer" }}>{stt}</span>;
      },
    },
    {
      title: "AVATAR",
      dataIndex: "image",
      align: "center",
      width: "200px",

      key: "image",
      render: (image, staff) => {
        return (
          <div>
            <img
              src={image?.url}
              style={{
                minWidth: "130px",
                maxWidth: "130px",
                minHeight: "130px",
                maxHeight: "130px",
                borderRadius: "50%",
              }}
              alt="Chưa thêm"
            ></img>
            <p>{staff.fullName}</p>
          </div>
        );
      },
    },
    {
      title: "INFORMATION",
      dataIndex: "infor",
      align: "center",

      key: "infor",
      render: (infor) => {
        return (
          <ul
            style={{
              listStyle: "none",
              paddingLeft: "50px",
              textAlign: "left",
            }}
          >
            <li>
              <span style={{ fontWeight: 650, marginRight: "10px" }}>
                Số điện thoại:
              </span>
              {infor.phone}
            </li>
            <li>
              <span style={{ fontWeight: 650, marginRight: "10px" }}>
                Địa chỉ:
              </span>
              {infor.address}
            </li>
            <li>
              <span style={{ fontWeight: 650, marginRight: "10px" }}>
                Email:
              </span>
              {infor.email}
            </li>
            <li>
              <span style={{ fontWeight: 650, marginRight: "10px" }}>
                Tài khoản:
              </span>
              {infor.username}
            </li>
          </ul>
        );
      },
    },

    {
      title: "ACTION",
      with: "400px",
      dataIndex: "_id",
      align: "center",
      width: "300px",

      render: (_id, staff) => {
        return (
          <Space size="middle">
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              onClick={() => {
                setModalDelete(true);
                setDataDelete(_id);
              }}
            >
              Xoá
            </Button>
            <Button
              icon={<FormOutlined />}
              style={{ backgroundColor: "#ffc021", color: "#fff" }}
              onClick={() => {
                const {
                  _id,
                  image,
                  fullName,
                  phone,
                  address,
                  email,
                  username,
                  password,
                } = staff;
                // getBase64(image.url, (imageUrl) => setImageUrl(imageUrl));
                const encodedString = Buffer.from(image.url).toString("base64");
                console.log(image.url);
                setIsUpdate(true);
                setModalAction(true);
                form.setFieldsValue({
                  _id,
                  avatar: imageUrl,
                  fullName,
                  phone,
                  address,
                  email,
                  username,
                  password,
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

  useEffect(() => {
    const { page, search } = filter;
    dispatch(
      getDataStaffAsync({
        page,
        search,
      })
    );
  }, [filter]);

  const [loading, setLoading] = useState(false);
  const uploadButton = (
    <div
    // style={{
    //   width: "128px",
    //   height: "128px",
    //   borderStyle: "dotted",
    //   display: "flex",
    //   // justifyContent: "space-between",
    //   alignItems: "center",
    //   flexDirection: "column",

    //   lineHeight: "128px",
    //   cursor: "pointer",
    // }}
    >
      <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
    </div>
  );

  return (
    <>
      <Row gutter={[0, 32]} style={{ marginRight: "30px" }}>
        <Col span={24}>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-start",
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
                Thêm nhân viên
              </Button>
            </Col>
            {/* <Col span={5}>
              <Input
                size="large"
                placeholder="Tìm kiếm nhân viên"
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  const data = event.target.value;
                  setFilter({
                    ...filter,
                    search: search(data),
                  });
                }}
              />
            </Col> */}
          </Row>
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={staffs}
            pagination={false}
            bordered
          />
        </Col>
        <Modal
          visible={modalDelete}
          width={500}
          onCancel={hiddenModal}
          onOk={handleDelete}
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
            {isUpdate ? "Chỉnh sửa thông tin nhân viên" : "Thêm nhân viên"}
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
                  label="Avatar"
                  name="avatar"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input avatar!",
                  //   },
                  // ]}
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={(avatar) => {
                      console.log(avatar);
                      if (avatar.file.status === "uploading") {
                        setLoading(true);
                        setImageUrl("");
                      } else {
                        setLoading(false);
                        getBase64(avatar.file.originFileObj, (imageUrl) => {
                          setImageUrl(imageUrl);
                        });
                      }
                    }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Họ tên"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                    {
                      pattern: /[a-zA-Z- ]+$/,
                      message: "Name must be string",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    {
                      pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                      message: "wrong format phone number",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    {
                      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "wrong format email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Tài khoản"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input user name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input password !",
                    },
                  ]}
                >
                  <Input.Password />
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
}

export default Staff;
