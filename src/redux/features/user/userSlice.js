// lib
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import socket from '~/util/socket';

// fetch api user
export const fetchApiUser = createAsyncThunk('user/fetchApiUser', async (arg, { rejectWithValue }) => {
    try {
        const getToken = JSON.parse(localStorage.getItem('user_login'));
        // check token
        if (localStorage.getItem('user_login') !== null) {
            if (getToken !== null) {
                const decodedToken = jwt_decode(getToken._token);

                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}users/${decodedToken._id}`);

                return res.data.data;
            }
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

const createFormData = (data) => {
    const { _id, avatarLink } = data;
    //console.log(data);
    const dataForm = new FormData();

    dataForm.append('_id', _id);
    dataForm.append('avatarLink', avatarLink);

    return dataForm;
};

// update info single
export const updateAvatar = createAsyncThunk(
    // Tên action
    'user/updateAvatar ',
    async (data) => {
        if (data) {
            let formData = createFormData(data);

            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}users/update-avatar/${data._id}`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            console.log('48 - ', res.data);
            return res.data;
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        isSuccess: false,
        isLoading: false,
    },
    reducers: {
        resetUserInfo: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiUser.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.data = action.payload;

                // socket
                socket.emit('change_avatar_single', {
                    request: action.payload,
                });
            });
    },
});

export default userSlice;
