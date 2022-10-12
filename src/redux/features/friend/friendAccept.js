import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// fetch api user
export const friendAccept = createAsyncThunk('user/friendAccept', async (arg, { rejectWithValue }) => {
    try {
        const getToken = JSON.parse(localStorage.getItem('user_login'));

        // check token
        if (getToken !== null) {
            const decodedToken = jwt_decode(getToken._token);
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}friendRequests/get-list-request/${decodedToken._id}`,
            );
            return res.data.data;
        }
    } catch (err) {
        rejectWithValue(err);
    }
});
export const accept = createAsyncThunk(
    // Tên action
    'user/accept ',
    async (data) => {
        // Gọi lên API backend
        const { idRequest } = data;
        const { status, senderID, reciverID } = data;
        console.log(friendAccept);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}friendRequests/friend-request/${idRequest}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, senderID, reciverID }),
        });

        // Convert dữ liệu ra json
        const jsonData = await response.json();
        return jsonData;
    },
);

const listFriendAccept = createSlice({
    name: 'listAccept',
    initialState: { data: [] },
    extraReducers: (builder) => {
        builder.addCase(friendAccept.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});
export default listFriendAccept;
