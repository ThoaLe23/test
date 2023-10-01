import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Space } from 'antd'
import {PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { WrapperUploadFile } from '../../pages/Profile/style'
import InputComponent from '../InputComponent/InputComponent'
import Modelcomponent from '../ModalComponent/Modelcomponent'
import * as message from '../../components/Message/Message'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { useQuery } from '@tanstack/react-query'
import * as UserService from '../../services/UserService'

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const user = useSelector((state) => state?.user )
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [stateUser, setStateUser] = useState({
    name: '',
    email: '',
    phone:'',
    isAdmin:false,
    address: '',
  })
  const [stateUserDetail, setStateUserDetail] = useState({
    name: '',
    email: '',
    phone:'',
    isAdmin:false,
    address: '',
  })

  const [form] = Form.useForm();

 const mutationUpdate = useMutationHooks(
  ( data) => {
    const { id, token, ...rests} = data
  const res =  UserService.updateUser(id, token, {...rests}) 
  return res
  },
)
const  mutationDelete = useMutationHooks(
  ( data) => {
    const { id, token} = data
  const res =  UserService.deleteUser(id, token) 
  return res
  },
 
)

  const getAllUsers = async () => {
      const res = await UserService.getAllUser()
      return res
  }
  const fetchGetDetailUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected) 
    if(res?.data){
      setStateUserDetail({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        address:res?.data?.address,
      })
    }   
     setIsLoadingUpdate(false)
  } 
  useEffect(() => {
      form.setFieldsValue(stateUserDetail)
  },[form, stateUserDetail])   

  useEffect(() => {
    if(rowSelected){
      setIsLoadingUpdate(true) 
      fetchGetDetailUser(rowSelected)
    }
  },[rowSelected])
  const handleDetailsUser = () => {
    setIsOpenDrawer(true)
  }

  const { data: dataUpdated, isLoading: isLoadingUpdated , isSuccess: isSuccessUpdated ,isError: isErrorUpdated} = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted , isSuccess: isSuccessDeleted ,isError: isErrorDeleteted} = mutationDelete

  const queryUser = useQuery({queryKey: ['user'], queryFn: getAllUsers})
  const {isLoading: isLoadingUsers , data: users} = queryUser
  const renderAction = () => {
    return(
      <div>
        <EditOutlined style={{fontSize: "20px",color: "orange", cursor: 'pointer' }} onClick={handleDetailsUser}/>
        <DeleteOutlined style={{fontSize: "20px",color: "red", marginLeft:' 8px',cursor: 'pointer'}} onClick={() => setIsModalOpenDelete(true)}/>
      </div>
    )
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a,b) => a.name.length -  b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a,b) => a.email.length -  b.email.length,
      ...getColumnSearchProps('email')    
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        {
          text:'True',
          value: true,
        },
        {
          text:'False',
          value: false,
        }
      ]
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone')    
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,

    },
  ];
   const dataTable = users?.data?.length && users?.data?.map((user) => {
    return {...user, key: user._id , isAdmin: user.isAdmin ? 'TRUE' : 'FALSE'}
  })

  useEffect(() => {
    if(isSuccessDeleted && dataDeleted?.status === 'OK'){
      message.success()  
      handleCancelDelete()
    }
    else if(isErrorDeleteted){
      message.error()
    }
  },[isSuccessDeleted])

   const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetail({
      name:'',
      email: '',
      phone:'',
      isAdmin:false,
      address:'',
    })
    form.resetFields()
  };

  useEffect(() => {
    if(isSuccessUpdated && dataUpdated?.status === 'OK'){
      message.success()      
      handleCloseDrawer()
    }
    else if(isErrorUpdated){
      message.error()
    }
  },[isSuccessUpdated]) 

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleDeleteUser = () => {
    mutationDelete.mutate({id: rowSelected , token: user?.access_token}, {
      onSettled: () => {
        queryUser.refetch()
      }
      })
  }
  const handleOnChangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value
    })
  }
  
  const onUpdateUser = () => {
      mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateUserDetail}, {
        onSettled: () => {
          queryUser.refetch()
      }})
  }

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{marginTop: '10px'}}>
        <Button style={{height:'150px', width:'150px', borderRadius:' 6px', borderStyle:'dashed'}}><PlusOutlined style={{fontSize:'60px'}} /></Button>
      </div>
      <div style={{marginTop:'20px'}}>
        <TableComponent columns={columns} isLoading={isLoadingUsers} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="40%">
      <LoadingComponent isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form 
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onFinish={onUpdateUser}
              autoComplete="on"
              form={form}
            >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input user name !' }]}
            >
              <InputComponent value={stateUserDetail.name} onChange={handleOnChangeDetail} name="name"/>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input email!' }]}
            >
              <InputComponent value={stateUserDetail.email} onChange={handleOnChangeDetail} name="email"/>
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input phone!' }]}
            >
              <InputComponent value={stateUserDetail.phone} onChange={handleOnChangeDetail} name="phone"/>
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input address!' }]}
            >
              <InputComponent value={stateUserDetail.address} onChange={handleOnChangeDetail} name="address"/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>  
      </DrawerComponent>
      <Modelcomponent title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
        <LoadingComponent isLoading={isLoadingDeleted}>
          <div>Bạn có muốn xóa người dùng này không?</div>
        </LoadingComponent>  
      </Modelcomponent>
    </div>
  )
}

export default AdminUser