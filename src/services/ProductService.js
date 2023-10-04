import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (search) => {
  let res = {}
  if(search?.length > 0){
      res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}`);
  }
  else {
      res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
  }
  return res.data;
};
export const getProductType = async (type) => {
  if(type){
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}`);
    return res.data;
  }
};
export const getAllTypeProduct = async () => {
    const  res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`);
    return res.data;
};
export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data
  );
  return res.data;
};
export const getDetailProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/details/${id}`
  );
  return res.data;
};
export const updateProduct = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update/${id}`,
    data,
    {
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};
export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/product/delete/${id}`,
    {
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};
