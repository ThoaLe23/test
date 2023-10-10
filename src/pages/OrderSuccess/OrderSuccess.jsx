import React, { useEffect } from "react"
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent"
import {  Image,  } from "antd"
import {  WrapperInfo, WrapperItemOrder, WrapperContainer, WrapperStyleHeader,  Lable, WrapperValue, WrapperItemOrderInfo } from "./style"
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import { useDispatch, useSelector } from "react-redux"
import { useMutationHooks } from "../../hooks/useMutationHook"
import * as message from '../../components/Message/Message'
import { convertPrice } from "../../utils"
import { useLocation, useParams } from "react-router-dom"
import { orderContant } from "../../contant"
import { useQuery } from "@tanstack/react-query"

const OrderSuccess = () => {
  const params = useParams()
  const location = useLocation()
  const {state} = location
  const { id } = params

console.log(state)
  return(     
    <div style={{background: '#f5f5fa', with: '100%', height: 'fit-content'}}>
      <LoadingComponent isLoading={false}>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h3 style={{fontWeight: 'bold'}}>Đơn hàng đặt thành công</h3>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <WrapperContainer>
            <WrapperInfo>
                <div>
                  <Lable> Chọn phương thức giao hàng</Lable>
                  <WrapperValue >
                    <div>
                      {state?.user?.name}
                    </div>
                    <div style={{paddingTop: '10px',paddingBottom:'10px'}}>{state?.user?.address}</div>
                    <div>{state?.user?.phone}</div>
                  </WrapperValue>
                
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable> Chọn phương thức giao hàng</Lable>
                  <WrapperValue>
                    <span style={{color:'#ea8500', fontWeight:'bold'}}>{orderContant.delivery[state?.delivery]}</span> 
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable> Chọn phương thức thanh toán</Lable>
                    <WrapperValue>
                      {orderContant.payment[state?.payment]}
                    </WrapperValue>
                </div>
              </WrapperInfo> 
            <WrapperStyleHeader>
                <span style={{display: 'inline-block', width: '470px',alignItems: 'center', gap:' 4px',padding: '9px 16px'}}>
                  <span> Tất cả sản phẩm</span>
                </span>
                <div style={{flex:1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Đơn giá</span>
                  <span>Số lượng</span>
                  <span style={{padding: '9px 16px'}}>Thành tiền</span>
                </div>
            </WrapperStyleHeader> 
            <WrapperItemOrderInfo>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.name}>
                      <div style={{width: '450px', display: 'flex', alignItems: 'center', gap: 4}}> 
                        <Image src={order?.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                        <div style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow:'ellipsis',
                          whiteSpace:'nowrap'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{flex: 1, display: 'flex', alignItems: 'center',gap: '10px', justifyContent: 'space-between'}}>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}> {convertPrice(order?.price * 1 )}</span>
                        </span>
                       
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}> {order?.amount}</span>
                        </span>
                         <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}> {convertPrice(order?.price * order?.amount)}</span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>
              <div style={{display: 'grid', textAlign: 'right' ,color: 'red',background: '#fff', fontSize: '18px',padding:'15px 15px'}}> 
                <span style={{}}>Phí ship: {convertPrice(state?.deliveryPriceMemo)}</span>
                <span style={{paddingTop:'15px '}}>Giảm: -{convertPrice(state?.priceDiscountMemo)}</span>
                <span style={{paddingTop:'15px '}}>Tổng tiền:  {convertPrice(state?.totalPriceMemo)}</span>
              </div>
            </WrapperContainer>
            </div>
        </div>
       
      </LoadingComponent>       
  </div>
  )
}
export default OrderSuccess
