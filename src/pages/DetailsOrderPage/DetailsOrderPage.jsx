import React, { useEffect, useMemo } from "react"
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent"
import {  Image,  } from "antd"
import {   WrapperHeaderUser, WrapperInfoUser, WrapperLabel, WrapperContentInfo, WrapperStyleContent, WrapperItemLabel, WrapperProduct, WrapperNameProduct, WrapperItem, WrapperAllPrice } from "./style"
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import { useDispatch, useSelector } from "react-redux"
import { useMutationHooks } from "../../hooks/useMutationHook"
import * as message from '../../components/Message/Message'
import { convertPrice } from "../../utils"
import { useLocation, useParams } from "react-router-dom"
import { orderContant } from "../../contant"
import logo from '../../assets/images/brand.png'
import { useQuery } from "@tanstack/react-query"


const DetailsOrderPage = () => {
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token)
    return res.data
  }

  const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder }, {
    enabled: id
  })
  const { isLoading, data } = queryOrder

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    },0)
    return result
  },[data])

  const priceDiscountMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
    return total + (cur.price * cur.amount * cur.discount / 100)   
    },0)  
    if (Number(result)){
      return result
    }
    return 0
  }, [data])
  console.log(data)


  return(     
    <LoadingComponent isLoading={isLoading}>
     <div style={{width: '100%', height: 'fit-content', background: '#f5f5fa'}}>
      <div style={{ width: '1270px', margin: '0 auto', height: 'fit-content'}}>
        <h4>Chi tiết đơn hàng</h4>
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              <div className='name-info'>{data?.shippingAddress?.fullname}</div>
              <div className='address-info'><span>Địa chỉ: </span> {`${data?.shippingAddress?.address}`}</div>
              <div className='phone-info'><span>Điện thoại: </span> {data?.shippingAddress?.phone}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className='delivery-info'><span className='name-delivery'>FAST </span>Giao hàng tiết kiệm</div>
              <div className='delivery-fee'><span>Phí giao hàng: </span> {data?.shippingPrice}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
              <div className='status-payment'>{data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
          <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{width: '530px'}}>Sản phẩm</div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Thành tiền</WrapperItemLabel>
          </div>
          {data?.orderItems?.map((order) => {
            return (
              <WrapperProduct>
                <WrapperNameProduct>
                  <Image src={order?.image} 
                    preview={false}
                    style={{
                      width: '70px', 
                      height: '70px', 
                      objectFit: 'cover',
                      border: '1px solid rgb(238, 238, 238)',
                      padding: '2px'
                    }}
                  />
                  <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap',
                    marginLeft: '10px',
                    height: '70px',
                  }}>{order?.name}</div>
                </WrapperNameProduct>
                <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                <WrapperItem>{convertPrice(order?.price * order?.amount )}</WrapperItem>
              </WrapperProduct>
            )
          })}
          
          <WrapperAllPrice>
            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
            <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
            <WrapperItem>{convertPrice(priceDiscountMemo)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
            <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
            <WrapperItem><WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem></WrapperItem>
          </WrapperAllPrice>
      </WrapperStyleContent>
      </div>
    </div>
    </LoadingComponent>
  )
}
export default DetailsOrderPage