import axios from "axios";


export const createOrder = async (access_token ,data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/order/create`, data,{
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};
export const getDetailsOrder = async ( id, access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`,{
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};
export const getAllOrder = async (id,access_token) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-order-all/${id}`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}
export const cancelOrder = async (id, access_token , orderItems) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_URL}/order/cancel-order/${id}`,{data: orderItems},{
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}
