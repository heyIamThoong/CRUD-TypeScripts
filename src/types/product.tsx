import { Tcategory } from "./category";

export type Tproduct = {
  _id: number,
  name: string,
  price: number,
  description: string,
  image: string,
  categoryId: string
};

// type list sản phẩm
export type Iprops = {
  product: Tproduct[];
  remove: (id: number) => void;
  category: Tcategory[]
};


// type add sản phẩm
export type TpropsAdd = {
  handleAdd: (newproduct: Tproduct) => void;
  category: Tcategory[]
};

export type TproductAdd = {
    name: string,
    price: number
}
