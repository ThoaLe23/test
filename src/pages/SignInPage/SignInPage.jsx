import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import { ButtonComponent } from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import imageSignIn from '../../assets/images/sign-in(2).png'
import { useState } from 'react'
import {EyeFilled,EyeInvisibleFilled } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/Message/Message'
import jwt_decode from "jwt-decode";
import {useDispatch} from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide'
import localStorage from 'redux-persist/es/storage'

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();

  const mutation = useMutationHooks(
     data => UserService.loginUser(data)
  ) 
  const { data, isLoading , isSuccess} = mutation

  useEffect(() => {
    if(isSuccess){
      if(location?.state){
        navigate(location?.state)
      }  else{
        navigate('/')
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if (data?.access_token) {  
        const decoded = jwt_decode(data?.access_token)   
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
    
   },[ isSuccess ])

  const handleGetDetailsUser = async ( id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token }))
  }

  const handleNavigateSignUp = () => {

    navigate('/sign-up')
  } 
  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnChangePassword = (value) => {
    setPassword(value)
  }
  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
   console.log('sign-in', email, password)

  }
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'center', background:'rgba(0, 0, 0, 0.53)',height:'100vh'}}>
      <div style={{width:'800px',height:'450px', borderRadius:'6px',background:'#fff',display:'flex'}}>
      <WrapperContainerLeft>
        <h1 >Xin chào</h1>
        <p >Đăng nhập hoặc Tạo tài khoản</p>
        <InputForm id="sign-in email" style={{marginBottom:'10px'}} placeholder="abc@gmail.com"
         value={email} onChange={handleOnChangeEmail}/>
        <div style={{position:'relative'}}>
          <span
            onClick={() => setIsShowPassword(!isShowPassword)}
            style={{
              zIndex: 10,
              position:'absolute',
              top: '4px',
              right:'8px'
            }}
          >{
            isShowPassword ? (
              <EyeFilled />
            ) :(
              <EyeInvisibleFilled />
            )
          }</span>
           <InputForm id="sign-up password" placeholder="password"style={{marginBottom:'10px'}} type= {isShowPassword ? "text": "password"}
            value={password} onChange={handleOnChangePassword}/>

        </div>
        {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
        <LoadingComponent isLoading={isLoading}>
        <ButtonComponent
            disabled={!email.length || !password.length}
            onClick={handleSignIn}
            size={40} 
            styleButton={{
              background: 'rgb(255,57,69)',
              height: '48px', 
              width: '100%', 
              border:'none', 
              borderRadius:'4px',
              margin: '26px 0 10px',
            }}
            textButton={'Đăng nhập'}
            styleTextButton={{color:'#fff',fontSize:'15px',fontWeight:'700'}}
          ></ButtonComponent></LoadingComponent>
          <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
          <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản </WrapperTextLight></p>
      </WrapperContainerLeft>
      <WrapperContainerRight>
        <Image src={imageSignIn} preview={false} alt="image-signin" width='203px'  height='203px'  />
        <h2>Mua sắm tại Vanilla Store</h2>
      </WrapperContainerRight>
      </div>
    </div>
    
  )
}

export default SignInPage