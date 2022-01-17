import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Table } from "antd";
import { data } from "./data";
import { getOverlayProps } from "./CustomOverlay";


const App = () => {
  const [sortOrders, setSortOrders] = useState({});

  const columns = ['name', 'age', 'address'].map(column => (
    {
      title: column,
      sortDirections: ["ASC", "DESC"],
      dataIndex: column,
      key: column,
      width: "30%",
      sortOrder: sortOrders[column] || false,
      sorter: (a, b) => a.key - b.key,
      defaultFilteredValue: data.map((d) => d[column]),
      ...getOverlayProps(
        column,
        (newSort) =>
          setSortOrders((s) => ({
            ...s,
            [column]: !s?.[column] ? newSort : s?.[column] === newSort ? false : newSort
          })),
        data.map((d) => d[column])
      )
    }));

  console.log({ data, columns });
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowPerPage={300}
      pagination={{ position: ["bottomCenter"], pageSize: 100  }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
