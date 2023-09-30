import React from 'react'
//import Search from 'antd/lib/transfer/search'
import { Badge, Col, Image ,Row} from 'antd';
import { WrapperHeader, WrapperHeaderAccount ,WrapperTextHeaderSmall} from './style';
import {UserOutlined,CaretDownOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import ButtonSearch from '../ButtonSearch/ButtonSearch.jsx';
import imageProductsmall from '../../assets/images/brand.png'

const HeaderComponent = () => {
  return (
    <div >
      <WrapperHeader>
      <Row span ={8}>
          <Col >
            <Image style={{width:'120px', height:'50px'}}src={imageProductsmall} alt="image small " preview={false}/>
          </Col>
        </Row>
        {/* <Col span={6}>
          <Image src={} 
          <WrapperTextHeader>SKINCARE</WrapperTextHeader>
        </Col> */}
        <Col span={12}>
        <ButtonSearch
          size="large"
          style={{marginLeft:'20px'}}
          bordered ={false}
          textButton="Tìm kiếm"
          placeholder="input search text" //onSearch={onSearch}
           />

        </Col>
        <Col span={6} style={{display:'flex', gap:'54px',alignItems:'center'}}>
          <WrapperHeaderAccount>
          <UserOutlined style={{fontSize: '30px'}} /> 
            <div>
              <WrapperTextHeaderSmall>Đăng nhập / Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccount>
          <div >
            <Badge count={4} size= 'small'>
              <ShoppingCartOutlined style={{fontSize: '30px', color:'#fff'}}/>
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent