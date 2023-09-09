import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetailsPage = () => {
  return (
    <div style={{padding:'0 120px' , background:'rgb(245, 245, 250)', height:'1000px'}}>
      <h3>Trang chủ</h3>
      <div style={{}}>
        <ProductDetailsComponent/>
      </div>
    </div>
  )
}

export default ProductDetailsPage