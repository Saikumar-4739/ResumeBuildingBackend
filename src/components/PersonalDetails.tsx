import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Form, Input, DatePicker, Select, Typography, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Paragraph } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const PersonalDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = React.useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentSection, setCurrentSection] = React.useState(1);
  const [isEditing, setIsEditing] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSaved, setIsSaved] = React.useState(false);

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const formattedValues = { ...values };
      const response = await axios.post('http://localhost:3020/personal-details/create', formattedValues);
      console.log('Response:', response.data);

      setSubmittedData(formattedValues);
      setIsEditing(false);
      setIsSaved(true);
    } catch (error) {
      console.error('There was an error creating the personal details!', error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handlePrevious = () => {
    navigate('/skills');
  };


  const handleSave = () => {
    form.submit();
  };

  return (
    <div style={{ padding: '20px' }}>
      {currentSection === 1 && (
        <Form
          {...layout}
          form={form}
          name="personalDetails"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={submittedData || {}}
        >
          <Form.Item
            label="Father's Name"
            name="fatherName"
            rules={[{ required: true, message: 'Please input your father\'s name!' }]}
          >
            <Input type='text' />
          </Form.Item>

          <Form.Item
            label="Mother's Name"
            name="motherName"
            rules={[{ required: true, message: 'Please input your mother\'s name!' }]}
          >
            <Input type='text' />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            label="Marital Status"
            name="maritalStatus"
            rules={[{ required: true, message: 'Please select your marital status!' }]}
          >
            <Select placeholder="Select marital status">
              <Option value="single">Single</Option>
              <Option value="married">Married</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Languages Known"
            name="languagesKnown"
            rules={[{ required: true, message: 'Please input the languages you know!' }]}
          >
            <Input type='text' />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="default" onClick={handlePrevious} style={{ marginRight: '8px' }}>
              Previous Section
            </Button>
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            <Button type="default" onClick={() => {}} style={{ marginLeft: '10px' }}>
              Update
            </Button>
            {isEditing && (
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            )}
            </Form.Item>
        </Form>
      )}


      {submittedData && !isEditing && (
        <div style={{ marginTop: '20px' }}>
          <Paragraph><strong>Father's Name:</strong> {submittedData.fatherName}</Paragraph>
          <Paragraph><strong>Mother's Name:</strong> {submittedData.motherName}</Paragraph>
          <Paragraph><strong>Date of Birth:</strong> {new Date(submittedData.dateOfBirth).toLocaleDateString()}</Paragraph>
          <Paragraph><strong>Marital Status:</strong> {submittedData.maritalStatus}</Paragraph>
          <Paragraph><strong>Languages Known:</strong> {submittedData.languagesKnown}</Paragraph>
        </div>
      )}
    </div>
  );
};
