import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '', 
  avatar: '',
  id: '',
  access_token: '',
  isAdmin: false,
  refreshToken: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {name ='', email ='', phone ='', address ='', avatar ='', access_token ='', _id ='', isAdmin,
      refreshToken =''} = action.payload
      state.name = name ;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
      state.refreshToken= refreshToken ? refreshToken : state.refreshToken;
    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.id ='';
      state.access_token = '';
      state.isAdmin = false;
      state.refreshToken = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { resetUser,updateUser, } = userSlice.actions

export default userSlice.reducer