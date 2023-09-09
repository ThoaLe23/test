import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider00 from '../../assets/images/slider00.png'
import slider01 from '../../assets/images/slider01.png'
import slider02 from '../../assets/images/slider02.png'
import slider03 from '../../assets/images/slider03.jpg'
import slider04 from '../../assets/images/slider04.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'

const HomePage = () => {
  const arr=['TẨY TRANG','SỮA RỬA MẶT','TONER','SERUM','KEM DƯỠNG ẤM','KEM CHỐNG NẮNG']
  return (
    <>
      <div style={{padding:'0 120px'}}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return(
              <TypeProduct name={item} key={item}/>
            )
          })}
          </WrapperTypeProduct>
      </div>
      <div id="container" style={{backgroundColor:'rgb(245, 245, 250)',padding:'0 120px',height:"fit-content", width: '100%'}}>
        <SliderComponent arrImages={[slider00,slider01,slider02,slider03,slider04]}/>
        <WrapperProducts>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
          <CardComponent/>
        </WrapperProducts>
        
        <div style={{ justifyContent: 'center',display:'flex',marginTop:'10px', }}>
          <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
              color: 'rgb(11, 116, 229)', border:'1px solid rgb(11, 116, 229)',
              width: '240px', height: '38px', borderRadius:'4px',marginBottom: '10px'
          }}
          styleTextButton={{ fontWeight: '500'}} />
         </div> 
    </div>
    </>
  )
}

export default HomePage