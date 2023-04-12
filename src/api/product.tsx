import { Tproduct } from "../types/product";
import instance from "./instance";

const getAll = () => {
  return instance.get("/products");
};

const getOne = (id: number | string) => {
  return instance.get(`/products/` + id);
};

const create = (newProduct: Tproduct) => {
  return instance.post(`/products`, newProduct);
};

const deleteProduct = (id: number) => {
  return instance.delete(`/products/` + id);
};

const updateProduct = (product: Tproduct) => {
  return instance.put(`/products/${product._id}`, product);
};

export { getAll, getOne, create, deleteProduct, updateProduct };
