import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { useParams } from "react-router-dom";

import { Tcategory } from "../../../types/category";

type Props = {
  update: (newCategory: Tcategory) => void;
  category: Tcategory[];
};

const CategoryUpdate = (props: Props) => {
  const { id } = useParams();
  const [category, setCategory] = useState<Tcategory>();
  useEffect(() => {
    const data = props.category.find((item) => item._id == id);
    setCategory(data);
  }, [props.category]);

  useEffect(() => {
    setFields();
  }, [category]);

  const [form]: any = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      _id: category?._id,
      name: category?.name,
    });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

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

  const onSubmit = (data: any) => {
    props.update(data)
    // console.log(data);
  };
  return (
    <>
      <h2 className="text-center text-danger-danger-emphasis">
        Update Category
      </h2>
      <Form
        {...layout}
        name="nest-messages"
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item name="_id" label="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true },{whitespace: true, message: "không được để trống"}]}>
          <Input />
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

export default CategoryUpdate;
