import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Modal, Select, Space } from 'antd'
import {PlusOutlined, DeleteOutlined , EditOutlined,SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { WrapperUploadFile } from '../../pages/Profile/style'
import { getBase64, renderOptions } from '../../utils'
import { createProduct } from '../../services/ProductService'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import Modelcomponent from '../ModalComponent/Modelcomponent'

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const user = useSelector((state) => state?.user )
  const [searchText, setSearchText] = useState('');
  const [typeSelect ,setTypeSelect] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    type:'',
    countInStock: '',
    description:'',
    image:'',
    rating:'',
    newtype: '',
    discount: '',
  })
  const [stateProductDetail, setStateProductDetail] = useState({
    name: '',
    price: '',
    type:'',
    countInStock: '',
    description:'',
    image:'',
    rating:'',
    discount: '',
  })

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    ( data) => {
        const { name ,
        price ,
        type,
        countInStock ,
        description,
        image,
        rating, discount} = data
    const res =  ProductService.createProduct({name ,
          price ,
          type,
          countInStock ,
          description,
          image,
          rating,
          discount
        })
    return res
    }
 )

 const mutationUpdate = useMutationHooks(
  ( data) => {
    const { id, token, ...rests} = data
  const res =  ProductService.updateProduct(id, token, {...rests}) 
  return res
  },
)
const  mutationDelete = useMutationHooks(
  ( data) => {
    const { id, token} = data
  const res =  ProductService.deleteProduct(id, token) 
  return res
  },
)

  const getAllProducts = async () => {
      const res = await ProductService.getAllProduct()
      return res
  }
  const fetchGetDetailProduct = async (rowSelected) => {
    const res = await ProductService.getDetailProduct(rowSelected) 
    if(res?.data){
      setStateProductDetail({
        name: res?.data?.name,
        price: res?.data?.price,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        description:res?.data?.description,
        image:res?.data?.image,
        rating:res?.data?.rating,
        discount: res?.data?.discount
      })
    }   
     setIsLoadingUpdate(false)
  } 
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    return res
    // if(res?.status === 'OK'){
    //   setTypeProducts(res?.data)
    // }
  }
  useEffect(() => {
      form.setFieldsValue(stateProductDetail)
  },[form, stateProductDetail])   

  useEffect(() => {
    if(rowSelected){
      setIsLoadingUpdate(true) 
      fetchGetDetailProduct(rowSelected)
    }
  },[rowSelected])

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
  }

  const { data, isLoading , isSuccess,isError} = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated , isSuccess: isSuccessUpdated ,isError: isErrorUpdated} = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted , isSuccess: isSuccessDeleted ,isError: isErrorDeleteted} = mutationDelete

  const queryProduct = useQuery({queryKey: ['products'], queryFn: getAllProducts})
  const typeProduct = useQuery({queryKey: ['type-products'], queryFn: fetchAllTypeProduct})

  const {isLoading: isLoadingProducts , data: products} = queryProduct
  const renderAction = () => {
    return(
      <div>
        <EditOutlined style={{fontSize: "20px",color: "orange", cursor: 'pointer' }} onClick={handleDetailsProduct}/>
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
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a,b) => a.name.length -  b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a,b) => a.price -  b.price
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a,b) => a.rating -  b.rating
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,

    },
  ];
   const dataTable = products?.data?.length && products?.data?.map((product) => {
    return {...product, key: product._id }
  })

  useEffect(() => {
    if(isSuccess && data?.status === 'OK'){
      message.success()  
      handleCancel()
    }
    else if(isError){
      message.error()
    }
  },[isSuccess])

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
    setStateProductDetail({
      name:'',
      price: '',
      type:'',
      countInStock: '',
      description:'',
      image:'',
      rating:'',
      discount: '',
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

  const handleDeleteProduct = () => {
    mutationDelete.mutate({id: rowSelected , token: user?.access_token}, {
      onSettled: () => {
        queryProduct.refetch()
      }
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name:'',
      price: '',
      type:'',
      countInStock: '',
      description:'',
      image:'',
      rating:'',
      discount: ''
    })
    form.resetFields()
  };
  const onFinish = () =>{
    const params ={
      name: stateProduct.name,
      price: stateProduct.price,
      type:stateProduct.type === 'add-type' ? stateProduct.newtype : stateProduct.type,
      countInStock: stateProduct.countInStock,
      description:stateProduct.description,
      image:stateProduct.image,
      rating:stateProduct.rating,
      discount: stateProduct.discount
    }
    mutation.mutate(params, 
      {
      onSettled: () => {
        queryProduct.refetch()
    }}
    )
  }
  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }
  const handleOnChangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value
    })
  }
  const handleOnChangeAvatar = async ({fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
  }
  const handleOnChangeDetailAvatar = async ({fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetail({
      ...stateProductDetail,
      image: file.preview
    })
  }
  const onUpdateProduct = () => {
      mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateProductDetail}, {
        onSettled: () => {
          queryProduct.refetch()
      }})
  }
  const handleChangeSelect = (value) => {
      setStateProduct({
      ...stateProduct,
      type: value
    })
  }
  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{marginTop: '10px'}}>
        <Button style={{height:'150px', width:'150px', borderRadius:' 6px', borderStyle:'dashed'}} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{fontSize:'60px'}} /></Button>
      </div>
      <div style={{marginTop:'20px'}}>
        <TableComponent columns={columns} isLoading={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <Modelcomponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <LoadingComponent isLoading={isLoading}>
          <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onFinish={onFinish}
              autoComplete="on"
              form={form}
            >
            <Form.Item 
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input product name !' }]}
            >
              <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name"/>
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input product type!' }]}
            >
              <Select
                name="type"
                value={stateProduct.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeProduct?.data?.data)}
              /></Form.Item>
              {stateProduct.type === 'add-type' && (
                <Form.Item
                  label="New type "
                  name="newtype"
                  rules={[{ required: true, message: 'Please input new type of product!' }]}
                >
                  <InputComponent value={stateProduct.newtype} onChange={handleOnChange} name="newtype"/>
                </Form.Item>
              )}
            <Form.Item
              label="Count in stock"
              name="countInStock"
              rules={[{ required: true, message: 'Please input count in stock of product!' }]}
            >
              <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock"/>
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input product price!' }]}
            >
              <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price"/>
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[{ required: true, message: 'Please input discount of product' }]}
            >
              <InputComponent value={stateProduct.discount} onChange={handleOnChange} name="discount"/>
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: 'Please input product rating!' }]}
            >
              <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating"/>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input product description!' }]}
            >
              <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description"/>
            </Form.Item>
            
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Please input product image!' }]}
            >
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button >Seclect File</Button>
              {stateProduct?.image && (
                <img src= {stateProduct?.image} style={{
                  height:'60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px'
                }} alt="avatar"/>
            )}
            </WrapperUploadFile>
            </Form.Item> 
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>  
      </Modelcomponent>
      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="40%">
      <LoadingComponent isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form 
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onFinish={onUpdateProduct}
              autoComplete="on"
              form={form}
            >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input product name !' }]}
            >
              <InputComponent value={stateProductDetail.name} onChange={handleOnChangeDetail} name="name"/>
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input product type!' }]}
            >
              <InputComponent value={stateProductDetail.type} onChange={handleOnChangeDetail} name="type"/>
            </Form.Item>
            <Form.Item
              label="Count in stock"
              name="countInStock"
              rules={[{ required: true, message: 'Please input count in stock of product!' }]}
            >
              <InputComponent value={stateProductDetail.countInStock} onChange={handleOnChangeDetail} name="countInStock"/>
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input product price!' }]}
            >
              <InputComponent value={stateProductDetail.price} onChange={handleOnChangeDetail} name="price"/>
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[{ required: true, message: 'Please input discount of product' }]}
            >
              <InputComponent value={stateProductDetail.discount} onChange={handleOnChangeDetail} name="discount"/>
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: 'Please input product rating!' }]}
            >
              <InputComponent value={stateProductDetail.rating} onChange={handleOnChangeDetail} name="rating"/>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input product description!' }]}
            >
              <InputComponent value={stateProductDetail.description} onChange={handleOnChangeDetail} name="description"/>
            </Form.Item>
            
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Please input product image!' }]}
            >
            <WrapperUploadFile onChange={handleOnChangeDetailAvatar} maxCount={1}>
              <Button >Seclect File</Button>
              {stateProductDetail?.image && (
                <img src= {stateProductDetail?.image} style={{
                  height:'60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px'
                }} alt="avatar"/>
            )}
            </WrapperUploadFile>
            </Form.Item> 
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>  
      </DrawerComponent>
      <Modelcomponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
        <LoadingComponent isLoading={isLoadingDeleted}>
          <div>Bạn có muốn xóa sản phẩm này không?</div>
        </LoadingComponent>  
      </Modelcomponent>
      
    </div>
  )
}

export default AdminProduct