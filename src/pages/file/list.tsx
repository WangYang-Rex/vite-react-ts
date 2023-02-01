import './file.less';
import React, { useRef, useState, useLayoutEffect } from 'react';
import Fetch from '../../lib/server/fetch'
import { Table, Space, Button, Modal, Input, message, Pagination, Select, Upload } from 'antd';
import dayjs from 'dayjs';
const { Option } = Select;

const { confirm } = Modal;


function FileList() {
  const [list, setList] = useState<any>([]);
  const pageRef = useRef({
    page: 1,
    pageSize: 20,
    count: 0
  });
  const getList = async () => {
    let res = await Fetch.post('/file/list.rjson', {
      page: pageRef.current.page,
      pageSize: pageRef.current.pageSize,
    });
    pageRef.current.count = res.count;
    setList(res.list);
  }
  const onDelClick = async (_id: string) => {
    let res = await Fetch.post('/file/delete.rjson', {
      id:_id
    });
    getList();
  }

  useLayoutEffect(() => {
    getList()
  }, [])

  const columns: any = [
    {
      title: '文件名称',
      dataIndex: 'filename',
      key: 'filename',
      width: 240,
      ellipsis: true,
    },
    {
      title: 'cdn地址',
      dataIndex: 'cdnurl',
      key: 'cdnurl',
      // width: 120,
      ellipsis: true,
      render: (text: any) => {
        return (
          <a href={text} target="_blank" rel="noreferrer">{text}</a>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
      width: 200,
      ellipsis: true,
      render: (text: any) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: 'Action',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (text: any, record: any) => (
        <Space size="middle">
          <a onClick={() => onDelClick(record.id)}>删除</a>
        </Space>
      ),
    },
  ];

  let width = 0;
  columns.map((col: any) => {
    width = width + (col.width || 200)
  })
  const onChange = (_page: number) => {
    pageRef.current.page = _page;
    getList();
  };
  const onInputChange = (_key: string, _value: any) => {
    // inputRef.current[_key] = _value;
  }

  const UploadProps: any = {
    name: 'file',
    action: "/file/upload/stream.rjson", // "/file/upload/file.rjson",
    method: "POST",
    listType: 'picture',
    showUploadList: false,
    onChange: (info: any) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        // this.setState({
        //   picUrl:info.file.response.data,
        // })
        console.log(info);
        message.success(`上传成功`);
        getList();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.response.data} 上传失败`);
      }
    },
  };

  return (
    <div className="main JsErrorList">
      <div className="content-header">
        文件名称：<Input className="mr_12" style={{ width: 120 }} onChange={(e) => onInputChange('filename', e.target.value)} />
        {/* 用户名称：<Input className="mr_12" style={{ width: 120 }}  onChange={(e)=>onInputChange('user_name',e.target.value)}/> */}
        <Button type="primary" className="mr_12" onClick={getList}>查询</Button>
        <Upload {...UploadProps} >
          <Button type="primary" >
              上传图片
          </Button>
        </Upload>
      </div>
      <div className="content-table">
        <Table columns={columns} dataSource={list} scroll={{ x: width, y: window.innerHeight - 200 }} pagination={false} />
      </div>
      <div className="content-footer mt_12">
        <Pagination size="small" total={pageRef.current.count} onChange={onChange} current={pageRef.current.page} pageSize={pageRef.current.pageSize} showTotal={(total,) => `总条数${total}`} />
      </div>
    </div>
  );
}

export default FileList;
