import React, { useEffect, useMemo } from "react"
import InputComponent from "../../components/InputComponent/InputComponent"
import Modelcomponent from "../../components/ModalComponent/Modelcomponent"
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent"
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent"
import { Button, Checkbox, Form, Image,  } from "antd"
import {StarFilled, PlusOutlined , MinusOutlined,DeleteOutlined} from '@ant-design/icons';
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperPriceDiscount,WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperTotal, WrapperStyleHeaderDelivery } from "./style"
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import { useState } from 'react'
import * as UserService from '../../services/UserService'
import { useDispatch, useSelector } from "react-redux"
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from "../../redux/slides/orderSlide"
import { convertPrice } from "../../utils"
import jwt_decode from "jwt-decode";
import { useMutationHooks } from "../../hooks/useMutationHook"
import { useQuery } from "@tanstack/react-query"
import * as message from '../../components/Message/Message'
import { updateUser } from "../../redux/slides/userSlide"
import { useLocation, useNavigate } from "react-router-dom"

const OderPage = () => {
  const [listChecked, setListchecked] = useState([])
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const [isOpenModelUpdateInfo, setIsOpenModelUpdateInfo] =useState(false)
  const dispatch = useDispatch()
  const [stateUserDetail, setStateUserDetail] = useState({
    name: '',
    phone:'',
    address: '',
  })
  const navigate = useNavigate()
 
  
  const [form] = Form.useForm();
  const onChange = (e) =>{ 
    if(listChecked.includes(e.target.value)){
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListchecked(newListChecked)
    }else{
      setListchecked([...listChecked, e.target.value])
    }
  }
  const handleChangeCount = (type, idProduct) => {
    if(type === 'increase'){
      dispatch(increaseAmount({idProduct}))
    }
    else{
      dispatch(decreaseAmount({idProduct}))
    }
  }
  const handleOnchangeCheckAll = (e) => {
    if(e.target.checked){
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListchecked(newListChecked)
    }else{
      setListchecked([])
    }
  }
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({idProduct}))

  }
  useEffect(() => {
    dispatch(selectedOrder({listChecked}))
  },[listChecked])

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
    if(priceMemo > 500000){
      return 10000
    }
    else if(!priceMemo){
      return 0
    }
    else if(priceMemo < 500000){
      return 20000
    }
  }, [priceMemo])

  const totalPriceMemo = useMemo(() => {
      return priceMemo - priceDiscountMemo + deliveryPriceMemo
  }, [priceMemo, priceDiscountMemo, deliveryPriceMemo])

  const handleRemoveAllOrder = () => {
    if(listChecked?.length > 1){
    dispatch(removeAllOrderProduct({listChecked}))
    }
  }

  const handleAddCart = () => {
    if(!order.orderItemsSelected?.length  ){
      message.error('Vui lòng chọn sản phẩm')
    }
    else if(!user?.phone || !user.name ||  !user?.address){
      setIsOpenModelUpdateInfo(true)
    }else{
      navigate('/payment')
    }
  }

  const mutationUpdate = useMutationHooks(
    ( data) => {
      const { id, token, ...rests} = data
    const res = UserService.updateUser(id, token, {...rests}) 
    return res
    },
  )
  //const userId = {key: user?.id, value: order?.orderItems}
  
  
  const { data, isLoading} = mutationUpdate
  const handleCancelUpdate = () => {
    setStateUserDetail({
      name:'',
      phone:'',
      address:'',
      isAdmin: false,
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
  const handleOnChangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value
    })
  }
  const handleChangeAddress = () => {
    setIsOpenModelUpdateInfo(true)
  }


  return(     
    <div style={{background: '#f5f5fa', with: '100%', height: '150vh'}}>
      <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
        <h3 style={{fontWeight: 'bold'}}>Phương thức đặt hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <WrapperLeft>
            <WrapperStyleHeader>
                <span style={{display: 'inline-block', width: '450px'}}>
                  <Checkbox onChange={handleOnchangeCheckAll}  checked={listChecked?.length === order?.orderItems?.length} ></Checkbox>
                  <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                </span>
                <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Đơn giá</span>
                  <span>Số lượng</span>
                  <span>Thành tiền</span>
                  <DeleteOutlined style={{cursor: 'pointer'}} onClick={handleRemoveAllOrder}/>
                </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return(
                  <WrapperItemOrder key={order?.product}>
                <div style={{width: '440px', display: 'flex', alignItems: 'center', gap: "4px"}}> 
                  <Checkbox id='checked-item'  onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                    <Image preview={false} src= {order?.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                    <div  style={{width: '260px', overflow:'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{order?.name}</div>
                  </div>
                  <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span >
                      <span id='price-item' style={{ fontSize: '13px', color: '#242424'}}>{convertPrice(order?.price * 1)}</span>
                    </span>
                  <WrapperCountOrder>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() =>  handleChangeCount('decrease', order?.product)} >
                        <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                    <WrapperInputNumber defaultValue={order?.amount} size="small"  value={order?.amount}/>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() =>  handleChangeCount('increase', order?.product)}>
                        <PlusOutlined style={{ color: '#000', fontSize: '10px' }}/>
                    </button>
                  </WrapperCountOrder>
                  <span style={{color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500}}>{convertPrice(order?.price * order?.amount )}</span>
                  <DeleteOutlined style={{cursor: 'pointer'}} onClick={() => handleDeleteOrder(order?.product)}/>
                </div>
                </WrapperItemOrder> 
                )
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{width: '100%'}}>
              <WrapperInfo>
                <div >
                  <span> Địa chỉ: </span>
                  <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding:'5px 0 5px'}}>{` ${user?.name}`}</span>
                  <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between',paddingBottom:'5px'}} >{` ${user?.address}`}</span>
                  <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom:'5px'}} >{` ${user?.phone}`}</span>
                  <span id='Change-address1' onClick={handleChangeAddress} style={{color:'#4950d6',fontWeight:'bold', cursor:'pointer', paddingRight:'100px'}}>Thay đối</span>

                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Tạm tính</span>
                  <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Giảm giá</span>
                  <span id='discount-price' style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceDiscountMemo)}</span>
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
                  <span id='total-price' style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>{convertPrice(totalPriceMemo)}</span>
                  <span style={{color: '#000', fontSize: '11px'}}>(Đã bao gồm thuế VAT)</span>
                </span>
              </WrapperTotal>
            </div>
            {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
            <ButtonComponent
              disabled={totalPriceMemo === 0}
              onClick={() => handleAddCart()}
              size={40}
              id='Order-Btn'
              styleButton={{
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  width: '320px',
                  border: 'none',
                  borderRadius: '4px'
              }}
                textbutton={'Mua hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
          ></ButtonComponent>
          </WrapperRight>
          </div>
      </div>
      <Modelcomponent title="Cập nhật thông tin giao hàng" open={isOpenModelUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
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
               <InputComponent value={stateUserDetail['name']} onChange={handleOnChangeDetail} name="name"/>
             </Form.Item>
           
             <Form.Item
               label="Phone"
               name="phone"
               rules={[{ required: true, message: 'Please input phone!' }]}
             >
               <InputComponent value={stateUserDetail['phone']} onChange={handleOnChangeDetail} name="phone"/>
             </Form.Item>
             <Form.Item
               label="Address"
               name="address"
               rules={[{ required: true, message: 'Please input address!' }]}
             >
               <InputComponent value={stateUserDetail['address']} onChange={handleOnChangeDetail} name="address"/>
             </Form.Item>
           </Form>
         </LoadingComponent>  
       </Modelcomponent>        
  </div>
  )
}
export default OderPage
