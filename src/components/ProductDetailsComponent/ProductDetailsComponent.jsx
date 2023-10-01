import { Col, Image, Rate, Row } from 'antd'
import React, { useState } from 'react'
import imageProduct from '../../assets/images/00-srm.png'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuanityProduct, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import {StarFilled, PlusOutlined , MinusOutlined} from '@ant-design/icons';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { useSelector } from 'react-redux';

const ProductDetailsComponent = ({idProduct}) => {
  const [numProduct, setNumProduct] = useState(1)
  const user = useSelector((state) => state?.user )
  console.log('user',user)
  const fetchGetDetailProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1]
    if(id){
        const res = await ProductService.getDetailProduct(id) 
      return res.data
    }
  } 
  const {isLoading, data: productDetails} = useQuery(["product-details",idProduct],fetchGetDetailProduct , {enabled: !!idProduct })
  const OnChange = (value) => {
      setNumProduct(Number(value))
  }
  const handleChangeCount = (type) => {
    if(type === 'increase'){
      setNumProduct(numProduct + 1)
    } else {
      setNumProduct(numProduct - 1)
    }
  }
  return (
    <LoadingComponent isLoading={isLoading}>
      <Row style={{padding: '16px', background:'#fff',borderRadius:'4px'}}>
        <Col span={8} style={{borderRight:'1px solid #e5e5e5',paddingRight:'8px'}}>
          <Image src={productDetails?.image} alt="image product" preview={false}/>
        </Col>
        <Col span={16} style={{paddingLeft:'10px'}}>
          <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
          <div>
            <Rate allowHalf={true} disabled value={productDetails?.rating} />
            <WrapperStyleTextSell> | Đã bán 1,2k</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>{productDetails?.price}</WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến </span>
            <span className='address'> {user?.address} </span>- 
            <span className='change-address'> Đổi </span>
          </WrapperAddressProduct>
          <div style={{margin:'10px 0 20px', padding:' 10px 0',borderBottom:'1px solid #e5e5e5',borderTop:'1px solid #e5e5e5'}}>
          <div style={{marginBottom:'10px', fontSize:'20px ',fontWeight:'600'}}>Số lượng </div>
              <WrapperQuanityProduct>
                <button style={{border:'none',background:'transparent', cursor:'pointer'}} onClick={() => handleChangeCount('decrease')}>
                  <MinusOutlined  style={{color: '#000',fontSize:'20px'}}  />
                </button>
                <WrapperInputNumber defaultValue={1} onChange={OnChange} value={numProduct} size='small' />
                <button  style={{border:'none', background:'transparent', cursor:'pointer'}} onClick={() => handleChangeCount('increase')}>
                  <PlusOutlined  style={{color: '#000',fontSize:'20px'}} />
                </button>
            </WrapperQuanityProduct>
          </div>
          <div style={{display:'flex',gap:'12px', alignItems:'center'}}>
            <ButtonComponent
              size={40} 
              styleButton={{background: 'rgb(255,57,69)', height: '48px', width: '220px', border:'1px', borderRadius:'4px'}}
              textButton={'Chọn mua'}
              styleTextButton={{color:'#fff',fontSize:'15px',fontWeight:'700'}}
            ></ButtonComponent>
            <ButtonComponent
              size={40} 
              styleButton={{background: '#fff',height: '48px', width: '220px', border:'1px solid rgb(10,104,255)', borderRadius:'4px'}}
              textButton={'Thêm vào giỏ hàng'}
              styleTextButton={{color:'rgb(10,104,255)',fontSize:'15px',fontWeight:'700'}}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
    </LoadingComponent>
  )
}

export default ProductDetailsComponent