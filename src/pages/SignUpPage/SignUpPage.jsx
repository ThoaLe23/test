import React from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style'
import InputForm from '../../components/InputForm/InputForm'
import { ButtonComponent } from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import imageSignIn from '../../assets/images/sign-in(2).png'

const SignUpPage = () => {
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'center', background:'rgba(0, 0, 0, 0.53)',height:'100vh'}}>
      <div style={{width:'800px',height:'450px', borderRadius:'6px',background:'#fff',display:'flex'}}>
      <WrapperContainerLeft>
        <h1 >Xin chào</h1>
        <p >Đăng nhập hoặc Tạo tài khoản</p>
        <InputForm style={{marginBottom:'10px'}} placeholder="abc@gmail.com"/>
        <InputForm  placeholder="password"style={{marginBottom:'10px'}}/>
        <InputForm  placeholder="confirm password"/>
        <ButtonComponent
            size={40} 
            bordered={false}
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
          ></ButtonComponent>
          <p>Bạn đã có tài khoản? <WrapperTextLight> Đăng nhập </WrapperTextLight></p>
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