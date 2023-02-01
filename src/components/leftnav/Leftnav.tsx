import React, { useState, useEffect } from "react";
import { Menu, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom'
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import './Leftnav.less'
const SubMenu = Menu.SubMenu;

type PropsType = {
  data: any
}
const Leftnav: React.ComponentType<PropsType> = (props) => {
  let navtgate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const toggleCollapsed = ()=>{
    setCollapsed(!collapsed);
  }
  const linkTo = (item:any)=>{
    console.log(item);
    const {key} = item;
    const hash = `/${key}`;
    
    navtgate(hash)
    // props.history.push(hash);
  }
  return (
    <div className="leftnav">
      <Menu onClick={(e)=>{ linkTo(e) }} mode={collapsed?'inline':'vertical'}>
        <Menu.Item key="home" >
          <span>首页</span>
        </Menu.Item>
        <Menu.Item key="jserror/list" >
          <span>JS日志系统</span>
        </Menu.Item>
        {/* <SubMenu key="jserror" icon={<MailOutlined />} title={ <span>JS日志系统</span> }>
          <Menu.Item key="jserror/list">JS日志列表</Menu.Item>
          <Menu.Item key="corp/tryout">试用企业</Menu.Item>
        </SubMenu> */}
        <Menu.Item key="slink/list" >
          <span>短链服务</span>
        </Menu.Item>
        <Menu.Item key="file/list" >
          <span>文件系统</span>
        </Menu.Item>
        <Menu.Item key="rank" >
          <span>github排名</span>
        </Menu.Item>
        <Menu.Item key="threejs" >
          <span>THREEJS</span>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Leftnav;