import React from 'react'
import { useNavigate } from 'react-router-dom'

const TypeProduct = ({name}) => {
  const navigate = useNavigate()
  const handleNavigatetype = (type) => {
   navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_')}`, {state: type})
    //navigate(`/product/${type.normalize("NFD").replace(/[^\w\-]+/g, '-')}`)

  }
  return (
    <div style={{padding:'0 10px', cursor: 'pointer'}} onClick={() => handleNavigatetype(name)}>
      {name}
    </div>
    //  <Modelcomponent title="Cập nhật thông tin giao hàng" open={isOpenModelUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
    //     {/* <LoadingComponent isLoading={isLoadingDeleted}> */}
    //     <Form 
    //           name="basic"
    //           labelCol={{ span: 6 }}
    //           wrapperCol={{ span: 18 }}
    //          // onFinish={onUpdateUser}
    //           autoComplete="on"
    //           form={form}
    //         >
    //         <Form.Item
    //           label="Name"
    //           name="name"
    //           rules={[{ required: true, message: 'Please input user name !' }]}
    //         >
    //           <InputComponent value={stateUserDetail.name} onChange={handleOnChangeDetail} name="name"/>
    //         </Form.Item>
           
    //         <Form.Item
    //           label="Phone"
    //           name="phone"
    //           rules={[{ required: true, message: 'Please input phone!' }]}
    //         >
    //           <InputComponent value={stateUserDetail.phone} onChange={handleOnChangeDetail} name="phone"/>
    //         </Form.Item>
    //         <Form.Item
    //           label="Address"
    //           name="address"
    //           rules={[{ required: true, message: 'Please input address!' }]}
    //         >
    //           <InputComponent value={stateUserDetail.address} onChange={handleOnChangeDetail} name="address"/>
    //         </Form.Item>
    //         <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
    //           <Button type="primary" htmlType="submit">
    //             Apply
    //           </Button>
    //         </Form.Item>
    //       </Form>
    //     {/* </LoadingComponent>   */}
    //   </Modelcomponent>
  )
}

export default TypeProduct