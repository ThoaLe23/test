import { Button } from 'antd'
import React from 'react'

export const ButtonComponent = ({size, styleButton , styleTextButton,textButton,disabled ,...rest}) => {
  return (
    <Button
      style={{
        ...styleButton,
        background: disabled ? '#ccc' : styleButton.background
      }}
      size={size} 
      //style={styleButton} 
      {...rest}
      >
      <span style={styleTextButton} >{textButton}</span>
    </Button>  )
}
