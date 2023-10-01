import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate() 

  return (
    <div style={{width: '100%' , background:'rgb(245, 245, 250)', height:'100vh'}}>
      <div style={{padding:'0 120px',margin: '0 auto',width: '1500px' , height:'100%'}}>
        <h5><span style={{cursor:'pointer',fontWeight:'bold'}} onClick={() => {navigate('/')}}>Trang chủ</span> / Chi tiết sản phẩm </h5>
        <div style={{}}>
          <ProductDetailsComponent idProduct={id}/>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage