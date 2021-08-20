import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Bar, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getDataClientAsync } from "../actions/clientAction";
import typeClient from "../utils/getTypeClient";
import * as API from "./../services";
import { Spin } from "antd";

Home.propTypes = {};

function Home(props) {
  const [dataChart, setDataChart] = useState({
    data: {},
    option: {},
  });

  let mount;
  const [loadingSpin, setLoadingSpin] = useState(true);
  const clients = useSelector((state) => state.clients.listClient);
  const location = useSelector((state) => state.clients.location);
  let clientPotential = clients.filter((item, index) => {
    return typeClient(item.totalMoney) === "Tiềm Năng";
  });
  let clientSpecial = clients.filter((item, index) => {
    return typeClient(item.totalMoney) === "Đặc Biệt";
  });
  let clientVip = clients.filter((item, index) => {
    return typeClient(item.totalMoney) === "VIP";
  });
  let clientType = clients.filter((item, index) => {
    return typeClient(item.totalMoney) === "Vãng Lai";
  });
  console.log(clientVip);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataClientAsync({ page: -1 }));
  }, []);
  useEffect(() => {
    API.getDataClient({ page: -1 })
      .then((res) => {
        return res.data.guests;
      })
      .then((clients) => {
        mount = location.reduce((acc, item, index) => {
          let count = 0;
          clients.forEach((client) => {
            if (client?.address?.id === item.id) {
              count++;
            }
          });
          return [...acc, count];
        }, []);
        return mount;
      })
      .then((data) => {
        setLoadingSpin(false);
        // setDataQuantity(data);
        // console.log(dataQuantity);
        setDataChart({
          ...dataChart,
          data: {
            labels: location.map((item, index) => {
              return item.name;
            }),
            datasets: [
              {
                label: "Bản đồ quận huyện ",
                data: data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },

          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      });
  }, []);

  return (
    <>
      {loadingSpin ? (
        <div
          style={{ textAlign: "center", height: "100vh", lineHeight: "100vh" }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Row style={{ marginTop: "32px" }}>
          <Col span={12}>
            <Doughnut
              style={{ maxHeight: "400px" }}
              data={{
                datasets: [
                  {
                    label: "Population (millions)",
                    backgroundColor: ["#ccc", "#e8c3b9", "#c45850", "#3cba9f"],
                    data: [
                      clientSpecial.length,
                      clientVip.length,
                      clientPotential.length,
                      clientType.length,
                    ],
                  },
                ],

                labels: ["Đặc biệt", "Víp", "Tiềm năng", "Vãng lai"],
              }}
              option={{
                title: {
                  display: true,
                  text: "Predicted world population (millions) in 2050",
                },
              }}
            />

            <h3 style={{ textAlign: "center", marginTop: "10px" }}>
              Loại khách hàng
            </h3>
          </Col>
          <Col span={24}>
            <h3 style={{ textAlign: "center" }}>Quận huyện</h3>

            <Bar data={dataChart.data} options={dataChart.options} />
          </Col>
        </Row>
      )}
    </>
  );
}

export default Home;
