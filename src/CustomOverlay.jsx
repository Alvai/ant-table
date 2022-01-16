import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Input, Button, Space, Checkbox } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const getOverlayProps = (
  dataIndex,
  orderDirectionUpdater,
  allValues
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
        allValues
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
  allValues
}) => {
  const [searchValue, setSearchValue] = useState("");
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
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
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
      <div
        style={{
          maxWidth: "260px"
        }}
      >
        <Checkbox.Group
          options={allValues
            .slice(0, 10)
            .filter((d) => d?.toLowerCase().includes(searchValue?.toLowerCase()))}
          defaultValue={selectedKeys}
          onChange={(values) => {
            setSelectedKeys(values);
          }}
        />
      </div>
    </div>
  );
};
