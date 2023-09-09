import { Button } from 'antd'
import React from 'react'

export const ButtonComponent = ({size, styleButton , styleTextButton,textButton, ...rest}) => {
  return (
    <Button
      size={size} 
      //bordered={false}
      style={styleButton} 
      {...rest}
      >
      <span style={styleTextButton} >{textButton}</span>
    </Button>  )
}
