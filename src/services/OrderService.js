import axios from "axios";
import { axiosJWT } from "./UserService";

export const createOrder = async ( access_token,data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/order/create`, data,{
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};
export const getDetailOrder = async ( id, access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/order/get-order-all/${id}`,{
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};
