import React, { useEffect, useRef, useState } from "react";
import { Iprops } from "../../types/product";
import { Button, Input, InputRef, Space, Table } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";

import type { ColumnsType, ColumnType } from "antd/es/table";

import { SearchOutlined } from "@ant-design/icons";

import Highlighter from "react-highlight-words";
import type { FilterConfirmProps } from "antd/es/table/interface";

const AdminProductPage = (props: Iprops) => {
  console.log(props.product);
  
  const remove = (id: number) => {
    props.remove(id);
  };
  interface DataType {
    key: string;
    name: string;
    price: number;
    des: string;
    image: string;
  }

  const data = props.product.map((item) => {
    return {
      key: item._id,
      name: item.name,
      price: item.price,
      des: item.des,
      image: item.image,
      categoryId: item.categoryId,
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
    dataIndex: any
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: {
        compare: (a: any, b: any) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img src={image} alt="image" width={70} />,
    },
    {
      title: "Description",
      dataIndex: "des",
      key: "description",
    },
    Table.EXPAND_COLUMN,
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId: any) =>
        props.category.map((item) => (item._id == categoryId ? item.name : "")),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <a href={`/admin/product/${record.key}`}>
            <FormOutlined style={{ fontSize: "17px" }} />
          </a>
          <DeleteOutlined
            onClick={() => remove(record.key)}
            style={{ fontSize: "18px", color: "#800000" }}
          />
        </Space>
      ),
    },
  ];

  // tìm kiếm theo tên

  return (
    <Table
      className="container "
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0 }}>{record.des}</p>
        ),
      }}
    />
  );
};

export default AdminProductPage;

// (
//     <>
//       <h2 className="text-center text-danger-emphasis">List Sản phẩm</h2>
//       <table className="table table-hover text-center container">
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Name</th>
//             <th scope="col">Price</th>
//             <th scope="col">description</th>
//             <th scope="col">Action</th>
//           </tr>
//         </thead>
//         {props.product.map((item, index) => (
//           <>
//             <tbody>
//               <tr>
//                 <th scope="row">{index + 1}</th>
//                 <td>{item.name}</td>
//                 <td>{item.price}</td>
//                 <td>{item.description}</td>
//                 <td>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => remove(item._id)}
//                   >
//                     Xoá
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </>
//         ))}
//       </table>
//     </>
//   );
