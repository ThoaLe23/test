import axios from "axios";
import { axiosJWT } from "./UserService";

export const createOrder = async ( access_token,data) => {
  console.log('access_token',{access_token, data})
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/order/create`, data,{
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};