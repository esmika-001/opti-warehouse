import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginApiPayload, loginApiResponse, loginVerifyApiPayload } from './user.type';
import { fetchUserService, loginService, signupService, updateUserService, validateLoginService } from '../../services/auth.service';
import { RootState } from '../../store/store';
import axiosInstance from '../../config/axios';


export const LoginApi = createAsyncThunk('Auth/Login', async (payload: loginApiPayload, { rejectWithValue }) => {
  try {
    const response = await loginService({ ...payload })
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const VerifyLoginApi = createAsyncThunk('Auth/VerifyLogin', async (payload: loginVerifyApiPayload, { rejectWithValue }) => {
  try {
    const response = await validateLoginService({ ...payload })
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const signupUserData = createAsyncThunk('register/user',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await signupService(payload)
      return response.data as loginApiResponse
    } catch (error) {
      return rejectWithValue(error)
    }
  })
export const updateUserAction = createAsyncThunk('update/user', async ({ data }: any, { rejectWithValue, getState }) => {
  try {
    const response = await updateUserService({ ...data })
    return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const fetchUserData = createAsyncThunk('fetch/userdata',
  async (payload: string, { getState, rejectWithValue }) => {
    try {
      const response = await fetchUserService()
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)


export const patchUserImage = createAsyncThunk('patch/userimage',
  async (payload: FormData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axiosInstance.patch("user/image", payload, {
        headers: {
          Authorization: state.persistedReducer.token,
          'content-type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  })

export const deleteUserImage = createAsyncThunk('delete/useriimage',
  async (payload: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axiosInstance.delete("user/image", {
        headers: {
          Authorization: state.persistedReducer.token
        }
      })
      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  })