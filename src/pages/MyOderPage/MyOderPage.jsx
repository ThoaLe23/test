import React, { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import * as OrderService from '../../services/OrderService'
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent"
import { useSelector } from "react-redux"
import { WrapperContainer, WrapperFooterItem, WrapperHeaderItem, WrapperItemOrder, WrapperListOrder, WrapperStatus } from "./style"
import { Image } from "antd"
import { convertPrice } from "../../utils"
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent"
import * as message from '../../components/Message/Message'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useMutationHooks } from "../../hooks/useMutationHook"

const MyOderPage = () => {
  const location = useLocation()
  const { state } = location
   const navigate = useNavigate()
  const fetchMyOrder = async () => {
    const res = await OrderService.getAllOrder(state?.id, state?.token)
    return res.data
  }
  const user = useSelector((state) => state.user)
  const queryOrder = useQuery({queryKey: ['orders'], queryFn: fetchMyOrder}, {
    enabled: state?.id && state?.token
  })
  const {isLoading , data} = queryOrder
  //console.log('data', data)

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token
      }
    })
  }

  const mutation = useMutationHooks(
    (data) => {
      const { id, token, orderItems  } = data
      const res = OrderService.cancelOrder(id, token, orderItems)
      return res
    }
  )
  const handleCanceOrder = (order) => {
    mutation.mutate({id : order._id, token:state?.token, orderItems: order?.orderItems,}, {
      onSuccess: () => {
        queryOrder.refetch()
      },
    })
  }
  const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation
  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success()
    } 
    else if (isErrorCancle) {
      message.error()
    }
  }, [isErrorCancle, isSuccessCancel])

  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}> 
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
                marginLeft: '10px'
              }}>{order?.name}</div>
              <span style={{ fontSize: '13px', color: '#242424',marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
          })
  }

  return(    
    <LoadingComponent isLoading={isLoading || isLoadingCancel}>
      <WrapperContainer>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h4>Đơn hàng của tôi</h4>
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                  <WrapperItemOrder key={order?._id}>
                    <WrapperStatus>
                      <span style={{fontSize: '14px', fontWeight: 'bold'}}>Trạng thái</span>
                      <div>
                        <span style={{color: 'rgb(255, 66, 78)'}}>Giao hàng: </span>
                        <span style={{color: '#000'}}>{`${order.isDelivered ? 'Đã giao hàng': 'Chưa giao hàng'}`}</span>
                      </div>
                      <div>
                        <span style={{color: 'rgb(255, 66, 78)'}}>Thanh toán: </span>
                        <span style={{color: '#000'}}>{`${order.isPaid ? 'Đã thanh toán': 'Chưa thanh toán'}`}</span>
                      </div>
                    </WrapperStatus>
                    {renderProduct(order?.orderItems)}
                    <WrapperFooterItem>
                      <div>
                        <span style={{color: 'rgb(255, 66, 78)'}}>Tổng tiền: </span>
                        <span 
                          style={{ fontSize: '13px', color: 'rgb(56, 56, 61)',fontWeight: 700 }}
                        >{convertPrice(order?.totalPrice)}</span>
                      </div>
                      <div style={{display: 'flex', gap: '10px'}}>
                      <ButtonComponent
                          onClick={() => handleCanceOrder(order)}
                          size={40}
                          styleButton={{
                              height: '36px',
                              border: '1px solid #9255FD',
                              borderRadius: '4px'
                          }}
                          textButton={'Hủy đơn hàng'}
                          styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                        >
                        </ButtonComponent>
                        <ButtonComponent
                          onClick={() => handleDetailsOrder(order?._id)}
                          size={40}
                          styleButton={{
                              height: '36px',
                              border: '1px solid #9255FD',
                              borderRadius: '4px'
                          }}
                          textButton={'Xem chi tiết'}
                          styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                        >
                        </ButtonComponent>
                      </div>
                    </WrapperFooterItem>
                  </WrapperItemOrder>
              )
            })
            }
          </WrapperListOrder>
        </div>
      </WrapperContainer>
  </LoadingComponent> 
  )
}
export default MyOderPage
