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

interface SkillFormValues {
  skillName: string;
  department: string;
}

export const AddSkillForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState('skill');
  const [modal, contextHolder] = Modal.useModal();

  const showModal = (title: string, content: string, type: 'success' | 'error') => {
    modal[type]({
      title,
      content,
    });
  };

  const onFinish = async (values: SkillFormValues) => {
    console.log('Success:', values);
    try {
      const response = await axios.post('http://localhost:3020/skills/createSkill', values);
      if (response.status === 201) {
        console.log('Response:', response.data);
        setIsSaved(true);
        setIsButtonVisible(true);
        showModal('Success', 'Skill has been added successfully!', 'success');
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error: any) {
      console.error('There was an error adding the skill!', error);
      setIsSaved(false);
      setIsButtonVisible(false);

      if (error.response) {
        const { data } = error.response;
        showModal('Error', data.message || 'There was an error adding the skill!', 'error');
      } else {
        showModal('Error', 'There was an error adding the skill!', 'error');
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleNextSection = () => {
    if (currentSection === 'skill' && isSaved) {
      setCurrentSection('personal-details');
      navigate('/personal-details');
    }
  };

  const handlePreviousSection = () => {
    navigate('/academics');
  };

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        name="skillForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Skill Name"
          name="skillName"
          rules={[{ required: true, message: 'Please input the skill name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: 'Please input the department!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="default" onClick={handlePreviousSection} style={{ marginRight: '8px' }}>
            Previous Section
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
            Save
          </Button>
          <Button type="default" onClick={() => {}} style={{ marginRight: '8px' }}>
            Update
          </Button>
          {currentSection === 'skill' && isButtonVisible && (
            <Button type="default" onClick={handleNextSection}>
              Next Section
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};
