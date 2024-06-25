import React, { useState } from 'react';
import type { FormProps } from 'antd';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import { createTicket } from '@/utils/db'
const { RangePicker } = DatePicker; 
const { TextArea } = Input;

const NewTicket: React.FC = () => {

    const onFinish: FormProps<any>['onFinish'] = (values) => {
      console.log('Success:', values);
      createTicket(values)
    };
    
    const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name='title' label="Title">
          <Input />
        </Form.Item>
        <Form.Item name='priority' label="Priority">
          <Select>
            <Select.Option value={1}>Low</Select.Option>
            <Select.Option value={2}>Medium</Select.Option>
            <Select.Option value={3}>High</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='description' label="Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default () => <NewTicket />;