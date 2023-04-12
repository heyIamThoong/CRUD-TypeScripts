import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Tcategory } from "../../../types/category";


type Tprops = {
    onAdd: (newCategory: any) => void
}
const CategoryAdd = (props : Tprops) => {
  const onFinish = (values: Tcategory) => {
    props.onAdd(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
    <h2 className="text-center">Add Category</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }, {whitespace: true, message: "không được để trống"}]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CategoryAdd;
