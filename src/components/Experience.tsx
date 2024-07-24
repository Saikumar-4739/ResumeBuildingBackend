import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const AddExperienceForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const formattedValues = { ...values };
      const response = await axios.post('http://localhost:3020/experiences/createExp', formattedValues);
      console.log('Response:', response.data);
      notification.success({
        message: 'Success',
        description: 'Experience submitted successfully!',
      });
      setIsSaved(true);
    } catch (error) {
      console.error('There was an error creating the experience!', error);
      notification.error({
        message: 'Error',
        description: 'There was an error creating the experience!',
      });
      setIsSaved(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    notification.error({
      message: 'Error',
      description: 'There was an error with your submission!',
    });
  };

  const handleSave = () => {
    form.submit();
  };

  const handleUpdate = () => {
    form.submit();
  };

  const handleNextSection = () => {
    if (isSaved) {
      navigate('/academics');
    } else {
      notification.warning({
        message: 'Warning',
        description: 'Please save your data before proceeding!',
      });
    }
  };

  const handlePreviousSection = () => {
    navigate('/user-form');
  };

  return (
    <Form
      {...layout}
      form={form}
      name="experience"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Objective"
        name="objective"
        rules={[{ required: true, message: 'Please input your objective!' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[{ required: true, message: 'Please input the company name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: 'Please input your role!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="From Year"
        name="fromYear"
        rules={[{ required: true, message: 'Please input the starting year!' }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="To Year"
        name="toYear"
        rules={[{ required: true, message: 'Please input the ending year!' }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input a description!' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="default" onClick={handlePreviousSection} style={{ margin: '0 8px' }}>
          Previous Section
        </Button>
        <Button type="primary" onClick={handleSave} style={{ margin: '0 8px' }}>
          Save
        </Button>
        <Button type="default" onClick={handleUpdate} style={{ margin: '0 8px' }}>
          Update
        </Button>
        {isSaved && (
          <Button type="default" onClick={handleNextSection} style={{ margin: '0 8px' }}>
            Next Section
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
