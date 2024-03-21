//import './App.css'

import { useState, useEffect } from 'react'
import { Button, Layout, } from 'antd'

import {
   useBreakpointValue,
} from '@chakra-ui/react'

import { Breadcrumb, Dropdown, Spin } from 'antd';

import { MenuUnfoldOutlined, MenuOutlined } from "@ant-design/icons";
import Logo from '../components/Logo';
import MenuList from '../components/MenuList';
import PanelUser from '../components/PanelUser';

import { NavLink } from "react-router-dom";

const { Sider, Header, Content } = Layout;

const NavBar = ({ children, bread }) => {

   const mobile = useBreakpointValue({ base: true, md: false });
   const [collapsed, setCollapsed] = useState(null);

   useEffect(() => {
      setCollapsed(mobile ? true : false)
   }, [mobile])

   return (
      <Layout>
         <Sider collapsed={collapsed} collapsible trigger={null} theme='light' className='side-bar' style={{ borderWidth: 0.5 }}>
            <Logo />
            <MenuList setCollapsed={setCollapsed} collapsed={collapsed} />
            {/*<PanelUser />*/}
         </Sider>
         <Layout>
            <Header className='bg-white' style={{ padding: 0, flexDirection: 'row', display: 'flex', alignItems: 'center', borderBottomWidth: 0.5, paddingLeft: 3 }}>
               <Button
                  type='text'
                  style={{ color: 'gray' }}
                  onClick={() => setCollapsed(!collapsed)}
                  icon={collapsed ? <MenuOutlined /> : <MenuUnfoldOutlined />}
               />
               <Breadcrumb>
                  {bread.map((item, index) => (
                     <Breadcrumb.Item key={`${item}-${index}`} className='bread-crumb'>
                        {item?.path ? <NavLink to={`/${item?.path}`}>{item?.label} </NavLink> : item?.label}
                     </Breadcrumb.Item>
                  ))}
               </Breadcrumb>
            </Header>
            <Content style={{ backgroundColor: 'rgb(248,248,248)'}}>
               {children}
            </Content>
         </Layout>
      </Layout>
   )
}

export default NavBar
