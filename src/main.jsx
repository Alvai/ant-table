import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Table } from "antd";
// import { data } from "./data";
import { data } from "./file1";
import { getOverlayProps } from "./CustomOverlay";


const keys = Object.keys(data.flat()[0]);
console.log({ keys });
const App = () => {
  const [sortOrders, setSortOrders] = useState({});

  const data2 = data.flat();


  const columns = keys.slice(0, 9).map(k => ({
    title: k,
    sortDirections: ["ASC", "DESC"],
    dataIndex: k,
    key: k,
    width: "30%",
    sortOrder: sortOrders[k] || false,
    sorter: (a, b) => a[k] - b[k],
    defaultFilteredValue: data2.map((d) => d[k]),
    ...getOverlayProps(
    k,
      (newSort) =>
        setSortOrders((s) => ({
          ...s,
          [k]: !s?.[k] ? newSort : s?.[k] === newSort ? false : newSort
        })),
      data2.map((d) => d[k])
    )
  }));

  const t = [
    {
      title: "name",
      sortDirections: ["ASC", "DESC"],
      dataIndex: "name",
      key: "name",
      width: "30%",
      sortOrder: sortOrders.name || false,
      sorter: (a, b) => a.key - b.key,
      defaultFilteredValue: data.map((d) => d.name),
      ...getOverlayProps(
        "name",
        (newSort) =>
          setSortOrders((s) => ({
            ...s,
            name: !s?.name ? newSort : s?.name === newSort ? false : newSort
          })),
        data.map((d) => d.name)
      )
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      sorter: (a, b) => a.age - b.age,
      ...getOverlayProps(
        "age",
        (newSort) =>
          setSortOrders((s) => ({
            ...s,
            age: !s?.age ? newSort : s?.age === newSort ? false : newSort
          })),
        data.map((d) => d.age)
      ),
      sortOrder: sortOrders.age || false
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getOverlayProps(
        "address",
        (newSort) =>
          setSortOrders((s) => ({
            ...s,
            address: !s?.address
              ? newSort
              : s?.address === newSort
              ? false
              : newSort
          })),
        data.map((d) => d.address)
      ),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["ASC", "DESC"],
      sortOrder: sortOrders.address || false
    }
  ];

  console.log({ data2, columns });
  return (
    <Table
      columns={columns}
      dataSource={data2}
      rowPerPage={300}
      pagination={{ position: ["bottomCenter"], pageSize: 100  }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
