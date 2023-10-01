import React, { useEffect, useState } from 'react'
//import Search from 'antd/lib/transfer/search'
import { Badge, Col, Image ,Popover,Row,} from 'antd';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount ,WrapperTextHeader,WrapperTextHeaderSmall} from './style';
import {UserOutlined,CaretDownOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import ButtonSearch from '../ButtonSearch/ButtonSearch.jsx';
import imageProductsmall from '../../assets/images/brand.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser, updateUser } from '../../redux/slides/userSlide'
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { Mutation } from '@tanstack/react-query';
import { searchProduct } from '../../redux/slides/productSlide';

const HeaderComponent = ({isHiddenSearch = false, isHiddenCart= false}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [Loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [search, setSearch] = useState('')
  const user = useSelector((state) => state.user)
  const handleNavigateLogin = () => {
      navigate('/sign-in')
  }
  const handleNavigateHome = () => {
    navigate('/')
  }
  //const { data} = mutation
  const handleLogout = async() => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
    localStorage.removeItem('access_token')
  }
  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setLoading(false)
  },[user?.name])
  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate('/admin')}>Quản lý hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  );
  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }
  return (
    <div >
      <WrapperHeader style={{justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset'}}>
      <Row span ={8}>
          <Col >
          <WrapperTextHeader>
            <Image style={{width:'120px', height:'50px',cursor: 'pointer'}} onClick={handleNavigateHome} src={imageProductsmall} alt="image small " preview={false}/></WrapperTextHeader>
          </Col>
        </Row>
        
        {!isHiddenSearch && (
          <Col span={12}>
            <ButtonSearch
              size="large"
              style={{marginLeft:'20px', borderRadius: '0px'}}
              textButton="Tìm kiếm"
              placeholder="input search text" 
              onChange={onSearch}
              />
          </Col>
        )}
        <Col span={6} style={{display:'flex', gap:'54px',alignItems:'center'}}>
        <LoadingComponent isLoading={Loading}>
          <WrapperHeaderAccount>
          <UserOutlined style={{fontSize: '30px'}} /> 
          {user?.access_token ? (
          <>
            <Popover content={content}  trigger="click">
                <div id = "user-name" style={{cursor: 'pointer', fontWeight:'bold'}}>{userName?.length ? userName : user?.email}</div>
            </Popover>
          </>
            ): (
            <div onClick={handleNavigateLogin} style={{cursor: 'pointer'}}>
              <WrapperTextHeaderSmall>Đăng nhập / Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          )}
            
          </WrapperHeaderAccount>
        </LoadingComponent>
        {!isHiddenCart &&(
          <div onClick={() => navigate('/oder')} style={{cursor: 'pointer'}}>
            <Badge count={4} size= 'small'>
              <ShoppingCartOutlined style={{fontSize: '30px', color:'#fff'}}/>
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        )}
        </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent