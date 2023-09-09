//import { Card } from 'antd'
import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import {StarFilled } from '@ant-design/icons'
import { WrapperStyleTextSell } from '../ProductDetailsComponent/style'
//import logo from '../../assets/images/logo.png'
const CardComponent = () => {
  return (
    <WrapperCardStyle
    hoverable
    headStyle={{width:'200px', height:'200px'}}
    style={{ width: 200}}
    bodyStyle={{padding:'10px'}}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <StyleNameProduct>Nước tẩy trang</StyleNameProduct>
    <WrapperReportText>
      <span style={{marginRight: '4px'}}>
        <WrapperStyleTextSell>4.9 </WrapperStyleTextSell> <StarFilled style={{fontSize:'12px',color:'rgb(255, 196, 0)'}}/>
      </span>  
      <WrapperStyleTextSell> | Đã bán 1,2k</WrapperStyleTextSell>
    </WrapperReportText> 
    <WrapperPriceText >
      220.000đ
      <WrapperDiscountText>
         -20%
      </WrapperDiscountText>
    </WrapperPriceText>
  </WrapperCardStyle>
  )
}

export default CardComponent