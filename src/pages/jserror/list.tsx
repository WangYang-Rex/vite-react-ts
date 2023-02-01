import './JsError.less';
import { keyBy } from 'lodash';
import React, { useRef, useState, useLayoutEffect } from 'react';
import Fetch from '../../lib/server/fetch'
import { Table, Tag, Space, Button, Modal, Form, Input, message ,Pagination,Select,Radio, Divider} from 'antd';
import dayjs from 'dayjs';
const { Option } = Select;
type InputRefKey='visible'|'user_name'|'terminal_type'|'corp_name'|'modifier_error'|'error_type'|'assign_user_name'

const { confirm } = Modal;


type InputRef={
  [key in InputRefKey]: string;
}


function JsErrorList() {
  const [list, setList] = useState<any>([]);
  const pageRef = useRef({
    page:1,
    pageSize: 20,
    count: 0
  });
  const inputRef=useRef<InputRef>({
    visible:'',
    user_name:'',	
    terminal_type:'',
    corp_name:'',
    modifier_error:'未修复',
    error_type:'',
    assign_user_name:''
  })
  const getList = async ()=>{
    let res = await Fetch.post('/error/list.rjson', {
      page: pageRef.current.page,
      pageSize: pageRef.current.pageSize,
      ...inputRef.current,

    });
    pageRef.current.count=res.count;
    setList(res.list);
  }
  const onClick=async (_id:string)=>{
		confirm({
			title: '确认',
			content: '是否确认标记为已修复?',
			okText: '确认',
			cancelText: '取消',
			onOk: async()=>{
				let res = await Fetch.post('/error/list/state.rjson', {
					id:_id
				});
				getList();
			},
			onCancel: ()=>{
				console.log('cancel')
			}
		})
  }
  const onClickAssignUserName= async (_id:string)=>{
    let assignUserName ='';
    const onChange=(e:any)=>{
      assignUserName=e.target.value;
    }
    confirm({
      title: '指派人员',
      content:<div>
        <Radio.Group onChange={onChange} >
              <Radio value={'黑草'}>黑草</Radio>
              <Radio value={'大洋'}>大洋</Radio>
              <Radio value={'林木'}>林木</Radio>
              <Radio value={'夏天'}>夏天</Radio>
              <Radio value={'天晴'}>天晴</Radio>
              <Radio value={'竹风'}>竹风</Radio>
              <Radio value={'迷雾'}>迷雾</Radio>
        </Radio.Group>
      </div>,
      onOk:async ()=> {
        let res = await Fetch.post('/error/assign/userName.rjson', {
          id:_id,
          assign_user_name:assignUserName,
        });
        getList();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  useLayoutEffect(()=>{
    getList()
  }, [])

  const columns:any = [
		{
      title: '错误等级',
      dataIndex: 'error_grade',
      key: 'error_grade',
      width: 100,
      fixed: 'left',
      ellipsis: true,
			render: (text:any, record:any)=>{
				const gradeMap = [
					{
						title: '紧急',
						classStr: 'red',
						grade: 'urgent'
					},
					{
						title: '高',
						classStr: 'orange',
						grade: 'high'
					},
					{
						title: '普通',
						classStr: '#1890ff',
						grade: 'general'
					}
				]
				const getGrade = ()=>{
					return keyBy(gradeMap, 'grade')[record.error_count >= 50 ? 'urgent' : record.error_count >= 1 && record.error_count < 10 ? 'general' : 'high'];
				}
				return <span style={{color: getGrade().classStr}}>
					{getGrade().title}
				</span>
			}
    },
		{
      title: '指定修复人员',
      dataIndex: 'assign_user_name',
      key: 'assign_user_name',
      width: 120,
    },
		{
      title: '错误信息',
      dataIndex: 'error_message',
      key: 'error_message',
      ellipsis: true,
      width: 350,
    },
		{
      title: '文件名称',
      dataIndex: 'file_name',
      key: 'file_name',
      width: 450,
      ellipsis: true,
    },
		{
      title: '行',
      dataIndex: 'line',
      key: 'line',
      width: 75,
      ellipsis: true,
    },
    {
      title: '列',
      dataIndex: 'column',
      key: 'column',
      width: 75,
      ellipsis: true,
    },
		{
      title: '状态',
      dataIndex: 'modifier_error',
      key: 'modifier_error',
      width: 100,
    },
		{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
		{
      title: '新错误次数',
      dataIndex: 'error_count',
      key: 'error_count',
      width: 120,
      ellipsis: true,
    },
		{
      title: '错误总次数',
      dataIndex: 'count',
      key: 'count',
      width: 120,
      ellipsis: true,
    },
    {
      title: '问题名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      ellipsis: true,
    },
		{
      title: '错误类型',
      dataIndex: 'error_type',
      key: 'error_type',
      width: 120,
      ellipsis: true,
    },
    
    {
      title: '环境',
      dataIndex: 'visible',
      key: 'visible',
      width: 80,
      ellipsis: true,
    },
    {
      title: '设备',
      dataIndex: 'terminal_type',
      key: 'terminal_type',
      width: 80,
      ellipsis: true,
    },
    
    {
      title: 'hash',
      dataIndex: 'hash',
      key: 'hash',
      width: 400,
      ellipsis: true,
    },
    {
      title: '唯一值',
      dataIndex: 'key',
      key: 'key',
      width: 200,
      ellipsis: true,
    },
    
    {
      title: '用户',
      dataIndex: 'user_name',
      key: 'user_name',
      width: 100,
      ellipsis: true,
    },
    {
      title: '企业',
      dataIndex: 'corp_name',
      key: 'corp_name',
      width: 140,
      ellipsis: true,
    },
    {
      title: '错误跟踪',
      dataIndex: 'log',
      key: 'log',
      width: 140,
      ellipsis: true,
    },
    {
      title: '时间',
      dataIndex: 'created',
      key: 'created',
      width: 200,
      ellipsis: true,
      render:(text:any)=>dayjs(text).format('YYYY-MM-DD HH:mm:ss') 
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (tags:any) => (
    //     <>
    //       {tags.map((tag:any) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
	
    {
      title: '操作',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (text:any, record:any) => (
        <Space size="middle">
          <a onClick={()=>onClick(record.id)}>修改</a>
          <a onClick={()=>onClickAssignUserName(record.id)}>指派修复人员</a>
        </Space>
      ),
    },
  ];

  let width = 0;
  columns.map((col:any) => {
    width = width + (col.width || 200) 
  })
  const onChange=(_page:number)=>{
    pageRef.current.page=_page;
    getList();
  };
  const onInputChange=(_key:InputRefKey,_value:any)=>{
    
    inputRef.current[_key]=_value;
  }
  return (
    <div className="main JsErrorList">
      <div className="content-header">
        环境：
        <Select className="mr_12" style={{ width: 120 }} defaultValue=''  onChange={(_value)=>onInputChange('visible',_value)}>
        <Option value="">所有</Option>
        <Option value="正式">正式</Option>
        <Option value="测试">测试</Option>
        </Select>
        状态：
        <Select className="mr_12" style={{ width: 120 }} defaultValue='未修复'  onChange={(_value)=>onInputChange('modifier_error',_value)}>
        <Option value="">所有</Option>
        <Option value="已修复">已修复</Option>
        <Option value="未修复">未修复</Option>
        </Select>
        错误类型：
        <Select className="mr_12" style={{ width: 120 }} defaultValue=''  onChange={(_value)=>onInputChange('error_type',_value)}>
        <Option value="">所有</Option>
        <Option value="js">js</Option>
        <Option value="compRenderError">compRenderError</Option>
        </Select>
        指派人员：
        <Select className="mr_12" style={{ width: 120 }} defaultValue=''  onChange={(_value)=>onInputChange('assign_user_name',_value)}>
        <Option value="">所有</Option>
        <Option value={'无'}>未指派人员</Option>
        <Option value={'黑草'}>黑草</Option>
        <Option value={'大洋'}>大洋</Option>
        <Option value={'林木'}>林木</Option>
        <Option value={'夏天'}>夏天</Option>
        <Option value={'天晴'}>天晴</Option>
        <Option value={'竹风'}>竹风</Option>
        <Option value={'迷雾'}>迷雾</Option>

        </Select>
        <Select className="mr_12" style={{ width: 120 }}  defaultValue='' onChange={(_value)=>onInputChange('terminal_type',_value)}>
        <Option value="">所有</Option>
        <Option value="mobile">mobile</Option>
        <Option value="pc">pc</Option>
        </Select>
        企业名称：<Input className="mr_12" style={{ width: 120 }}  onChange={(e)=>onInputChange('corp_name',e.target.value)}/>
        用户名称：<Input className="mr_12" style={{ width: 120 }}  onChange={(e)=>onInputChange('user_name',e.target.value)}/>
        <Button type="primary" className="mr_12" onClick={getList}>查询</Button>
      </div>
      <div className="content-table">
      <Table columns={columns} dataSource={list} scroll={{ x: width, y: window.innerHeight-200 }} pagination={false}/>
      </div>
      <div className="content-footer mt_12">
        <Pagination  size="small" total={pageRef.current.count} onChange={onChange} current={pageRef.current.page} pageSize={pageRef.current.pageSize} showTotal={(total,) =>`总条数${total}`} />
      </div>
    </div>
  );
}

export default JsErrorList;
