import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import { ButtonComponent } from '../../components/ButtonComponent/ButtonComponent'
import { useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import * as message from '../../components/Message/Message'
import {useDispatch} from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide';
import { Button, Form, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {  getBase64 } from '../../utils';
import { useQuery } from '@tanstack/react-query';

const ProfilePage = () => {
  const user = useSelector((state) => state.user)
  const [email, setEmail] = useState()
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [avatar, setAvatar] = useState()  
  const [stateUser, setStateUser] = useState({
    name: '',
    email: '',
    phone:'',
    isAdmin:false,
    address: '',
    avatar:''
  })
  
  const mutation = useMutationHooks(
    ( data) => {
        const {id, access_token, ...rests} = data
        UserService.updateUser(id, access_token,{...rests})
      }
 )
  const dispatch = useDispatch();
  const { data, isLoading , isSuccess,isError} = mutation

  useEffect(() => {
    setEmail(user?.email)
    setName(user?.name)
    setPhone(user?.phone)
    setAddress(user?.address)
    setAvatar(user?.avatar)
  },[user])

  useEffect(() => {
    if(isSuccess){
        message.success()
        handleGetDetailsUser(user?.id , user?.access_token )
  }
  else if(isError){
    message.error()
  }}
 ,[isSuccess, isError])
 const handleGetDetailsUser = async ( id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token }))
}

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnChangeProvince = (value) => {
    setStateUser({
      ...stateUser,
      province: value
    })
  }
  const handleOnChangeName = (value) => {
    setName(value)

  }
  const handleOnChangePhone = (value) => {
    setPhone(value)
  }
  const handleOnChangeAddress = (value) => {
    setAddress(value)
  }

  const handleOnChangeAvatar = async ({fileList }) => {
    const file =fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview)
  }
  const handleUpdate = () => {
    mutation.mutate({id: user?.id,email,name,phone,address, access_token: user?.access_token})
  }

  return (
    <div style={{width: '1270px', height:'500px' ,margin :'0 auto'}}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <LoadingComponent isLoading={isLoading}>
      <WrapperContentProfile> 
        <WrapperInput>
          <WrapperLabel htmlFor='name'>Name</WrapperLabel>
            <InputForm style={{width:'300px'}} id="name" value={name} onChange={handleOnChangeName}/>
            
        </WrapperInput>     
        <WrapperInput>
          <WrapperLabel htmlFor='email'>Email</WrapperLabel>
            <InputForm style={{width:'300px'}} id="email" value={email} onChange={handleOnChangeEmail}/>
           
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
            <InputForm style={{width:'300px'}} id="phone" value={phone} onChange={handleOnChangePhone}/>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor='address'>Address</WrapperLabel>
            <InputForm style={{width:'300px'}} id="address" value={address} onChange={handleOnChangeAddress}/>
        </WrapperInput> 
       
         <ButtonComponent
            onClick={handleUpdate}
            size={40} 
            styleButton={{
              height: '30px', 
              width: 'fit-content', 
              borderRadius:'4px',
              padding: '2px 6px 6px',
              background: '#4cad8f',
              margin: '0 auto',
            }}
            textButton={'Cập nhật'}
            styleTextButton={{color:'#fff',fontSize:'15px',fontWeight:'600'}}
          ></ButtonComponent> 
      </WrapperContentProfile>
      </LoadingComponent>
    </div>
  )
}

export default ProfilePage