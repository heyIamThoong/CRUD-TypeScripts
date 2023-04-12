import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { Tproduct } from "../../types/product";
import { useParams } from "react-router-dom";
import { getOne } from "../../api/product";
import { useForm } from "react-hook-form";
import { Tcategory } from "../../types/category";

type Props = {
  handleUpdate: (newproduct: Tproduct) => void;
  product: Tproduct[];
  category: Tcategory[];
};

const UpdateAdminProduct = (props: Props) => {
  const { id } = useParams();
  const [product, setProduct] = useState<Tproduct>();
console.log(props);

  useEffect(() => {
    const data = props.product.find((item) => item._id == id)
    setProduct(data)
  }, [props.product]);

  useEffect(() => {
    setFields();
  }, [product]);

  const [form]: any = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      _id: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.image,
      des: product?.des,
      categoryId: product?.categoryId
    });
  };

  
    
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const { TextArea } = Input;

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: any) => {
    props.handleUpdate(values);
    console.log(values);
    
  };

  return (
    <>
      <h2 className="text-center text-danger-danger-emphasis">Update sản phẩm</h2>
      <Form
        {...layout}
        name="nest-messages"
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item name="_id" label="id" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true },{whitespace: true, message: "không được để trống"}]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ type: "number" }, { required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Danh mục"
          rules={[{ required: true }]}
        >
          {/* <select name="" id="">
            {props.category.map((item) => (
              <option value={item._id}>{item.name}</option>
            ))}
            <option value=""></option>
          </select> */}

          
            <Select
              style={{ width: 120 }}
              options={props.category.map((item) => (
                { value: `${item._id}`, label: `${item.name}` }
              ))}
            />
          
        </Form.Item>
        <Form.Item name="image" label="Image" rules={[{ required: true },{whitespace: true, message: "không được để trống"}]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="des"
          label="Description"
          rules={[{ required: true },{whitespace: true, message: "không được để trống"}]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateAdminProduct;
