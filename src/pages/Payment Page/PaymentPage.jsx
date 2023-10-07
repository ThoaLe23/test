import React, { useEffect, useMemo } from "react"
import InputComponent from "../../components/InputComponent/InputComponent"
import Modelcomponent from "../../components/ModalComponent/Modelcomponent"
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent"
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent"
import { Button, Checkbox, Form, Image, Radio } from "antd"
import {StarFilled, PlusOutlined , MinusOutlined,DeleteOutlined} from '@ant-design/icons';
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperPriceDiscount,WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperTotal, WrapperRadio, Lable } from "./style"
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import { useState } from 'react'
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import { useDispatch, useSelector } from "react-redux"
import { decreaseAmount, increaseAmount,  removeAllOrderProduct,  removeOrderProduct, selectedOrder } from "../../redux/slides/orderSlide"
import { convertPrice } from "../../utils"
import { useMutationHooks } from "../../hooks/useMutationHook"
import * as message from '../../components/Message/Message'
import { updateUser } from "../../redux/slides/userSlide"
import { useNavigate } from "react-router-dom"

const PaymentPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const [isOpenModelUpdateInfo, setIsOpenModelUpdateInfo] =useState(false)
  const dispatch = useDispatch()
  const [delivery, setDelivery] = useState('fast')
  const navigate = useNavigate()
  const [payment, setPayment] = useState('later_money')
  const [stateUserDetail, setStateUserDetail] = useState({
    name: '',
    phone:'',
    address: '',
  })
  const handleOnChangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value
    })
  }
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(stateUserDetail)
},[form, stateUserDetail])

  useEffect(() => {
    if(isOpenModelUpdateInfo){
      setStateUserDetail({
        address: user?.address,
        name: user?.name,
        phone: user?.phone,
      })
    }
  },[isOpenModelUpdateInfo])

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
    return total + (cur.price * cur.amount)
    }, 0 )
    return result
  }, [order])

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
    return total + (cur.price * cur.amount * (cur.discount / 100))
    },0)
    if (Number(result)){
      return result
    }
    return 0
  }, [ order])
  const deliveryPriceMemo = useMemo(() => {
    if(priceMemo > 300000  ){
      return 30000
    }
    else if(!priceMemo){
      return 0
    }
    else {
      return 20000
    }
    
  }, [priceMemo])

  const totalPriceMemo = useMemo(() => {
      return Number(priceMemo) - Number(priceDiscountMemo) + Number(deliveryPriceMemo)
  }, [priceMemo, priceDiscountMemo, deliveryPriceMemo])

  const mutationUpdate = useMutationHooks(
    ( data) => {
      const { id, token, ...rests} = data
    const res = UserService.updateUser(id, token, {...rests}) 
    return res
    },
  )

  const mutationAddOrder = useMutationHooks(
    ( data) => {
      const {  token, ...rests} = data
    const res = OrderService.createOrder(token, {...rests}) 
    return res
    },
  )
    const handleAddOrder = () => {
    if(user?.access_token && order?.orderItemsSelected && user?.name
      && user?.address && user?.phone && priceMemo && user?.id){
        // eslint-disable-next-line no-unused-expressions
        mutationAddOrder.mutate(
      { token: user?.access_token, 
       orderItems: order?.orderItemsSelected,
       fullname: user?.name,
       address: user?.address, 
       phone: user?.phone,
       paymentMethod: payment,
       itemsPrice: priceMemo,
       shippingPrice: deliveryPriceMemo,
       totalPrice: totalPriceMemo,
       user: user?.id
      },
      )
    }
  }
  const {isLoading, data} = mutationUpdate
  const {data: dataAdd,isLoading: isLoadingAddOrder, isSuccess, isError} = mutationAddOrder

  useEffect(() => {
    if(isSuccess && dataAdd?.status === 'OK'){
      const arrayOrdered = []
      order?.orderItemsSelected?.forEach(element => {
        arrayOrdered.push(element.product)
      });
      dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
      message.success('Đặt hàng thành công!')
      navigate('/orderSuccess',{
        state:{
          delivery,
          payment,
          orders: order?.orderItemsSelected,
           deliveryPriceMemo: deliveryPriceMemo,
           priceDiscountMemo: priceDiscountMemo,
          totalPriceMemo: totalPriceMemo
        }
      })  
    }
    else if(isError){
      message.error()
    }
  },[isSuccess, isError])

  const handleCancelUpdate = () => {
    setStateUserDetail({
      name:'',
      phone:'',
      address:'',
    })
    form.resetFields() 
      setIsOpenModelUpdateInfo(false)
  }
  const handleUpdateInfoUser = () => {
    const {name, phone, address} = stateUserDetail
    if(name && phone && address){
      mutationUpdate.mutate({id: user?.id, token: user?.access_token, ...stateUserDetail}, {
        onSuccess: () => {
          dispatch(updateUser({name, phone, address}))
          setIsOpenModelUpdateInfo(false)
        }
      })
    }
  }
  const handleChangeAddress = () => {
    setIsOpenModelUpdateInfo(true)
  }
  const handleDilivery = (e) => {
    setDelivery(e.target.value)
  }

  const handlePayment = (e) => {
    setPayment(e.target.value)
  }

  return(     
    <div style={{background: '#f5f5fa', with: '100%', height: '100vh'}}>
      <LoadingComponent isLoading={isLoadingAddOrder}>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h3 style={{fontWeight: 'bold'}}>Phương thức thanh toán</h3>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable> Chọn phương thức giao hàng</Lable>
                  <WrapperRadio onChange={handleDilivery} value={delivery}>
                    <Radio value="fast"><span style={{color:'#ea8500', fontWeight:'bold'}}>FAST </span>Giao hàng tiết kiệm</Radio>
                    <Radio value="go_jek"><span style={{color:'#ea8500', fontWeight:'bold'}}>GO_JEK </span>Giao hàng nhanh</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable> Chọn phương thức thanh toán</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money">Thanh toán tiền mặt khi nhận hàng</Radio>
                    <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>  
            </WrapperLeft>
            <WrapperRight>
              <div style={{width: '100%'}}>
                <WrapperInfo>
                  <div >
                    <span> Địa chỉ: </span>
                    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding:'5px 0 5px'}}>{` ${user?.name}`}</span>
                    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between',paddingBottom:'5px'}} >{` ${user?.address}`}</span>
                    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom:'5px'}} >{` ${user?.phone}`}</span>
                    <span onClick={handleChangeAddress} style={{color:'#4950d6',fontWeight:'bold', cursor:'pointer', paddingRight:'100px'}}>Thay đối</span>

                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Tạm tính</span>
                    <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Giảm giá</span>
                    <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceDiscountMemo)}</span>
                    {/* <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{priceDiscountMemo}</span>  */}
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Phí ship</span>
                    <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(deliveryPriceMemo)}</span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{display:'flex', flexDirection: 'column'}}>
                    <span style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>{convertPrice(totalPriceMemo)}</span>
                    <span style={{color: '#000', fontSize: '11px'}}>(Đã bao gồm thuế VAT)</span>
                  </span>
                </WrapperTotal>
              </div>
              <ButtonComponent
                onClick={() => handleAddOrder()}
                size={40}
                styleButton={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '320px',
                    border: 'none',
                    borderRadius: '4px'
                }}
                  textButton={'Đặt hàng'}
                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
            </WrapperRight>
            </div>
        </div>
        <Modelcomponent title="Cập nhật thông tin giao hàng"  open={isOpenModelUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
          <LoadingComponent isLoading={isLoading}>
          <Form 
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                //onFinish={onUpdateUser}
                autoComplete="on"
                form={form}
              >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input user name !' }]}
              >
                <InputComponent value={stateUserDetail.name} onChange={handleOnChangeDetail} name="name"/>
              </Form.Item>
            
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input phone!' }]}
              >
                <InputComponent value={stateUserDetail.phone} onChange={handleOnChangeDetail} name="phone"/>
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input address!' }]}
              >
                <InputComponent value={stateUserDetail.address} onChange={handleOnChangeDetail} name="address"/>
              </Form.Item>
            </Form>
          </LoadingComponent>  
        </Modelcomponent> 
      </LoadingComponent>       
  </div>
  )
}
export default PaymentPage
