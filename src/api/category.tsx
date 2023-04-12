import { Tcategory } from "../types/category";
import instance from "./instance";

const getAllCategory = () => {
  return instance.get("/categories");
};

const getOneCategory = (id: number | string) => {
  return instance.get("/categories/" + id);
};

const createCategory = (newCategory : Tcategory) => {
  return instance.post(`/categories`, newCategory)
}

const deleteCategory = (id: number | string) => {
  return instance.delete("/categories/" + id)
}

const updateCategory = (category : Tcategory) => {
  return instance.put("/categories/" + category._id, category)
}


export { getAllCategory, getOneCategory, createCategory, deleteCategory, updateCategory}