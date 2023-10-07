//import { Card } from 'antd'
import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import {StarFilled } from '@ant-design/icons'
import { WrapperStyleTextSell } from '../ProductDetailsComponent/style'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const CardComponent = (props) => {
  const {countInStock, description, image, name, price, rating, type, selled, discount, id} = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  return (
    <WrapperCardStyle
    hoverable
    headStyle={{width:'200px', height:'200px'}}
    style={{ width: 200}}
    bodyStyle={{padding:'10px'}}
    cover={<img alt="example" src={image} />}
    onClick={() => countInStock !==0 && handleDetailsProduct(id)}
    disabled={countInStock ===0}
  >
    <StyleNameProduct style={{overflow:'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{name}</StyleNameProduct>
    <WrapperReportText>
      <span style={{marginRight: '4px'}}>
        <WrapperStyleTextSell style={{fontSize:'12px'}}>{rating}</WrapperStyleTextSell> <StarFilled style={{fontSize:'12px',color:'rgb(255, 196, 0)'}}/>
      </span>  
      <WrapperStyleTextSell style={{fontSize:'12px'}}> | Đã bán {selled || 1000}+</WrapperStyleTextSell>
    </WrapperReportText> 
    <WrapperPriceText >
      <span style={{marginRight:'8px'}} >{convertPrice(price * 1)}</span>  
      <WrapperDiscountText>
         -{discount || 5}%
      </WrapperDiscountText>
    </WrapperPriceText>
  </WrapperCardStyle>
  )
}

export default CardComponent