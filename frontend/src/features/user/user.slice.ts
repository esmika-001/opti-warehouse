import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, LoginApi, signupUserData, updateUserAction, VerifyLoginApi } from "./user.action";
import { initialState, InitUser } from "./user.type";


const initUser: InitUser = {
    uuid: '',
    name: '',
    email: '',
    username: '',
    pincode: 0,
    state: '',
    city: '',
    image:"",
    street: '',
    country: '',
    phone_no: '',
    created_at: '',
    updated_at: '',
    deleted_at: '',
    status: '',
};

const init: initialState = {
    token: '',
    error: false,
    user: initUser,
    allUsers: null,
    isLoading: false,
    isLogedin: false
}
const UserSlice = createSlice({
    name: 'User',
    initialState: init,
    reducers: {
        logout: (state) => {
            state.isLoading = false
            state.isLogedin = false
            state.error = false
            state.token = ''
            state.user = initUser
        },
        reset: (state) => {
            state.isLoading = false
            state.isLogedin = false
            state.error = false
            state.token = ''
            state.user = initUser
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginApi.fulfilled, (state, action) => {
                state.token = action.payload?.token || ''
                localStorage.setItem('token', state?.token);
                state.user = { ...state.user, ...action.payload?.data }
                state.isLoading = false
                state.isLogedin = !!state.token
                state.error = false
            })
            .addCase(LoginApi.pending, (state, action) => {
                state.isLoading = true
                state.isLogedin = false
                state.error = false
            })
            .addCase(LoginApi.rejected, (state, action) => {
                state.isLoading = false
                state.isLogedin = false
                state.error = true
            })
            .addCase(VerifyLoginApi.fulfilled, (state, action) => {
                state.token = action.payload.token || ''
                localStorage.setItem('token', state.token);
                state.user = { ...state.user, ...action.payload.data }
                state.isLoading = false
                state.isLogedin = !!action.payload.token
                state.error = false
            })
            .addCase(VerifyLoginApi.pending, (state, action) => {
                state.isLoading = true
                state.isLogedin = false
                state.error = false
            })
            .addCase(VerifyLoginApi.rejected, (state, action) => {
                state.isLoading = false
                state.isLogedin = false
                state.error = true
            })
            .addCase(updateUserAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    ...state.user,
                    ...action.payload
                };

            })
            .addCase(updateUserAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserAction.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(signupUserData.fulfilled, (state, action) => {
                state.token = action.payload?.token || ''
                localStorage.setItem('token', state.token);
                state.user = { ...state.user, ...action.payload?.data }
                state.isLoading = false
                state.isLogedin = true
                state.error = false
            })
            .addCase(signupUserData.pending, (state, action) => {
                state.isLoading = true
                state.isLogedin = false
                state.error = false
            })
            .addCase(signupUserData.rejected, (state, action) => {
                state.isLoading = false
                state.isLogedin = false
                state.error = true
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(fetchUserData.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false
            })
            
    }
})
export const { logout, reset } = UserSlice.actions
export default UserSlice.reducer
