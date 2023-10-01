import React from "react"
import InputComponent from "../../components/InputComponent/InputComponent"
import Modelcomponent from "../../components/ModalComponent/Modelcomponent"
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent"
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent"
import { Checkbox, Form } from "antd"
import {StarFilled, PlusOutlined , MinusOutlined,DeleteOutlined} from '@ant-design/icons';
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperPriceDiscount,WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperTotal } from "./style"
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style"
import img from '../../assets/images/creave.png'

const OderPage = ({count = 1}) => {
  const onChange = (e) =>{ 
        console.log(`checked = ${e.target.value}`);
  }
  const handleChangeCount = () => {

  }
  const handleOnchangeCheckAll = () => {
    
  }
  return(     
    <div style={{background: '#f5f5fa', with: '100%', height: '100vh'}}>
    <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
      <h3 style={{fontWeight: 'bold'}}>Giỏ hàng</h3>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <WrapperLeft>
          <WrapperStyleHeader>
              <span style={{display: 'inline-block', width: '390px'}}>
                <Checkbox onChange={handleOnchangeCheckAll} ></Checkbox>
                <span> Tất cả ({count} sản phẩm)</span>
              </span>
              <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{cursor: 'pointer'}} />
              </div>
          </WrapperStyleHeader>
          <WrapperListOrder>
              <WrapperItemOrder >
              <div style={{width: '390px', display: 'flex', alignItems: 'center', gap: 4}}> 
                <Checkbox onChange={onChange} ></Checkbox>
                  <img src= {img} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                <div >name sản phẩm</div>
              </div>
              <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span>
                  <span style={{ fontSize: '13px', color: '#242424' }}>211</span>
                  <WrapperPriceDiscount>230 </WrapperPriceDiscount>
                </span>
                <WrapperCountOrder>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} >
                      <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                  </button>
                  <WrapperInputNumber defaultValue={1} size="small" onChange={onChange} />
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                      <PlusOutlined style={{ color: '#000', fontSize: '10px' }}/>
                  </button>
                </WrapperCountOrder>
                <span style={{color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500}}>xóa sản phẩm</span>
                <DeleteOutlined style={{cursor: 'pointer'}} />
              </div>
            </WrapperItemOrder>
          </WrapperListOrder>
        </WrapperLeft>
        <WrapperRight>
          <div style={{width: '100%'}}>
            
            <WrapperInfo>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span>Tạm tính</span>
                <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>230</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span>Giảm giá</span>
                <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>Giảm</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span>Phí ship</span>
                <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>Phí ship</span>
              </div>
            </WrapperInfo>
            <WrapperTotal>
              <span>Tổng tiền</span>
              <span style={{display:'flex', flexDirection: 'column'}}>
                <span style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>300</span>
                <span style={{color: '#000', fontSize: '11px'}}>(Đã bao gồm thuế VAT)</span>
              </span>
            </WrapperTotal>
          </div>
          <ButtonComponent
            //onClick={() => handleAddCard()}
            size={40}
            styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '320px',
                border: 'none',
                borderRadius: '4px'
            }}
              textButton={'Mua hàng'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
        ></ButtonComponent>
        </WrapperRight>
        </div>
        </div>
  </div>
  )
}
export default OderPage
