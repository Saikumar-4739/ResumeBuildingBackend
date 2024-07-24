import React, { useState } from 'react';
import { Form, Input, Button, Space, notification } from 'antd';
import axios from 'axios';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface AcademicRecord {
  id: number;
  institutionName?: string;
  passingYear?: string;
  qualification?: string;
  university?: string;
  percentage?: number;
}

export const AddAcademicsForm: React.FC = () => {
  const [form] = Form.useForm();
  const [academicRecords, setAcademicRecords] = useState<AcademicRecord[]>([{ id: Date.now() }]);
  const [isSaved, setIsSaved] = useState<boolean>(false); // State to track save status

  const saveAcademic = async (data: AcademicRecord) => {
    try {
      const response = await axios.post('http://localhost:3020/academics/create', data);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('There was an error creating the academic record!', error);
    }
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      for (const record of academicRecords) {
        const recordData = values[record.id];
        if (recordData) {
          await saveAcademic(recordData);
        }
      }
      setIsSaved(true);
      notification.success({
        message: 'Success',
        description: 'All academic records submitted successfully!',
      });
    } catch (error) {
      console.error('There was an error processing the academic records!', error);
      notification.error({
        message: 'Error',
        description: 'There was an error processing the academic records!',
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    notification.error({
      message: 'Error',
      description: 'There was an error with your submission!',
    });
  };

  const addAcademicRecord = () => {
    setAcademicRecords([...academicRecords, { id: Date.now() }]);
  };

  const removeAcademicRecord = (id: number) => {
    setAcademicRecords(academicRecords.filter(record => record.id !== id));
  };

  const handleSave = () => {
    form.submit();
  };

  const handleUpdate = () => {
    form.submit();
  };

  const handleNextSection = () => {
    window.location.href = '/skills';
  };

  const handlePreviousSection = () => {
    window.location.href = '/experience';
  };

  return (
    <Form
      {...layout}
      form={form}
      name="academics"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {academicRecords.map(record => (
        <div key={record.id} style={{ marginBottom: '20px' }}>
          <Form.Item
            label="Institution Name"
            name={[record.id, 'institutionName']}
            rules={[{ required: true, message: 'Please input the institution name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Passing Year"
            name={[record.id, 'passingYear']}
            rules={[{ required: true, message: 'Please input the passing year!' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Qualification"
            name={[record.id, 'qualification']}
            rules={[{ required: true, message: 'Please input your qualification!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="University"
            name={[record.id, 'university']}
            rules={[{ required: true, message: 'Please input the university!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Percentage"
            name={[record.id, 'percentage']}
            rules={[{ required: true, message: 'Please input your percentage!' }]}
          >
            <Input type="number" step="0.01" />
          </Form.Item>

          <Space>
            {academicRecords.length > 1 && (
              <Button onClick={() => removeAcademicRecord(record.id)}>
                Remove
              </Button>
            )}
          </Space>
        </div>
      ))}

      <Form.Item {...tailLayout}>
        <Space>
          <Button type="dashed" onClick={addAcademicRecord}>
            Add More
          </Button>
          <Button type="default" onClick={handlePreviousSection}>
            Previous Section
          </Button>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
          <Button type="default" onClick={handleUpdate}>
            Update
          </Button>
          {isSaved && (
            <Button type="default" onClick={handleNextSection}>
              Next Section
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};
