import React, { useEffect } from "react"
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent"
import {  Image,  } from "antd"
import {  WrapperInfo, WrapperItemOrder, WrapperContainer, WrapperStyleHeader,  Lable, WrapperValue, WrapperHeaderUser, WrapperInfoUser, WrapperLabel, WrapperContentInfo, WrapperStyleContent, WrapperItemLabel, WrapperProduct, WrapperNameProduct, WrapperItem } from "./style"
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import { useDispatch, useSelector } from "react-redux"
import { useMutationHooks } from "../../hooks/useMutationHook"
import * as message from '../../components/Message/Message'
import { convertPrice } from "../../utils"
import { useLocation, useParams } from "react-router-dom"
import { orderContant } from "../../contant"
import logo from '../../assets/images/brand.png'


const DetailsOrderPage = () => {
  const params = useParams()
  console.log('params',params)
  return(     
    <div style={{background: '#f5f5fa', with: '100%', height: '100vh'}}>
     <div style={{width: '100%', height: '100vh', background: '#f5f5fa'}}>
      <div style={{ width: '1270px', margin: '0 auto', height: '1270px'}}>
        <h4>Chi tiết đơn hàng</h4>
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              <div className='name-info'>Lê Thoa</div>
              <div className='address-info'><span>Địa chỉ: </span> cao lãnh</div>
              <div className='phone-info'><span>Điện thoại: </span> 0388608111 </div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className='delivery-info'><span className='name-delivery'>FAST </span>Giao hàng tiết kiệm</div>
              <div className='delivery-fee'><span>Phí giao hàng: </span>15.000VND</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info'>Thanh toán khi nhận hàng</div>
              <div className='status-payment'>Chưa</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
          <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{width: '670px'}}>Sản phẩm</div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
          </div>
          <WrapperProduct>
                <WrapperNameProduct>
                  <Image src={logo} 
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
                  }}>Điện thoại</div>
                </WrapperNameProduct>
                <WrapperItem>165000</WrapperItem>
                <WrapperItem>165</WrapperItem>
                <WrapperItem>16</WrapperItem>
                <WrapperItem>526</WrapperItem>
                
                
              </WrapperProduct>
          {/* {data?.orderItems?.map((order) => {
            return (
              <WrapperProduct>
                <WrapperNameProduct>
                  <img src={order?.image} 
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
                  }}>Điện thoại</div>
                </WrapperNameProduct>
                <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                <WrapperItem>{order?.discount ? convertPrice(priceMemo * order?.discount / 100) : '0 VND'}</WrapperItem>
                
                
              </WrapperProduct>
            )
          })} */}
          
          {/* <WrapperAllPrice>
            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
            <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
          </WrapperAllPrice> */}
          {/* <WrapperAllPrice>
            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
            <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
          </WrapperAllPrice> */}
          {/* <WrapperAllPrice>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
            <WrapperItem><WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem></WrapperItem>
          </WrapperAllPrice> */}
      </WrapperStyleContent>
      </div>
    </div>
  </div>
  )
}
export default DetailsOrderPage