import React, { useEffect, useState } from 'react'
//import Search from 'antd/lib/transfer/search'
import { Badge, Col, Image ,Popover,Row,} from 'antd';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount ,WrapperTextHeader,WrapperTextHeaderSmall} from './style';
import {UserOutlined,CaretDownOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import ButtonSearch from '../ButtonSearch/ButtonSearch.jsx';
import logo from '../../assets/images/brand.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser, updateUser } from '../../redux/slides/userSlide'
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { Mutation } from '@tanstack/react-query';
import { searchProduct } from '../../redux/slides/productSlide';
import { removeAllOrderProduct } from '../../redux/slides/orderSlide';

const HeaderComponent = ({isHiddenSearch = false, isHiddenCart= false}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [Loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [isOpenPopup , setIsOpenPopup] = useState(false)
  const [search, setSearch] = useState('')
  const order = useSelector((state) => state.order)
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
    const arrayOrdered = []
      order?.orderItems?.forEach(element => {
        arrayOrdered.push(element.product)
      });
      dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
    setLoading(false)
    navigate('/')
    localStorage.removeItem('access_token')
    localStorage.clear()
    window.location.reload(true)
  }
  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setLoading(false)
  },[user?.name])

  const content = (
    <div>
      <WrapperContentPopup id='profile' onClick={() =>  handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() =>  handleClickNavigate('admin')}>Quản lý hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup id='my-order' onClick={() =>  handleClickNavigate('my-order')}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup id='log-out' onClick={() =>  handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if(type === 'profile'){
      navigate('/profile-user')
    }else if(type === 'admin'){
      navigate('/admin')
    }else if( type === 'my-order'){
      navigate('/my-order', {state: {
         id: user?.id,
        token: user?.access_token
      }
      })
    }else{
      handleLogout()
    }
    setIsOpenPopup(false)
  }

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }
  const handleOrder = () =>{
    if(!user?.id){
      navigate('/sign-in')
    }
    else {
      navigate('/oder')
    }
  }
  return (
    <div >
      <WrapperHeader style={{justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset'}}>
      <Row span ={8}>
          <Col >
          <WrapperTextHeader>
            <Image id="logo-shop" style={{width:'120px', height:'50px',cursor: 'pointer'}} onClick={handleNavigateHome} src={logo} alt="image small " preview={false}/></WrapperTextHeader>
          </Col>
        </Row>
        
        {!isHiddenSearch && (
          <Col span={12}>
            <ButtonSearch
              size="large"
              style={{marginLeft:'20px', borderRadius: '0px'}}
              textbutton="Tìm kiếm"
              placeholder="input search text" 
              id='input-search'
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
            <Popover content={content}  trigger="click" open={isOpenPopup}>
                <div id = "user-name" onClick={() => setIsOpenPopup((prev) => !prev )} style={{cursor: 'pointer', fontWeight:'bold'}}>{userName?.length ? userName : user?.email}</div>
            </Popover>
          </>
            ): (
            <div class='login' onClick={handleNavigateLogin} style={{cursor: 'pointer'}}>
              <WrapperTextHeaderSmall>Đăng nhập / Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          )}
            
          </WrapperHeaderAccount>
        </LoadingComponent>
        {!isHiddenCart && (
            <div onClick={handleOrder} style={{cursor: 'pointer'}} >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
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