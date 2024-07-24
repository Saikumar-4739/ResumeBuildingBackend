import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const AddUserForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [isSaved, setIsSaved] = useState(false); // State to track if form is saved
  const [isButtonVisible, setIsButtonVisible] = useState(false); // State to control button visibility
  const [modal, contextHolder] = Modal.useModal();

  const showModal = (title: string, content: string, type: 'success' | 'error') => {
    modal[type]({
      title,
      content,
    });
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const formattedValues = {
        ...values,
        address: [
          {
            street: values.address.street,
            city: values.address.city,
            state: values.address.state,
            country: values.address.country,
            zipcode: values.address.zipcode,
          },
        ],
      };
      const response = await axios.post('http://localhost:3020/users/createUser', formattedValues);
      if (response.status === 201) {
        console.log('Response:', response.data);
        setIsSaved(true); // Set isSaved to true after successful form submission
        setIsButtonVisible(true); // Make the Next Section button visible
        showModal('Success', 'User has been created successfully!', 'success');
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error: any) {
      console.error('There was an error creating the user!', error);
      setIsSaved(false);
      setIsButtonVisible(false); // Hide the button if there's an error

      if (error.response) {
        const { data } = error.response;
        if (data.message === 'User with this email already exists') {
          showModal('Error', 'User with this email already exists', 'error');
        } else if (data.message === 'Address is missing or invalid') {
          showModal('Error', 'Address is missing or invalid', 'error');
        } else {
          showModal('Error', 'There was an error creating the user!', 'error');
        }
      } else {
        showModal('Error', 'There was an error creating the user!', 'error');
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleNextSection = () => {
    if (isSaved) {
      navigate('/experience');
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Full Name"
          name="uname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobileNo"
          rules={[{ required: true, message: 'Please input your mobile number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Street"
          name={['address', 'street']}
          rules={[{ required: true, message: 'Please input your street!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="City"
          name={['address', 'city']}
          rules={[{ required: true, message: 'Please input your city!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="State"
          name={['address', 'state']}
          rules={[{ required: true, message: 'Please input your state!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Country"
          name={['address', 'country']}
          rules={[{ required: true, message: 'Please input your country!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Zip Code"
          name={['address', 'zipcode']}
          rules={[{ required: true, message: 'Please input your zip code!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          {isButtonVisible && (
            <Button type="default" onClick={handleNextSection} style={{ marginLeft: '10px' }}>
              Next Section
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};
