import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style'
import InputForm from '../../components/InputForm/InputForm'
import { ButtonComponent } from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import imageSignIn from '../../assets/images/sign-in(2).png'
import {EyeFilled,EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/Message/Message'

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const mutation = useMutationHooks(
    data => UserService.signUpUser(data)
 )
 const { data, isLoading, isSuccess, isError} = mutation

 useEffect(() => {
    if(isSuccess){
      message.success()
      navigate('/sign-in')
  }
  else if(isError){
    message.error()
  }}
 ,[isSuccess, isError])


  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnChangePassword = (value) => {
    setPassword(value)
  }
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }
  const navigate = useNavigate()
  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }

  const handleSignUp = () => {
    mutation.mutate({email, password, confirmPassword})
    
  }
  
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'center', background:'rgba(0, 0, 0, 0.53)',height:'100vh'}}>
      <div style={{width:'800px',height:'450px', borderRadius:'6px',background:'#fff',display:'flex'}}>
      <WrapperContainerLeft>
        <h1  class='logo-signup'  >Đăng ký</h1>
        <p >Đăng nhập hoặc Tạo tài khoản</p>
        <InputForm id="sign-up-email" style={{marginBottom:'10px'}} placeholder="abc@gmail.com"
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
           <InputForm id="sign-up-password" placeholder="password"style={{marginBottom:'10px'}} type= {isShowPassword ? "text": "password"}
            value={password} onChange={handleOnChangePassword}/>

        </div>
        <div style={{position:'relative'}}>
          <span
            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            style={{
              zIndex: 10,
              position:'absolute',
              top: '4px',
              right:'8px'
            }}
          >{
            isShowConfirmPassword ? (
              <EyeFilled />
            ) :(
              <EyeInvisibleFilled />
            )
          }</span>
           <InputForm id="sign-up-confirm-password" placeholder="confirm password" type= {isShowConfirmPassword ? "text": "password"}
            value={confirmPassword} onChange={handleOnChangeConfirmPassword }/>
        </div>
        {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
        <LoadingComponent isLoading={isLoading}>
        <ButtonComponent
            disabled={ !email.length || !password.length || !confirmPassword.length}
            onClick={handleSignUp}
            size={40} 
            id="submit-signup"
            styleButton={{
              background: 'rgb(255,57,69)',
              height: '48px', 
              width: '100%', 
              border:'none', 
              borderRadius:'4px',
              margin: '26px 0 10px',
            }}
            textbutton={'Đăng ký'}
            styleTextButton={{color:'#fff',fontSize:'15px',fontWeight:'700'}}
          ></ButtonComponent>
          </LoadingComponent>
          <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập </WrapperTextLight></p>
      </WrapperContainerLeft>
      <WrapperContainerRight>
        <Image src={imageSignIn} preview={false} alt="image-signin" width='203px'  height='203px'  />
        <h2>Mua sắm tại Vanilla Store</h2>
      </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage