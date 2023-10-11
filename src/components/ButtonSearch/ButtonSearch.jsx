import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';

const ButtonSearch = (props) => {
  const{
    size,placeholder,textbutton,
    bordered,backgroundColorInput = '#fff', backgroundColorButton ='#F1E0B0',
    colorButton ='#000'
  }=props
  return (
    <div style={{display:'flex'}}>
      <InputComponent
        size={size} 
        placeholder={placeholder} 
        bordered={bordered}
        style={{ backgroundColor:backgroundColorInput}}
        {...props}
      />
      <ButtonComponent
        size={size} 
        styleButton={{background: backgroundColorButton,borderRadius: '0px'}}
        icon={<SearchOutlined color={colorButton} />}
        textbutton={textbutton}
        styleTextButton={{color: colorButton}}
      />
    </div>
  )
}

export default ButtonSearch