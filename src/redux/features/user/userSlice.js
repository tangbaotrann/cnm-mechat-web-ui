// lib
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// fetch api user
export const fetchApiUser = createAsyncThunk('user/fetchApiUser', async (arg, { rejectWithValue }) => {
    try {
        const getToken = JSON.parse(localStorage.getItem('user_login'));
        // check token
        if (getToken !== null) {
            const decodedToken = jwt_decode(getToken._token);

            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}users/${decodedToken._id}`);

            return res.data.data;
        }
    } catch (err) {
        console.log(err);
        rejectWithValue(err);
    }
});
//Quen mật khẩu
export const forgetPassWord = createAsyncThunk(
    // Tên action
    'user/forgetPassWord ',
    async (data) => {
        // Gọi lên API backend
        const { phoneNumber, newPassword } = data;

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}accounts/forget-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber, newPassword }),
        });

        // Convert dữ liệu ra json
        const jsonData = await response.json();
        return jsonData;
    },
);
//
const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        isSuccess: false,
        isLoading: false,
    },
    reducers: {},
    extraReducers: {
        [fetchApiUser.pending]: (state, { payload }) => {
            state.isLoading = true;
        },
        [fetchApiUser.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.isSuccess = true;
            state.isLoading = false;
        },
        [fetchApiUser.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isLoading = false;
        },
    },
});

export default userSlice;
