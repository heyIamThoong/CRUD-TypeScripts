import React, { useRef, useState } from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Tcategory } from "../../../types/category";

import { Button, Input, InputRef, Space, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { FilterConfirmProps } from "antd/es/table/interface";
type Props = {
    category: Tcategory[],
    remove: (id : number | string) => void
};

const CategoryList = (props: Props) => {

    const remove = (id : number | string) => {
        props.remove(id);
    }

  const data = props.category.map((item) => {
    return {
      key: item._id,
      name: item.name,
    };
  });


  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (
    dataIndex : any
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="default"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <a href={`/admin/category/${record.key}`}>
            <FormOutlined />
          </a>
          <DeleteOutlined
            onClick={() => remove(record.key)}
            style={{ fontSize: "16px", color: "#08c" }}
          />
        </Space>
      ),
    },
  ];

  return(
    <>
    <h2 className="text-center ">List Category</h2>
    <Table className="container " columns={columns} dataSource={data} />;
    </>
  ) 
};

export default CategoryList;
