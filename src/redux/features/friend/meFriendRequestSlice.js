//danh sach bạn đã yêu cầu kết bạn
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export const meRequestFriend = createAsyncThunk('user/meRequestFriend', async (arg, { rejectWithValue }) => {
    try {
        const getToken = JSON.parse(localStorage.getItem('user_login'));

        // check token
        if (getToken !== null) {
            const decodedToken = jwt_decode(getToken._token);
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}friendRequests/get-of-me/${decodedToken._id}`,
            );
            return res.data.data;
        }
    } catch (err) {
        rejectWithValue(err);
    }
});
//thu hoi ket bạn
export const callBack = createAsyncThunk(
    // Tên action
    'user/callBack ',
    async (data) => {
        // Gọi lên API backend
        console.log(data);
        const { status, senderID, idRequest } = data;
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}friendRequests/${idRequest}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, senderID }),
        });

        // Convert dữ liệu ra json
        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    },
);
//
const listMeRequestFriend = createSlice({
    name: 'listMeRequest',
    initialState: { data: [] },
    extraReducers: (builder) => {
        builder.addCase(meRequestFriend.fulfilled, (state, action) => {
            console.log(action.payload);
            state.data = action.payload;
        });
    },
});
export default listMeRequestFriend;
