import React, { useState } from "react";
import { TpropsAdd } from "../../types/product";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
const AdminAddProduct = (props: TpropsAdd) => {
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
    props.handleAdd(values);
    // console.log(values);

  };
  return (
    <>
      <h2 className="text-center text-danger-danger-emphasis">Thêm sản phẩm</h2>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }, {whitespace: true, message: "không được để trống"}]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ type: "number" }, { required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}>
        
            <Select
              defaultValue=""
              style={{ width: 120 }}
              options={props.category.map((item) => (
                { value: `${item._id}`, label: `${item.name}` }
              ))}
            />
          
        </Form.Item>
        <Form.Item name="image" label="Image" rules={[{ required: true }, {whitespace: true, message: "không được để trống"}]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="des"
          label="Description"
          rules={[{ required: true }, {whitespace: true, message: "không được để trống"}]}
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

export default AdminAddProduct;
{
  /* <form action="" className="container" onSubmit={handleSubmit(add)}>
        <label htmlFor="" className="form-label">
          Name
        </label>
        <input type="text" className="form-control" {...register("name", {required: true})} />
        {errors.name && <span>Name không được để trống</span>}
        <label htmlFor="" className="form-label">
          Price
        </label>
        <input type="text" className="form-control" {...register("price", {required: true})} />
        {errors.price && <span>Price không được để trống</span>}
        <label htmlFor="" className="form-label">
        description
        </label>
        <input type="text" className="form-control" {...register("description", {required: true})} />
        {errors.price && <span>description không được để trống</span>}
        <br />
        <button className="btn btn-primary">Add</button>
      </form> */
}
