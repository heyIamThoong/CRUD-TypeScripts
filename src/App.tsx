import { useState, useEffect } from "react";

import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./page/HomePage";
import ProductPage from "./page/ProductPage";
import DetailPage from "./page/DetailPage";
import { getAll, deleteProduct, create, updateProduct } from "./api/product";
import { Tproduct } from "./types/product";
import AdminProductPage from "./page/admin/AdminProductPage";
import Dashh from "./page/admin/Dashh";
import AdminAddProduct from "./page/admin/AdminAddProduct";
import { useNavigate } from "react-router-dom";
import Signup from "./page/Signup";
import { signin, signup } from "./api/user";

import UpdateAdminProduct from "./page/admin/UpdateAdminProduct";
import Signin from "./page/Signin";
import CategoryAdd from "./page/admin/category/CategoryAdd";
import { Tcategory } from "./types/category";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "./api/category";
import CategoryList from "./page/admin/category/CategoryList";
import LayoutAdmin from "./layout/LayoutAdmin";
import CategoryUpdate from "./page/admin/category/CategoryUpdate";
import 'antd/dist/reset.css';
import LayoutClient from "./layout/client/LayoutClient";

function App() {
  const [product, setProduct] = useState<Tproduct[]>([]);
  const [category, setCategory] = useState<Tcategory[]>([]);
  const navigate = useNavigate();

  // Quản trị product

  useEffect(() => {
    getAll().then(({data}) => setProduct((data)));
    
  }, []);
  
  const handRemove = (id: number) => {
    if (confirm("bạn có muốn xoá không")) {
      deleteProduct(id).then(() => {
        const newProduct = product.filter((item) => item._id != id);
        setProduct(newProduct);
      });
    }
  };
  const handleAdd = (newProduct: Tproduct) => {
    create(newProduct).then(() => {
      getAll().then(({ data }) => setProduct(data));
      alert("Thêm sản phẩm thành công");
      navigate("/admin/product");
    });
  };
  const handUpdate = (newProduct: Tproduct) => {
    console.log(newProduct);
    
    updateProduct(newProduct).then(() => {
      setProduct(
        product.map((item) => (item._id == newProduct._id ? newProduct : item))
      );
      alert("Cập nhật sản phẩm thành công");
      navigate("/admin/product");
    });
  };

  // Đăng nhập đăng ký
  const handleSignup = (user: any) => {
    signup(user).then(() => {
      alert("bạn đã đăng ký thành công");
      navigate("/signin");
    });
  };
  const handleSingIn = (user: any) => {
    signin(user).then(({ data }) => {
      localStorage.setItem("user", JSON.stringify(data.accessToken));
      alert("Đăng nhập thành công");
      navigate("/admin/product");
    });
  };

  // check quyền chặn route admin

  const Check = () => {
    return localStorage.getItem("user") ? (
      <Outlet />
    ) : (
      (alert("Đăng nhập đi đã"), navigate("/"))
    );
  };

  // quản trị category
  useEffect(() => {
    getAllCategory().then(({ data }) => setCategory(data));
  }, []);

  const addCategory = (newCategory: Tcategory) => {
    createCategory(newCategory).then(() => {
      getAllCategory().then(({ data }) => setCategory(data));
      alert("Add category thành công");
      navigate("/admin/category");
    });
  };
  const removeCategory = (id: number | string) => {
    if (confirm("bạn có muốn xoá không")) {
      deleteCategory(id).then(() => {
        setCategory(category.filter((item) => item._id != id));
      });
    }
  };
  const onUpdate = (newCategory: Tcategory) => {
    updateCategory(newCategory).then(() => {
      setCategory(
        category.map((item) =>
          item._id == newCategory._id ? newCategory : item
        )
      );
      alert("Update Category thành công");
      navigate("/admin/category");
    });
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<HomePage />} />
          <Route path="product">
            <Route index element={<ProductPage product={product} />} />
            <Route path=":id" element={<DetailPage product={product} />} />
          </Route>
          <Route
            path="signup"
            element={<Signup handleSignUp={handleSignup} />}
          />
          <Route
            path="signin"
            element={<Signin handleSignIn={handleSingIn} />}
          />
          <Route path="layout" element={<LayoutAdmin />} />
        </Route>
        <Route path="admin" element={((<Check />), (<LayoutAdmin />))}>
          <Route index element={<Dashh />} />
          <Route path="product">
            <Route
              index
              element={
                <AdminProductPage
                  product={product}
                  remove={handRemove}
                  category={category}
                />
              }
            />
            <Route
              path="add"
              element={
                <AdminAddProduct handleAdd={handleAdd} category={category} />
              }
            />
            <Route
              path=":id"
              element={
                <UpdateAdminProduct
                  product={product}
                  handleUpdate={handUpdate}
                  category={category}
                />
              }
            />
          </Route>
          // router category
          <Route path="category">
            <Route path="add" element={<CategoryAdd onAdd={addCategory} />} />
            <Route
              index
              element={
                <CategoryList category={category} remove={removeCategory} />
              }
            />
            <Route
              path=":id"
              element={<CategoryUpdate update={onUpdate} category={category} />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
