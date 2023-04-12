import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';

type props = {
  handleSignUp: (user: any) => void
}
const Signup = (props: props) => {

  const onFinish = (values: any) => {
    props.handleSignUp(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h2 className='text-center'>Đăng ký</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className='container '
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }, { whitespace: true, message: "không được để trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your password!' }, { type: 'email' }, { whitespace: true, message: "không được để trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="ConfirmPassword"
          name="comfirmPassword"
          rules={[{ required: true, message: 'Please input your ConfirmPassword!' }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>

  )
}

export default Signup