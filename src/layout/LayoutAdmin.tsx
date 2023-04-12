import React from 'react';
import { LaptopOutlined, BarsOutlined , UserOutlined } from '@ant-design/icons';
import { Button, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const product = [
  {
    id: 1,
    link: "/admin/product",
    title: "List Sản phẩm"
  },
  {
    id: 2,
    link: "/admin/product/add",
    title: "Add Sản phẩm"
  },
  {
    id: 3,
    link: "/admin/product/:id",
    title: "Update Sản phẩm"
  },

]
const category = [
  {
    id: 1,
    link: "/admin/category",
    title: "List danh mục"
  },
  {
    id: 2,
    link: "/admin/category/add",
    title: "Add danh mục"
  },
  {
    id: 3,
    link: "/admin/category/:id",
    title: "Update danh mục"
  },
]
const itemsProduct: MenuProps['items'] = [LaptopOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `Sản phẩm`,

      children: product.map((item, index) => {
        return {
          key: index + 1,
          label: <Link style={{textDecoration: "none"}} to={item.link}>{item.title}</Link>,
        };
      }),
    };
  },
);

// const itemsUser: MenuProps['items'] = [UserOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);

//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,

//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: <Link style={{textDecoration: "none"}} to={"/admin/product"}>List sản phẩm</Link>,
//         };
//       }),
//     };
//   },
// );

const itemCategory: MenuProps['items'] = [BarsOutlined ].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `Category`,

      children: category.map((item, index) => {
        return {
          key: index + 1,
          label: <Link style={{textDecoration: "none"}} to={item.link}>{item.title}</Link>,
        };
      }),
    };
  },
);

const LayoutAdmin: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const Check = () => {
    return localStorage.getItem("user") ? (
      <Outlet />
    ) : (
      (alert("Đăng nhập đi đã"), navigate("/"))
    );
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            style={{ borderRight: 0 }}
            items={itemsProduct}
          />
          {/* <Menu
            mode="inline"
            style={{ borderRight: 0 }}
            items={itemsUser}
          /> */}
         
          <Menu
            mode="inline"
            style={{ borderRight: 0 }}
            items={itemCategory}
          />
           <Button style={{ marginLeft: 50 }} type="primary" htmlType="submit">
            <a href="/">Đăng Xuất</a>
          </Button>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Check/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;