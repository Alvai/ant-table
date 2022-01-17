import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const getOverlayProps = (
  dataIndex,
  orderDirectionUpdater,
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters
  }) => (
    <CustomOverlay
      {...{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        dataIndex,
        orderDirectionUpdater,
      }}
    />
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: (value, record) => {
    return record[dataIndex]
      ? record[dataIndex]?.toString().toLowerCase().includes(value?.toString()?.toLowerCase())
      : "";
  }
});

const CustomOverlay = ({
  dataIndex,
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
  orderDirectionUpdater,
}) => {
  return (
    <div style={{ padding: 8 }}>
      <Button
        type="primary"
        onClick={() => {
          orderDirectionUpdater("ascend");
          confirm();
        }}
        size="small"
        style={{ width: 90, display: "block" }}
      >
        trier (1 ➞ 9)
      </Button>
      <Button
        type="primary"
        onClick={() => {
          orderDirectionUpdater("descend");
          confirm();
        }}
        size="small"
        style={{ width: 90, display: "block" }}
      >
        trier (9 ➞ 1)
      </Button>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys([e.target.value])}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            confirm();
          }}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            clearFilters();
          }}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false });
          }}
        >
          Filter
        </Button>
      </Space>
    </div>
  );
};
