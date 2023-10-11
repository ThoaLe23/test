import { Col, Image, Rate, Row } from 'antd'
import React, { useState } from 'react'
import imageProduct from '../../assets/images/00-srm.png'
import { WrapperAddressProduct, WrapperDiscountText, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuanityProduct, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import {StarFilled, PlusOutlined , MinusOutlined} from '@ant-design/icons';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import Modelcomponent from '../ModalComponent/Modelcomponent';

const ProductDetailsComponent = ({idProduct}) => {
  const [numProduct, setNumProduct] = useState(1)
  const user = useSelector((state) => state?.user )
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const fetchGetDetailProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1]
    if(id){
      const res = await ProductService.getDetailProduct(id) 
      return res.data
    }
  }  
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
  const {isLoading, data: productDetails} = useQuery(["product-details",idProduct],fetchGetDetailProduct , {enabled: !!idProduct })

  const handleAddOrderProduct = () => {
    if(!user?.id){
      navigate('/sign-in', {state: location?.pathname})
    }
    else{
      // {
      //   name: {type: String, required: true},
      //   amount:{type: Number, required: true},
      //   image: { type: String, required: true},
      //   price: { type: Number, required: true},
      //   product:{
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: 'Product',
      //     required:true,},
      //   },
      dispatch(addOrderProduct({
        orderItem:{
          name: productDetails?.name,
          amount: numProduct,
          image: productDetails?.image,
          price: productDetails?.price,
          product: productDetails?._id,
          discount: productDetails?.discount,
          
        }
      }))
      navigate('/oder')
    }
  } 
  const handleAddOrderProduct1 = () => {
    if(!user?.id){
      navigate('/sign-in', {state: location?.pathname})
    }
    else{
      // {
      //   name: {type: String, required: true},
      //   amount:{type: Number, required: true},
      //   image: { type: String, required: true},
      //   price: { type: Number, required: true},
      //   product:{
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: 'Product',
      //     required:true,},
      //   },
      dispatch(addOrderProduct({
        orderItem:{
          name: productDetails?.name,
          amount: numProduct,
          image: productDetails?.image,
          price: productDetails?.price,
          product: productDetails?._id,
          discount: productDetails?.discount,
          
        }
      }))
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
            <WrapperStyleTextSell> | {productDetails?.selled || 'Đã bán 1,2k' }</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>{convertPrice(productDetails?.price * 1)}</WrapperPriceTextProduct>
            <WrapperDiscountText>
              -{productDetails?.discount || 5}%
            </WrapperDiscountText>
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
              styleButton={{background: 'rgb(255,57,69)', height: '48px', width: '220px', border:'1px', borderRadius:'4px', cursor: 'pointer'}}
              onClick={handleAddOrderProduct}
              textButton={'Chọn mua'}
              styleTextButton={{color:'#fff',fontSize:'15px',fontWeight:'700'}}
            ></ButtonComponent>
            <ButtonComponent
              size={40} 
              styleButton={{background: '#fff',height: '48px', width: '220px', border:'1px solid rgb(10,104,255)', borderRadius:'4px',cursor: 'pointer'}}
              textButton={'Thêm vào giỏ hàng'}
              onClick={handleAddOrderProduct1}
              styleTextButton={{color:'rgb(10,104,255)',fontSize:'15px',fontWeight:'700'}}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
    </LoadingComponent>
  )
}

export default ProductDetailsComponent