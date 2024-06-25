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
  Tag, Table
} from 'antd';
import { getMyTickets } from '@/utils/db'
const { RangePicker } = DatePicker; 
const { TextArea } = Input;
import moment from 'moment';

const MyTickets: React.FC = () => {
const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
const [data, setData] = useState<any>([])


async function handleTickets(){
    const payload = await getMyTickets()
    setData(payload)
    console.log(payload)
}

    // rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };


  React.useEffect(()=>{
    handleTickets();
  },[])

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
        render: (text: any)=> {
            let color = text > 2 ? 'geekblue' : 'green';
            if (text === 1) {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={text}>
                {text}
              </Tag>
            );
        }
    },
    {
        title: 'Status',
        dataIndex: 'status'
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
        title: 'Created',
        dataIndex: 'datecreated',
        render: (text: any)=> <>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</>
    },
    {
        title: 'Modified',
        dataIndex: 'datemodified',
        render: (text: any)=> <>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</>
    },
  ];

  return (
    <>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        key={data.id}
      />
    </>
  );
};

export default () => <MyTickets />;