import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';

const ButtonSearch = (props) => {
  const{
    size,placeholder,textButton,
    bordered,backgroundColorInput = '#fff', backgroundColorButton ='#F1E0B0',
    colorButton ='#000'
  }=props
  return (
    <div style={{display:'flex'}}>
      <InputComponent
        size={size} 
        placeholder={placeholder} 
        bordered={bordered}
        style={{ backgroundColor:backgroundColorInput, borderRadius: '0px'}}
      />
      <ButtonComponent
        size={size} 
        bordered={false}
        styleButton={{background: backgroundColorButton,borderRadius: '0px'}}
        icon={<SearchOutlined color={colorButton} />}
        textButton={textButton}
        styleTextButton={{color: colorButton}}
      />
    </div>
  )
}

export default ButtonSearch