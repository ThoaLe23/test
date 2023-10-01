import { Menu } from 'antd'
import React from 'react'
import { useState } from 'react';
import { getItem } from '../../utils';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';

const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'user', <UserOutlined /> ),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />)
  ];
  const [KeySelected, setKeySelected] = useState(['user']);
  
  const renderPage = (key) => {
    switch(key) {
      case 'user':
        return(
          <AdminUser/>
        )
      case 'product':
        return(
          <AdminProduct/>
      )
      default:
        return <></>
    }
  }

  const handleOnClick = ({key }) => {
    setKeySelected(key)
  }
  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart/>
      <div style={{display:'flex'}}>
        <Menu
        mode="inline"
        style={{
          width: 256,
          boxShadow: '1px 1px 1px #ccc',
          height:'100vh'
        }}
        items={items}
        onClick={handleOnClick}
      />
      <div style={{flex:'1', padding:'15px'}}>
        {renderPage(KeySelected)}
       
      </div>
      </div>
    </>
  )
}

export default AdminPage