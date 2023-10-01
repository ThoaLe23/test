import React, { useEffect } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { useState } from 'react'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'


const TypeProductPage = () => {
  const {state} = useLocation()
  const [loading, setLoading] = useState(false)
  const [products, stateProducts] = useState([])
  //console.log('location', location)
  const fetchProductType = async(type) => {
    setLoading(true)
    const res = await ProductService.getProductType(type)
    if(res?.status === 'OK'){
        setLoading(false)
        stateProducts(res?.data)
    }else{
      setLoading(false)
    }
    console.log('res', res)
  }

  useEffect(() => {
    if(state){
    fetchProductType(state)
    }
  },[state])
  console.log('loading',loading)
  const onchange =() => {}
  return (
    <LoadingComponent isLoading={loading}>
      <div style={{width:'100%',background:'rgb(245, 245, 250)', height: 'calc(180vh - 64px'}}>
      <div style={{width:'1270px', margin:'0 auto'}}> 
        <Row style={{flexWrap: 'nowrap' ,paddingTop:'10px'}}>
          <WrapperNavbar span={4} >
            <NavBarComponent/>
          </WrapperNavbar>
          <Col span={20} style={{display:'flex', flexDirection:'column', justifyContent: 'space-between'}}>
            <WrapperProducts >
              {products?.map((product) => {
                return(
                  <CardComponent 
                    key={product._id} 
                    countInStock={product.countInStock} 
                    description ={product.description}
                    image = {product.image}
                    name = {product.name}
                    price = {product.price}
                    rating = {product.rating}
                    type = {product.type}
                    discount = {product.discount}
                    selled = {product.selled}
                    id={product._id}
                    />
                )
            })}
            </WrapperProducts>
            <Pagination  defaultCurrent={2} total={100} onChange={onchange} style={{textAlign: 'center', marginTop:'10px'}}/>
          </Col>
        </Row>
      </div>
      </div>
    </LoadingComponent>
  )
}

export default TypeProductPage