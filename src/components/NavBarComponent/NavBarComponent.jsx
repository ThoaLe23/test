import React from 'react'
import { WrapperContent, WrapperLabelText, WrapperTextValue } from './style'
import { Checkbox, } from 'antd'

const NavBarComponent = () => {
  const OnChange = () => {}
  const renderContent =(type, options) => {
    switch (type) {
      case 'text':
        return options.map((option) => {
          return (
            <WrapperTextValue>{option}</WrapperTextValue>
          )
        })
        case 'checkbox':
        return (
        <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection:'column', gap: '12px' }} onChange={OnChange}>
            {options.map((option) => {
              return (
                <Checkbox style={{marginLeft: 0}} value= {option.value}>{option.label}</Checkbox>
              )
            })
            }
      </Checkbox.Group>
      )
      default:
        return{}
    }
  }
  return (
    <div>
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContent>
        {renderContent('text',['TẨY TRANG','SỮA RỬA MẶT','TONER','SERUM','KEM DƯỠNG ẤM','KEM CHỐNG NẮNG'])}
        
      </WrapperContent>
    </div>
  )
}

export default NavBarComponent