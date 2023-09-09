import { Col, Image, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/00-srm.png'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuanityProduct, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import {StarFilled, PlusOutlined , MinusOutlined} from '@ant-design/icons';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';

const ProductDetailsComponent = () => {
  const onChange = () => {}
  return (
    <Row style={{padding: '16px', background:'#fff',borderRadius:'4px'}}>
      <Col span={8} style={{borderRight:'1px solid #e5e5e5',paddingRight:'8px'}}>
        <Image src={imageProduct} alt="image product" preview={false}/>
      </Col>
      <Col span={16} style={{paddingLeft:'10px'}}>
        <WrapperStyleNameProduct>Sữa rửa mặt dưỡng chuyên biệt chống lão hóa Hada Labo Pro Anti Aging α Lifting Cleanser (80g)</WrapperStyleNameProduct>
        <div>
          <StarFilled style={{fontSize:'15px',color:'rgb(255, 196, 0)'}}/>
          <StarFilled style={{fontSize:'15px',color:'rgb(255, 196, 0)'}}/>
          <StarFilled style={{fontSize:'15px',color:'rgb(255, 196, 0)'}}/>
          <StarFilled style={{fontSize:'15px',color:'rgb(255, 196, 0)'}}/>
          <StarFilled style={{fontSize:'15px',color:'rgb(255, 196, 0)'}}/>
          <WrapperStyleTextSell> | Đã bán 1,2k</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>76.000đ</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến </span>
          <span className='address'> Q.1, P. Bến Nghé, TP. Hồ Chí Minh </span>- 
          <span className='change-address'> Đổi </span>
        </WrapperAddressProduct>
        <div style={{margin:'10px 0 20px', padding:' 10px 0',borderBottom:'1px solid #e5e5e5',borderTop:'1px solid #e5e5e5'}}>
        <div style={{marginBottom:'10px', fontSize:'20px ',fontWeight:'600'}}>Số lượng </div>
            <WrapperQuanityProduct>
              <button style={{border:'none',background:'transparent'}}>
                <MinusOutlined  style={{color: '#000',fontSize:'20px'}}  />
              </button>
              <WrapperInputNumber defaultValue={1} onChange={onChange} size='small' />
              <button  style={{border:'none', background:'transparent'}}>
                <PlusOutlined  style={{color: '#000',fontSize:'20px'}} />
              </button>
          </WrapperQuanityProduct>
        </div>
        <div style={{display:'flex',gap:'12px', alignItems:'center'}}>
          <ButtonComponent
            size={40} 
            bordered={false}
            styleButton={{background: 'rgb(255,57,69)',borderRadius: '0px', height: '48px', width: '220px', border:'1px', borderRadius:'4px'}}
            textButton={'Chọn mua'}
            styleTextButton={{color:'#fff',fontSize:'15px',fontWeight:'700'}}
          ></ButtonComponent>
          <ButtonComponent
            size={40} 
            bordered={false}
            styleButton={{background: '#fff',borderRadius: '0px', height: '48px', width: '220px', border:'1px solid rgb(10,104,255)', borderRadius:'4px'}}
            textButton={'Thêm vào giỏ hàng'}
            styleTextButton={{color:'rgb(10,104,255)',fontSize:'15px',fontWeight:'700'}}
          ></ButtonComponent>
        </div>
      </Col>
    </Row>
  )
}

export default ProductDetailsComponent