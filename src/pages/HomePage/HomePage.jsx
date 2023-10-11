import React, { useEffect, useRef, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider00 from '../../assets/images/slider00.png'
import slider01 from '../../assets/images/slider01.png'
import slider02 from '../../assets/images/slider02.png'
import slider03 from '../../assets/images/slider03.jpg'
import slider04 from '../../assets/images/slider04.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useDebounce } from '../../hooks/useDebounce'

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 1000)
  const refSearch = useRef()
  const [stateProducts, setStateProducts] = useState([])
  const [typeProducts, setTypeProducts] = useState([])
  const [Loading, setLoading] = useState(false)

  const fetchProductAll = async (search) => {  
    const  res = await ProductService.getAllProduct(search)
    if(search?.length > 0 || refSearch.current){
      setStateProducts(res?.data)
    }
    else{
      return res
   }
  } 

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if(res?.status === 'OK'){
      setTypeProducts(res?.data)
    }
  }

  useEffect(() => {
    if(refSearch.current){
      setLoading(true)
      fetchProductAll(searchDebounce)
    }
    refSearch.current = true
    setLoading(false)
  },[searchDebounce])

  const {isLoading, data: products} = useQuery(["products"],fetchProductAll, {retry: 3, retryDelay: 1000 })

  useEffect(() => {
    fetchAllTypeProduct()
    
  },[])

  useEffect(() => {
    if(products?.data?.length > 0){
      setStateProducts(products?.data)
      return []
    }
  },[products])

  return (
    <LoadingComponent isLoading={isLoading || Loading}>
      <div style={{padding:'0 auto',width:'1270px'}}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return(
              <TypeProduct name={item} key={item}/>
            )
          })}
          </WrapperTypeProduct>
      </div>
      <div className='body' style={{width:'100%',backgroundColor:'rgb(245, 245, 250)',}}>
        <div id="container" style={{margin:'0 auto',height:"fit-content", width: '1270px'}}>
          <SliderComponent arrImages={[slider00,slider01,slider02,slider03,slider04]}/>
          <WrapperProducts>
            {stateProducts?.map((product) => {
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
          
          <div style={{ justifyContent: 'center',display:'flex',marginTop:'10px', width:'100%'}}>
            <WrapperButtonMore textbutton="Xem thêm" type="outline" styleButton={{
                color: 'rgb(11, 116, 229)', border:'1px solid rgb(11, 116, 229)',
                width: '240px', height: '38px', borderRadius:'4px',marginBottom: '10px'
            }}
            styleTextButton={{ fontWeight: '500'}} />
          </div> 
        </div>
      </div>
    </LoadingComponent>
  )
}

export default HomePage